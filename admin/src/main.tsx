/* eslint-disable import/default */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '@smastrom/react-rating/style.css'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
)
