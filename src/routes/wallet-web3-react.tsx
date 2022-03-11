import { useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from 'ethers/lib/utils'
import React, { FC } from 'react'

declare global {
  interface Window {
    ethereum: any
  }
}

interface WalletWeb3ReactProps {
}

const WalletWeb3React: FC<WalletWeb3ReactProps> = () => {
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account)

  // view
  return (
    <>
        {/* onClick={() => activateBrowserWallet()} */}
      <button
        type="button"
        className={`bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white`}
        onClick={() => activateBrowserWallet()}
      >
        Connect
      </button>
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
    </>
  )
}

export default WalletWeb3React
