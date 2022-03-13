import React, { FC, useCallback, useEffect, useState } from 'react'
import { useChain, useMoralis } from 'react-moralis'
import { useLocation, useNavigate } from 'react-router-dom'
import { WinnerCard } from '../components/WinnerCard'
import { ICountItem } from '../lib/type'

const WalletConnect: FC = () => {
  const CONNECT_MESSAGE = 'Your account will be linked to this address.'
  const navigate = useNavigate()
  const { pathname: path } = useLocation()

  const { chain, account } = useChain()
  const { authenticate, isAuthenticated, isAuthenticating, Moralis } = useMoralis()
  const [winnerList, setWinnerList] = useState<ICountItem[]>([])

  const login = async () => {
    try {
      await authenticate({ signingMessage: CONNECT_MESSAGE })
    } catch (error) {
      console.error(error)
    }
  }

  const handleWalletConnect = async () => {
    try {
      const user = await Moralis.authenticate({
        provider: 'walletconnect',
        mobileLinks: [
          'rainbow',
          'metamask',
          'trust',
        ],
        chainId: 56,
      })
      console.log('user', user)
    } catch(error) {
      console.error(error)
      // console.log(typeof error, error.message)
    }
  }

  const handleChageChain = useCallback(() => {
    console.log('handleChageChain', chain && chain.nativeCurrency.symbol)
  }, [chain])

  const handleChangeAccount = useCallback(() => {
    console.log('account', account)
  }, [account])

  const goVote = useCallback(() => {
    navigate('/vote')
  }, [navigate])

  useEffect(() => {
    handleChageChain()
    handleChangeAccount()
    isAuthenticated && goVote()
  }, [
    chain,
    account,
    isAuthenticated,
    handleChageChain,
    handleChangeAccount,
    goVote,
  ])

  useEffect(() => {
    let winnerList: ICountItem[] = []
    for (let i = 0; i < 3; i++) {
      const anonymousWinner: ICountItem = {
        id: i + 1,
        name: '???',
        imageName: 'silhouette.png',
        count: 0,
      }
      winnerList = [...winnerList, anonymousWinner]
    }
    setWinnerList(winnerList)
  }, [])

  // view
  return (
    <>
      {isAuthenticating && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-white bg-opacity-60 z-10 flex items-center justify-center">
          <svg
            className="animate-spin h-14 w-14 text-indigo-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      {
        !isAuthenticated && (
          <div className="h-full flex flex-col flex-auto">
            <div className="text-white text-center">
              <h2 className="text-lg font-bold py-2">
                Please vote after Connect with wallet
              </h2>
              <p>
                Connect with one of our available wallet providers and Vote to
                your singer.
              </p>
            </div>
            <WinnerCard winnerList={winnerList} path={path} />
            <div className="mt-auto">
              <button
                type="button"
                className={`bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white`}
                onClick={() => login()}
              >
                Connect Metamask
              </button>
            </div>
            <div className="mt-2">
              <button
                type="button"
                className={`bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white`}
                onClick={handleWalletConnect}
              >
                Connet with walletconnect
              </button>
            </div>
            {/* <div className="mt-2">
              <button
                type="button"
                className={`bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-500 text-slate-100 font-bold text-sm rounded-md w-full py-3 text-white`}
                disabled={isAuthenticating}
                onClick={() => logout()}
              >
                Disconnect
              </button>
            </div> */}
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
