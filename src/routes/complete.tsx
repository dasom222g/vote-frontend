import { ethers } from 'ethers'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { ethers } from 'ethers'
import { WinnerCard } from '../components/WinnerCard'
import { ICandidate, ICountItem } from '../lib/type'
import { votingContract } from '../web3Config'

interface CompleteProps {
  account: string
  isVoted: boolean | null
}

const Complete: FC<CompleteProps> = ({ isVoted }) => {
  const navigate = useNavigate()
  
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [winnerList, setWinnerList] = useState<ICountItem[]>([])


  // const getRemaingSeconds = async () => {
  //   try {
  //     const remainingSeconds = await votingContract.methods.getRemaingSeconds(account).call()
  //     console.log('remainingSeconds', remainingSeconds)
  //   } catch(error) {
  //     console.error(error)
  //   }
  // }

  const getCandidateList = useCallback(async (): Promise<ICandidate[]>  => {
    let datas: ICandidate[] = []
    try {
      const data: ICandidate[] = await votingContract.methods
        .getCandidates()
        .call()
      datas = data.map((item: ICandidate) => {
        return {
          ...item,
          name: ethers.utils.parseBytes32String(item.name),
          description: ethers.utils.parseBytes32String(item.description),
          imageName: ethers.utils.parseBytes32String(item.imageName),
        }
      })
    } catch (error) {
      console.error(error)
    }
    return datas
  }, [])

  const getCount = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    const candidates = await getCandidateList()
    try {
      const votingStatusList: ICountItem[] = await votingContract.methods.getVotingStatusList().call()
      const parseList = votingStatusList.map(item => {
        const targetItem: ICandidate = candidates.find(candidate => candidate.id === item.id)!
        return {
          ...item,
          id: Number(item.id),
          name: ethers.utils.parseBytes32String(item.name),
          imageName: targetItem.imageName,
          count: Number(item.count),
        }
      }) 

      const sortedList = parseList.sort((a, b) => b.count - a.count)
      const top3List = sortedList.splice(0, 3)
      // const filterList = candidates.filter(candidate => top3List.map(top => top.id).includes(Number(candidate.id)))
      setWinnerList(top3List)
    } catch(error) {
      console.error(error)
    }
    setIsLoading(false)
  }, [getCandidateList])

  const goMain = useCallback(() => {
    navigate('/')
  }, [navigate])

  const setPage = useCallback(async () => {
    if (isVoted === null) return
    if (isVoted) {
      getCount()
      return
    }
    // todo: You should vote and check alert 창 띄우기
    goMain()
  }, [isVoted, goMain, getCount])

  useEffect(() => {
    setPage()
  }, [setPage])

  // view
  return (
    <>
    {isLoading && (
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-white bg-opacity-60 z-10 flex items-center justify-center">
        <svg className="animate-spin h-14 w-14 text-indigo-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    )}
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
