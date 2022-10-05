import React from 'react'
import { Paper, Typography } from '@mui/material'

export const ExpenseItem = () => {
    return (
        <Paper elevation={1} style={{ backgroundColor: '#FF716A', paddingLeft: 10, paddingRight: 10, paddingTop: 5, marginTop: 8, cursor: 'grab' }} draggable>
            <Typography color='white' fontSize={10} fontWeight='bold'>Arrendamiento:</Typography>
            <Typography color='white' align='right' fontSize={10} fontWeight='bold'>$ 400.000</Typography>
        </Paper>
    )
}