import { useState } from 'react'
import { NextPage } from 'next'
import { Typography, Grid, Box } from '@mui/material'

import { ExpenseItem, IncomeItem, AddExpenseItem, AddIncomeItem, Planner, Daily } from '../../components/finances'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { set_is_adding_expense, set_is_adding_income } from '../../redux/slices/uiSlice'
import { MainLayout } from '../../components/layouts'


const FinancePage: NextPage = () => {

    const { items } = useAppSelector(state => state.finance)
    const dispatch = useAppDispatch()

    const [screen, setScreen] = useState(false)

    return (
        <MainLayout title='Elen App'>

            <Box display='flex'>
                <Typography variant='h4' style={{ marginLeft: 20 }}>Finanzas</Typography>
                <Box flex={1} />
                <Box display='flex' sx={{ backgroundColor: '#F2EFFC', padding: 0.3, borderRadius: 2, width: 240 }}>
                    <Box sx={{ backgroundColor: !screen ? 'white' : 'transparent', borderRadius: 2, padding: 1, width: 120, cursor: 'pointer' }} onClick={() => setScreen(false)}>
                        <Typography align='center' color={!screen ? '#593EFF' : '#494969'} fontWeight={500}>Diario</Typography>
                    </Box>
                    <Box sx={{ backgroundColor: screen ? 'white' : 'transparent', borderRadius: 2, padding: 1, width: 120, cursor: 'pointer' }} onClick={() => setScreen(true)}>
                        <Typography align='center' color={screen ? '#593EFF' : '#494969'} fontWeight={500}>Planificador</Typography>
                    </Box>
                </Box>
                <Box flex={1} />
            </Box>

            <Grid container style={{ marginTop: 10 }}>
                <Grid item xs={12} sm={3} md={2} lg={2} style={{ padding: 20}} >

                    <Typography>Gastos:</Typography>
                    <div className='add_button' style={{ padding: 3, maxWidth: 160, marginTop: 10, cursor: 'pointer' }} onClick={() => dispatch(set_is_adding_expense())}>
                        <Typography align='center'>+ Agregar</Typography>
                    </div>

                    <AddExpenseItem />

                    <Grid container columnSpacing={2} style={{ marginBottom: 20 }}>
                        {items.filter(item => item.type === 'expense').map((item) => (
                            <Grid item xs={6} sm={12} key={item._id}>
                                <ExpenseItem item={item} />
                            </Grid>
                        ))}
                    </Grid>

                    <Typography >Ingresos:</Typography>
                    <div className='add_button' style={{ padding: 3, maxWidth: 160, marginTop: 10, cursor: 'pointer' }} onClick={() => dispatch(set_is_adding_income())}>
                        <Typography align='center'>+ Agregar</Typography>
                    </div>

                    <AddIncomeItem />

                    <Grid container columnSpacing={2} style={{ marginBottom: 20 }}>
                        {items.filter(item => item.type === 'income').map((item) => (
                            <Grid item xs={6} sm={12} key={item._id}>
                                <IncomeItem item={item} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={9} md={10} lg={10} paddingTop={6}>
                    {screen ?
                        <Planner />
                        :
                        <Daily />
                    }
                </Grid>
            </Grid>
        </MainLayout>
    )
}


export default FinancePage