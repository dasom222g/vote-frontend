// import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
// import { ethers } from 'ethers'
import React, { FC, useEffect, useState } from 'react'
import { injected } from '../lib/connection'

declare global {
  interface Window {
    ethereum: any
  }
}

interface WalletWeb3ReactProps {
}

const WalletWeb3React: FC<WalletWeb3ReactProps> = () => {
  const { connector, chainId, account, active, error, activate, deactivate } = useWeb3React()

  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleConnect = () => {
    if(active) {
      deactivate();
      return;
    }
    // 연결 안된경우
    activate(injected,(error: Error)=>{
      setErrorMessage(error.message)
      // if('/No Ethereum provider was found on window.ethereum/'){
      //   window.open('https://metamask.io/download.html');
      // }
    });
  }

  useEffect(() => {
    console.log('active', active)
  }, [active])


  // view
  return (
    <>
      <p className="p-3">connector: {connector}</p>
      <p className="p-3">chainId: {chainId}</p>
      <p className="p-3">error: {error}</p>
      <button
        type="button"
        className={`bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white`}
        onClick={handleConnect}
      >
        {active ? 'Connet matamask' : ''}
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
          {/* <div className="mt-4">
            <p className="text-white text-sm bg">balance: {balance}</p>
          </div> */}
        </div>
      )}
    </>
  )
}

export default WalletWeb3React
