import React, { FC, useCallback, useEffect, useState } from 'react'
// import { ethers } from 'ethers'
// import { Candidate } from '../components/Candidate'
import { votingContract } from '../web3Config'

interface CompleteProps {
  account: string
}

const Complete: FC<CompleteProps> = ({ account }) => {
  const [isVoted, setIsVoted] = useState<boolean>(false)


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

  const checkVoted = useCallback(async (): Promise<void> => {
    try {
      const result = await votingContract.methods.isVoted(account).call()
      setIsVoted(result)
      if (isVoted) {
        getCount()
        return
      }
      console.log('투표해주세요!!')
    } catch(error) {
      console.error(error)
    }
  }, [account, isVoted])

  useEffect(() => {
    if (!account) return
    checkVoted()
  }, [account, checkVoted])

  // view
  return (
    <>
      { isVoted }
    </>
  )
}

export default Complete
