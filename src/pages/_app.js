import Layout from '@/components/ui/Layout'
import { AuthContextProvider } from '@/context/AuthContext'
import '@/styles/globals.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <ToastContainer autoClose={2000} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </>
  )
}
