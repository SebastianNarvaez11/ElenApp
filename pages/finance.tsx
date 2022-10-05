import React from 'react'
import { NextPage } from 'next'
import { Typography, Grid, Paper } from '@mui/material'

import { MainLayout } from '../components/layouts'
import { ExpenseItem } from '../components/finances'

const FinancePage: NextPage = () => {
    return (
        <MainLayout title='Elen App'>
            <Typography variant='h4' style={{ marginLeft: 5 }}>Finanzas</Typography>
            <Grid container style={{ marginTop: 30 }}>
                <Grid item xs={12} sm={3} md={2} lg={2} style={{padding: 10, borderRight: '1px solid #E4EAF2'}}>
                    <Typography style={{marginBottom: 20}} >Gastos:</Typography>

                    <Grid container columnSpacing={2}>
                        <Grid item xs={12}>
                            <ExpenseItem />
                        </Grid>
                        <Grid item xs={12}>
                            <ExpenseItem />
                        </Grid>
                        <Grid item xs={12}>
                            <ExpenseItem />
                        </Grid>
                        <Grid item xs={12}>
                            <ExpenseItem />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs style={{paddingLeft: 20}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={0} style={{ backgroundColor: '#D4F5E9', padding: 5 }}>
                                <Typography>Ingreso:</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={0} style={{ backgroundColor: '#D4F5E9', padding: 5 }}>
                                <Typography>Ingreso:</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={0} style={{ backgroundColor: '#D4F5E9', padding: 5 }}>
                                <Typography>Ingreso:</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={0} style={{ backgroundColor: '#D4F5E9', padding: 5 }}>
                                <Typography>Ingreso:</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainLayout>
    )
}

export default FinancePage