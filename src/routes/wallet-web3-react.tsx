import React, { FC, useEffect } from 'react'
import { useMoralis } from 'react-moralis'

declare global {
  interface Window {
    ethereum: any
  }
}

interface WalletWeb3ReactProps {}

const WalletWeb3React: FC<WalletWeb3ReactProps> = () => {
  const { authenticate, isAuthenticated, user, logout, isAuthenticating } = useMoralis()
  const login = async () => {
    await authenticate({signingMessage: "Welcome my Voting app" })
          .then(function (user) {
            console.log(user)
          })
          .catch(function (error) {
            console.log(error);
          });
  }

  useEffect(() => {
    console.log('isAuthenticating', isAuthenticating)    
  }, [isAuthenticating])

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
          <h1>Account: {user && user.get('ethAddress')}</h1>
          <div className="mt-2">
            <button
              type="button"
              className={`bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white`}
              disabled={isAuthenticating}
              onClick={() => logout()}
            >
              Disconnect
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default WalletWeb3React
