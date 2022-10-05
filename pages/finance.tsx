import { NextPage } from 'next'
import { Typography, Grid, Paper } from '@mui/material'

import { MainLayout } from '../components/layouts'

const FinancePage: NextPage = () => {
    return (
        <MainLayout title='Elen App'>
            <Typography variant='h4'>Finanzas</Typography>
            <Grid container style={{ marginTop: 30 }}>
                <Grid item xs={12} sm={4} md={3} lg={2} style={{ padding: 10 }}>
                    <Typography>Gastos:</Typography>

                    <Paper elevation={2} style={{ backgroundColor: '#FF716A', paddingLeft: 10, paddingRight: 10,  marginTop: 10}} draggable>
                        <Typography color='white'>Arrendamiento</Typography>
                        <Typography color='white' align='right' style={{ fontWeight: 'bold' }}>$ 400.000</Typography>
                    </Paper>
                    <Paper elevation={2} style={{ backgroundColor: '#FF716A', paddingLeft: 10, paddingRight: 10,  marginTop: 10}} draggable>
                        <Typography color='white'>Arrendamiento</Typography>
                        <Typography color='white' align='right' style={{ fontWeight: 'bold' }}>$ 400.000</Typography>
                    </Paper>
                    <Paper elevation={2} style={{ backgroundColor: '#FF716A', paddingLeft: 10, paddingRight: 10,  marginTop: 10}} draggable>
                        <Typography color='white'>Arrendamiento</Typography>
                        <Typography color='white' align='right' style={{ fontWeight: 'bold' }}>$ 400.000</Typography>
                    </Paper>
                    <Paper elevation={2} style={{ backgroundColor: '#FF716A', paddingLeft: 10, paddingRight: 10,  marginTop: 10}} draggable>
                        <Typography color='white'>Arrendamiento</Typography>
                        <Typography color='white' align='right' style={{ fontWeight: 'bold' }}>$ 400.000</Typography>
                    </Paper>

                </Grid>

                <Grid item xs >
                    Sebas
                </Grid>
            </Grid>
        </MainLayout>
    )
}

export default FinancePage