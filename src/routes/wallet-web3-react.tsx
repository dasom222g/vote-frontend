import React, { FC, useCallback, useEffect } from 'react'
import { useChain, useMoralis } from 'react-moralis'

const WalletConnect: FC = () => {
  const CONNECT_MESSAGE = 'Your account will be linked to this address.'
  // const STORAGE_KEY = `Parse/${process.env.REACT_APP_MORALIS_APPLICATION_ID}/currentUser`

  const { chain, account } = useChain()
  const { authenticate, isAuthenticated, isAuthenticating } = useMoralis()

  console.log('account!!!', account)

  const login = async () => {
    try {
      await authenticate({signingMessage: CONNECT_MESSAGE })
    } catch (error) {
      console.error(error)
    }
  }

  const handleChageChain = useCallback(() => {
    console.log('handleChageChain', chain && chain.nativeCurrency.symbol)
  }, [chain])

  const handleChangeAccount = useCallback(() => {
    console.log('account', account)
  }, [account])

  useEffect(() => {
    handleChageChain()
    handleChangeAccount()
    console.log('isAuthenticated', isAuthenticated)
  }, [handleChageChain, chain, handleChangeAccount, account, isAuthenticated])

  // view
  return (
    <>
      {isAuthenticating  && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-white bg-opacity-60 z-10 flex items-center justify-center">
          <svg className="animate-spin h-14 w-14 text-indigo-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      {!isAuthenticated && (
        <div className="h-full flex flex-col flex-auto justify-between">
          <div className="text-white text-center">
            <h2 className="text-lg font-bold py-2">Connect with wallet</h2>
            <p>Connect with one of our available wallet providers.</p>
          </div>
          <div>
            <button
              type="button"
              className={`bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white`}
              onClick={() => login()}
            >
              Connect
            </button>
          </div>
        </div>
      )
        // <>
        //   {/* <p className="text-sm">Account: {user && user.get('ethAddress')}</p> */}
        //   <p className="text-sm">Account: {account || user!.get('ethAddress')}</p>
        //   <div className="mt-2">
        //     <button
        //       type="button"
        //       className={`bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white`}
        //       disabled={isAuthenticating}
        //       onClick={() => logout()}
        //     >
        //       Disconnect
        //     </button>
        //   </div>
        //   <div className="mt-2">
        //     <button
        //       type="button"
        //       className={`bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white`}
        //       disabled={isAuthenticating}
        //       onClick={() => switchNetwork("0x1")}
        //     >
        //       Change to Ethereum Mainnet
        //     </button>
        //   </div>
        // </>
      }
    </>
  )
}

export default WalletConnect
