import { ethers } from 'ethers'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Candidate } from '../components/Candidate'
import { ICandidate } from '../lib/type'
// import { candidateList as CANDIDATE_LIST_DATA } from '../lib/data'
import { votingContract } from '../web3Config'

interface MainProps {
  account: string
  isVoted: boolean | null
}

const Main: FC<MainProps> = ({ account, isVoted }) => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [sendDataList, setSendDataList] = useState<ICandidate[]>([])
  const [candidateList, setCandidateList] = useState<ICandidate[]>([])
  const [selectedCandidate, setSelectedCandidate] = useState<ICandidate | null>(null)
  const [isValidVote, setIsValidVote] = useState<boolean>(false)

  

  // const setData = () => {
  //   setSendDataList(CANDIDATE_LIST_DATA)
  // }

  // const sendDateList = async () => {
  //   console.log('list', sendDataList)
  //   if (!account || !sendDataList.length) return
  //   try {
  //     const res = await votingContract.methods.setCandidates(sendDataList).send({from: account})
  //     console.log(res)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const getCandidateList = async () => {
    setIsLoading(true)
    try {
      const data: ICandidate[] = await votingContract.methods
        .getCandidates()
        .call()
      const datas = data.map((item: ICandidate) => {
        return {
          ...item,
          name: ethers.utils.parseBytes32String(item.name),
          description: ethers.utils.parseBytes32String(item.description),
          imageName: ethers.utils.parseBytes32String(item.imageName),
        }
      })
      setCandidateList(datas)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  const checkValidVote = useCallback(async () => {
    if (!account) return
    setIsLoading(true)
    try {
      let isValid = await votingContract.methods.isValidVotingTime(account).call()
      setIsValidVote(isValid)
    } catch(error) {
      setIsValidVote(false)
    }
    setIsLoading(false)
  }, [account])

  const selectCandidate = (id: number, item: ICandidate) => {
    setSelectedCandidate(item)
  }

  const goComplete = (): void => {
    console.log('goComplete')
    navigate('/complete')
  }

  const handleVote = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!account || !selectedCandidate) return
    try {
      if (!isValidVote) {
        // 투표한지 24시간이 지나지 않은 경우
        console.log(`can't vote`)
        getRemaingSeconds()
        return
      }
      setIsLoading(true)
      const res = await votingContract.methods.vote(selectedCandidate.id).send({from: account})
      console.log('res.status', res.status)
      res.status && goComplete()
    } catch(error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  const getRemaingSeconds = async () => {
    try {
      const remainingSeconds = await votingContract.methods.getRemaingSeconds(account).call()
      console.log('remainingSeconds', remainingSeconds)
    } catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCandidateList()
  }, [])

  useEffect(() => {
    checkValidVote()
  }, [account, checkValidVote])

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
      <form onSubmit={handleVote} className="h-full">
        <div className="h-full flex flex-col">
          <h1 className="text-white text-lg font-bold py-2 pb-4">
            Vote the Winner
          </h1>
          <div className="h-full overflow-auto">
            {candidateList.map((candidate, index) => (
              <Candidate
                key={index}
                candidate={candidate}
                selectCandidate={selectCandidate}
              />
            ))}
          </div>
          {/* <div className="mt-4">
            <button
              type="button"
              className="bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-2 mt-auto"
              onClick={setData}
            >
              Set Data
            </button>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-2 mt-auto"
              onClick={sendDateList}
            >
              Contract Send
            </button>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-2 mt-auto"
              onClick={getCandidateList}
            >
              get Candidate
            </button>
          </div> */}
          {(!isVoted || isValidVote) && (
            <div className="mt-4">
              <button
                type="submit"
                disabled={!isValidVote || !selectedCandidate}
                className={`bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white ${!isValidVote || !selectedCandidate ? 'cursor-not-allowed opacity-60' : ''}`}
              >
                Vote
              </button>
            </div>
          )}
          {isVoted && (
            <div className="mt-4">
            <button
              type="button"
              className={`bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white`}
              onClick={goComplete}
            >
              Go to check
            </button>
          </div>
          )}
        </div>
      </form>
    </>
  )
}

export default Main
