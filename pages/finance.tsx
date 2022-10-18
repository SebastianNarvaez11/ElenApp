import { useEffect } from 'react'
import { NextPage } from 'next'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Typography, Grid } from '@mui/material'

import { MainLayout } from '../components/layouts'
import { Balance, ExpenseItem, IncomeItem, AddExpenseItem, AddIncomeItem, AddBalanceForm } from '../components/finances'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { set_is_adding_balance, set_is_adding_expense, set_is_adding_income } from '../redux/slices/uiSlice'
import { fetchBalances, fetchItems } from '../redux/actions/financesActions'

const FinancePage: NextPage = () => {


    const { isAddingBalance } = useAppSelector(state => state.ui)
    const { balances, items } = useAppSelector(state => state.finance)

    const dispatch = useAppDispatch()

    const current_date = new Date()

    useEffect(() => {
        dispatch(fetchItems())
        dispatch(fetchBalances())
    }, [])

    


    return (
        <MainLayout title='Elen App'>
            <Typography variant='h4' style={{ marginLeft: 5 }}>Finanzas</Typography>
            <Grid container style={{ marginTop: 10 }}>
                <Grid item xs={12} sm={3} md={2} lg={2} style={{ padding: 20 }} >

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

                <Grid item xs={12} sm={9} md={10} lg={10}>
                    <Typography align='center' textTransform='uppercase' variant='h6'>{format(current_date, 'MMMM', { locale: es })}</Typography>
                    <div className='style_scrooll' style={{ overflowX: 'auto', overflowY: 'auto', whiteSpace: 'nowrap', padding: 10 }}>

                        {/* TODO: cambiar el key por el _id */}
                        {balances.map((balance, index) => (
                            <Balance key={index} balance={balance} />
                        ))}

                        {isAddingBalance ?
                            <div className='add_button' style={{ display: 'inline-table', width: 250, padding: 15, marginBottom: 50, borderRadius: 15 }}>
                                <AddBalanceForm />
                            </div>
                            :
                            <div className='add_button' onClick={() => dispatch(set_is_adding_balance())} style={{ display: 'inline-table', width: 250, padding: 15, marginBottom: 50, borderRadius: 15, cursor: 'pointer' }} >
                                <Typography align='center'>+ Agregar balance</Typography>
                            </div>
                        }
                    </div>
                </Grid>
            </Grid>
        </MainLayout>
    )
}

export default FinancePage