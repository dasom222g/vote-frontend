import { ethers } from 'ethers'
import React, { FC, useEffect, useState } from 'react'
import { Candidate } from '../components/Candidate'
import { ICandidate } from '../lib/type'
// import { candidateList as CANDIDATE_LIST_DATA } from '../lib/data'
import { votingContract } from '../web3Config'

interface MainProps {
  account: string
}

const Main: FC<MainProps> = ({ account }) => {
  // const [sendDataList, setSendDataList] = useState<ICandidate[]>([])
  const [candidateList, setCandidateList] = useState<ICandidate[]>([])
  const [selectedCandidate, setSelectedCandidate] = useState<ICandidate | null>(null)

  

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
    try {
      const data: ICandidate[] = await votingContract.methods
        .getCandidates()
        .call()
      console.log(data)
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
  }

  const selectCandidate = (id: number, item: ICandidate) => {
    setSelectedCandidate(item)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!account) return
    try {
      const isValid = await votingContract.methods.isValidVotingTime(account).call()
      if (!isValid) {
        console.log(`can't vote`)
        getRemaingSeconds()
        return
      }
      const res = selectedCandidate && await votingContract.methods.vote(selectedCandidate.id).send({from: account})
      console.log(res.status)
    } catch(error) {
      console.error(error)
    }
  }

  const getCount = async (): Promise<void> => {
    try {
      // const count = selectedCandidate && await votingContract.methods.getCountById(selectedCandidate.id).call()
      const votingStatusList = await votingContract.methods.getVotingStatusList().call()
      console.log('votingStatusList', votingStatusList)
    } catch(error) {
      console.error(error)
    }
  }

  const getRemaingSeconds = async () => {
    try {
      const remainingSeconds = await votingContract.methods.getRemaingSeconds(account).call()
      console.log('remainingSeconds', remainingSeconds)
    } catch(error) {
      console.error(error)
    }
  }
  const getIsVoted = async () => {
    try {
      const isVoted = await votingContract.methods.isVoted(account).call()
      console.log('isVoted', isVoted)
    } catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCandidateList()
  }, [])

  // view
  return (
    <>
      <form onSubmit={handleSubmit} className="h-full">
        <div className="h-full p-4 flex flex-col">
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
          <div className="mt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white"
            >
              Vote
            </button>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white"
              onClick={getCount}
            >
              Get Count
            </button>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white"
              onClick={getIsVoted}
            >
              getIsVoted
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Main
