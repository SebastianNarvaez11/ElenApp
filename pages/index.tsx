import type { NextPage } from 'next'
import { Typography } from '@mui/material'
import { MainLayout } from '../components/layouts'

const Home: NextPage = () => {
  return (
    <MainLayout title='Elen App'>
      <Typography variant='h4'>Bienvenido Sebas!</Typography>
    </MainLayout>
  )
}

export default Home
