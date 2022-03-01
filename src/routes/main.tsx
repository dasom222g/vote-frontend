import { ethers } from 'ethers'
import React, { FC, useEffect, useState } from 'react'
import { Candidate } from '../components/Candidate'
import { ICandidate } from '../lib/type'
import { votingContract } from '../web3Config'

const Main: FC = () => {
  const [account, setAccount] = useState<string>('')
  const [candidateList, setCandidateList] = useState<ICandidate[]>([])

  // const candidate1: ICandidate = {
  //   name: '방탄소년단(BTS)',
  //   subText: '대표곡',
  //   description: '방탄복이',
  //   imageName: 'bts.png'
  // }
  const candidate1: ICandidate = {
    name: ethers.utils.formatBytes32String('방탄소년단(BTS)'),
    description: ethers.utils.formatBytes32String('Songs: Butter, Dy,namite'),
    imageName: ethers.utils.formatBytes32String('bts.png')
  }
  const candidate2: ICandidate = {
    name: ethers.utils.formatBytes32String('아이유'),
    description: ethers.utils.formatBytes32String('Songs: 잔소리, 밤편지'),
    imageName: ethers.utils.formatBytes32String('iu.png')
  }

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

  const setData = () => {
    setCandidateList([candidate1, candidate2])
  }

  const sendCandidateList = async () => {
    if (!account || !candidateList.length) return
    try {
      const res = await votingContract.methods.setCandidates(candidateList).send({from: account})
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  const getCandidateList = async () => {
    try {
      const data: ICandidate[] = await votingContract.methods.getCandidates().call()
      console.log(data)
      data.forEach((item: ICandidate) => {
        console.log('candidate1.name', ethers.utils.parseBytes32String(candidate1.name))
        console.log(ethers.utils.parseBytes32String(item.name))
        console.log(ethers.utils.parseBytes32String(item.description))
        console.log(ethers.utils.parseBytes32String(item.imageName))
      })
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    getAccount()
  }, [])

  useEffect(() => {
    console.log('candidateList', candidateList)
  }, [candidateList])

  // view
  return (
    <>
      <div className="bg-gradient-to-r from-blue-700 to-purple-700 h-full p-4 flex flex-col">
        <h1 className="text-slate-100 text-lg font-bold py-2 pb-4">Vote the Winner</h1>
        <div className="h-full overflow-auto">
          <Candidate />
        </div>
        <div className="mt-4">
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
            onClick={sendCandidateList}
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
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-2 mt-auto"
          >
            Vote
          </button>
        </div>
      </div>
    </>
  )
}

export default Main
