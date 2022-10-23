import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { CssBaseline } from '@mui/material'
import '../styles/globals.css'
import 'animate.css';
import { store } from '../redux/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp


