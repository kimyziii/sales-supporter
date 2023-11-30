import Layout from '@/components/ui/Layout'
import '@/styles/globals.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer autoClose={2000} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
