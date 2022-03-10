// import { ethers } from 'ethers'
import { ethers } from 'ethers'
import React, { FC, useState } from 'react'

declare global {
  interface Window {
    ethereum: any
  }
}

interface WalletConnetProps {
}

const WalletConnet: FC<WalletConnetProps> = () => {
  const [erroMessage, setErroMessage] = useState<string>('')
  const [account, setAccount] = useState<string>('')
  const [balance, setBalance] = useState<string>('')

  const handleConnect = () => {
    getAccount()
  }

  const getAccount = async () => {
    try {
      if (window.ethereum) {
        // metamask 프로그램 설치 되어 있는 경우
        // 이미 metamask가 연결 되어 있는경우 request 가능함
        const [account]: string[] = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        setAccount(account)
        const balance: string = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [account, 'latest']
        })
        setBalance(ethers.utils.formatEther(balance))
        return
      }
      setErroMessage('Install MetaMask!')
    } catch(error) {
      console.error(error)
    }
  }

  // view
  return (
    <>
      <div>
        <button
          type="button"
          className={`bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white`}
          onClick={handleConnect}
        >
          Connet matamask
        </button>
      </div>
      {erroMessage ? (
        <div className="mt-4">
          <p className="text-white text-sm">{erroMessage}</p>
        </div>
      ) : (
        <div>
          <div className="mt-4">
            <p className="text-white text-sm">account: {account}</p>
          </div>
          <div className="mt-4">
            <p className="text-white text-sm bg">balance: {balance}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default WalletConnet
