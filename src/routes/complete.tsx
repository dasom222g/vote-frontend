import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from 'react'
// import { ethers } from 'ethers'
// import { Candidate } from '../components/Candidate'
import { votingContract } from '../web3Config'

interface CompleteProps {
  account: string
}

const Complete: FC<CompleteProps> = ({ account }) => {
  const [isVoted, setIsVoted] = useState<boolean | null>(null)


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
      const votingStatusList = await votingContract.methods.getVotingStatusList().call()
      console.log('votingStatusList', votingStatusList)
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

  useLayoutEffect(() => {
    setPage()
  }, [setPage])

  // view
  return (
    <>
      {/* {isVoted === null ? <></> : <div>{ isVoted ? 'true' : 'false' }</div>} */}
    </>
  )
}

export default Complete
