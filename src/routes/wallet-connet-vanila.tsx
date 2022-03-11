// import { ethers } from 'ethers'
import { ethers } from 'ethers'
import React, { FC, useState } from 'react'

declare global {
  interface Window {
    ethereum: any
  }
}

interface WalletConnetVanilaProps {
}

const WalletConnetVanila: FC<WalletConnetVanilaProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [account, setAccount] = useState<string>('')
  const [balance, setBalance] = useState<string>('')

  const handleConnect = () => {
    getAccount()
  }

  const getAccount = async () => {
    try {
      if (window.ethereum) {
        // metamask 프로그램 설치 되어 있는 경우
        // 이미 metamask가 연결 되어 있는경우 request 가능하며 연결될때까지 await함
        const [account]: string[] = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        handleAccountChange(account)
        return
      }
      setErrorMessage('Install MetaMask!')
    } catch(error) {
      console.error(error)
    }
  }

  const handleAccountChange = async (account: string) => {
    setAccount(account)
    handleBalance(account.toString())
  }

  const handleBalance = async (account: string) => {
    const balance: string = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [account, 'latest']
    })
    setBalance(ethers.utils.formatEther(balance))
  }

  const handleChainChanged = (chainId: string) => {
    // console.log('chainId', chainId)
    window.location.reload()
  }

  window.ethereum.on('accountsChanged', handleAccountChange)
  window.ethereum.on('chainChanged', handleChainChanged)

  // view
  return (
    <>
      <button
        type="button"
        className={`bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white`}
        onClick={handleConnect}
      >
        Connet matamask
      </button>
      {errorMessage ? (
        <div className="mt-4">
          <p className="text-white text-sm">{errorMessage}</p>
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

export default WalletConnetVanila
