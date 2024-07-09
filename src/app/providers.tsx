'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { State, WagmiProvider } from 'wagmi'

import { config, projectId } from '../wagmi_config'
import { createWeb3Modal } from '@web3modal/wagmi/react'

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics:true,
  enableOnramp:true
})

export function Providers({
  children, initialState
  }: {
    children: ReactNode
    initialState?:State
   }) {
  const queryClient =  new QueryClient()

  return (
    <WagmiProvider config={config} reconnectOnMount={false} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
