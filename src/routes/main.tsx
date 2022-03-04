import { ethers } from 'ethers'
import React, { FC, useEffect, useState } from 'react'
import { Candidate } from '../components/Candidate'
import { ICandidate } from '../lib/type'
// import { candidateList as candidateListData } from '../lib/data'
import { votingContract } from '../web3Config'

const Main: FC = () => {
  const [account, setAccount] = useState<string>('')
  // const [sendDataList, setSendDataList] = useState<ICandidate[]>([])
  const [candidateList, setCandidateList] = useState<ICandidate[]>([])
  const [selectedCandidate, setSelectedCandidate] = useState<ICandidate>()

  const getAccount = async () => {
    try {
      if (window.ethereum) { // metamask설치되어 있는경우
        // 브라우저에서 metamask 연결 요청하여 account배열 get
        const accounts: string[] = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        setAccount(accounts[0])
        return
      }
      alert('Install Meta Mask!') // metamask 설치되지 않은 경우
    } catch (error) {
      console.error(error)
    }
  }

  // const setData = () => {
  //   setSendDataList(candidateListData)
  // }

  // const sendDateList = async () => {
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
      const res = selectedCandidate && await votingContract.methods.vote(selectedCandidate.id).send({from: account})
      console.log(res.status)
    } catch(error) {
      console.error(error)
    }
  }

  const getCount = async (): Promise<void> => {
    try {
      const count = selectedCandidate && await votingContract.methods.getCanditeNumberOfVotes(selectedCandidate && selectedCandidate.id).call()
      console.log('selectedCandidate.id', selectedCandidate && selectedCandidate.id, count)
    } catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAccount()
    getCandidateList()
  }, [])

  // view
  return (
    <>
      <form onSubmit={handleSubmit} className="h-full">
        <div className="bg-gradient-to-r from-blue-700 to-purple-700 h-full p-4 flex flex-col">
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
        </div>
      </form>
    </>
  )
}

export default Main
