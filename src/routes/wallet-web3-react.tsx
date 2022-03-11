import React, { FC, useState } from 'react'
import { useMoralis } from 'react-moralis'

declare global {
  interface Window {
    ethereum: any
  }
}

interface WalletWeb3ReactProps {}

const WalletWeb3React: FC<WalletWeb3ReactProps> = () => {
  const { authenticate, isAuthenticated } = useMoralis()
  const [account, setAccount] = useState<string>('')

  const login = async () => {
    await authenticate({signingMessage: "Welcome my Voting app" })
          .then(function (user) {
            user && setAccount(user.get('ethAddress'))
          })
          .catch(function (error) {
            console.log(error);
          });
  }

  // view
  return (
    <>
      {/* onClick={() => activateBrowserWallet()} */}
      {!isAuthenticated ? (
        <>
          <div>
            <button
              type="button"
              className={`bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white`}
              onClick={() => login()}
            >
              Connect
            </button>
          </div>
        </>
      ) : (
        <>
          <h1>Account: {account}</h1>
        </>
      )}
    </>
  )
}

export default WalletWeb3React
