// import React, { FC, useCallback, useEffect, useState } from 'react'
import React, { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { votingContract } from './web3Config'
import WalletConnet from './routes/wallet_connect';
// import Complete from './routes/complete'
// import Vote from './routes/vote';

const App: FC = () => {
  // const [account, setAccount] = useState<string>('')
  // const [isVoted, setIsVoted] = useState<boolean | null>(null)

  // const getAccount = async () => {
  //   try {
  //     if (window.ethereum) { // metamask설치되어 있는경우
  //       // 브라우저에서 metamask 연결 요청하여 account배열 get
  //       const accounts: string[] = await window.ethereum.request({
  //         method: 'eth_requestAccounts'
  //       })
  //       setAccount(accounts[0])
  //       return
  //     }
  //     alert('Install Meta Mask!') // metamask 설치되지 않은 경우
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // const checkVoted = useCallback(async (): Promise<void> => {
  //   if (!account) return
  //   try {
  //     const result = await votingContract.methods.isVoted(account).call()
  //     setIsVoted(result)
  //   } catch(error) {
  //     console.error(error)
  //   }
  // }, [account])

  // useEffect(() => {
  //   getAccount()
  //   checkVoted()
  // }, [checkVoted])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WalletConnet />} />
        {/* <Route path="/vote" element={<Vote account={account} isVoted={isVoted} />} />
        <Route path="/complete" element={<Complete account={account} isVoted={isVoted} />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
