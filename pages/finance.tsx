import { useMemo } from 'react'
import { NextPage } from 'next'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Typography, Grid, Paper } from '@mui/material'

import { MainLayout } from '../components/layouts'
import { ExpenseItem, IncomeItem } from '../components/finances'
import { getAllDaysInMonth } from '../utils'

const FinancePage: NextPage = () => {


    const current_date = new Date()

    const dates = useMemo(() => getAllDaysInMonth(current_date.getFullYear(), current_date.getMonth()), [current_date.getFullYear(), current_date.getMonth()])

    return (
        <MainLayout title='Elen App'>
            <Typography variant='h4' style={{ marginLeft: 5 }}>Finanzas</Typography>
            <Grid container style={{ marginTop: 30 }}>
                <Grid item xs={12} sm={3} md={2} lg={2} style={{ padding: 20, borderRight: '1px solid #E4EAF2' }}>
                    <Typography>Gastos:</Typography>

                    <Grid container columnSpacing={2} style={{ marginBottom: 20 }} >
                        <Grid item xs={6} sm={12}>
                            <ExpenseItem />
                        </Grid>
                        <Grid item xs={6} sm={12}>
                            <ExpenseItem />
                        </Grid>
                        <Grid item xs={6} sm={12}>
                            <ExpenseItem />
                        </Grid>
                        <Grid item xs={6} sm={12}>
                            <ExpenseItem />
                        </Grid>
                    </Grid>

                    <Typography >Ingresos:</Typography>

                    <Grid container columnSpacing={2}>
                        <Grid item xs={6} sm={12}>
                            <IncomeItem />
                        </Grid>
                        <Grid item xs={6} sm={12}>
                            <IncomeItem />
                        </Grid>
                        <Grid item xs={6} sm={12}>
                            <IncomeItem />
                        </Grid>
                        <Grid item xs={6} sm={12}>
                            <IncomeItem />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={9} md={10} lg={10}>
                    <Typography align='center' textTransform='uppercase' variant='h6'>{format(current_date, 'MMMM', { locale: es })}</Typography>
                    <div className='style_scrooll' style={{ overflowX: 'auto', overflowY: 'auto', whiteSpace: 'nowrap', margin: 30, height: '70%' }}>
                        {dates.map(date => (
                            <div key={date.getDate()} style={{ display: 'inline-table', borderRight: '1px solid #E4EAF2', height: '100%', width: '20%' }}>
                                <Typography fontSize={20} align='center'>{date.getDate()}</Typography>
                                <div style={{ padding: 10 }}>
                                    <ExpenseItem />
                                </div>
                            </div>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </MainLayout>
    )
}

export default FinancePage