import { ethers } from 'ethers'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { ethers } from 'ethers'
import { WinnerCard } from '../components/WinnerCard'
import { ICountItem } from '../lib/type'
import { votingContract } from '../web3Config'

interface CompleteProps {
  account: string
}

const Complete: FC<CompleteProps> = ({ account }) => {
  const [isVoted, setIsVoted] = useState<boolean | null>(null)
  const [winnerList, setWinnerList] = useState<ICountItem[]>([])


  // const getRemaingSeconds = async () => {
  //   try {
  //     const remainingSeconds = await votingContract.methods.getRemaingSeconds(account).call()
  //     console.log('remainingSeconds', remainingSeconds)
  //   } catch(error) {
  //     console.error(error)
  //   }
  // }

  const getCount = async (): Promise<void> => {
    try {
      const votingStatusList: ICountItem[] = await votingContract.methods.getVotingStatusList().call()
      const parseList = votingStatusList.map(item => {
        return {
          ...item,
          id: Number(item.id),
          name: ethers.utils.parseBytes32String(item.name),
          count: Number(item.count),
        }
      }) 
      const sortedList = parseList.sort((a, b) => b.count - a.count)
      setWinnerList(sortedList.splice(0, 3))
    } catch(error) {
      console.error(error)
    }
  }

  const goMain = () => {
    console.log('Yout shold vote!')
  }

  const checkVoted = useCallback(async (): Promise<void> => {
    try {
      const result = await votingContract.methods.isVoted(account).call()
      console.log('isVoted', result)
      setIsVoted(result)
    } catch(error) {
      console.error(error)
    }
  }, [account])

  const setPage = useCallback(async () => {
    if (isVoted === null) return
    if (isVoted) {
      await getCount()
      return
    }
    goMain()
  }, [isVoted])

  useEffect(() => {
    if (!account) return
    checkVoted()
  }, [account, checkVoted])

  useEffect(() => {
    setPage()
  }, [setPage])

  // view
  return (
    <>
    <h1 className="text-white text-lg font-bold py-2 pb-4">Vote the Winner</h1>
    {isVoted && (
      <>
        <WinnerCard winnerList={winnerList} />
        <div className="mt-4">
          <Link to={'/'}>
            <button
              className="bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white"
            >
              Confirm
            </button>
          </Link>
        </div>
      </>
    )}
    </>
  )
}

export default Complete
