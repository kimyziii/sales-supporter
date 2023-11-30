import Layout from '@/components/ui/Layout'
import '@/styles/globals.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
