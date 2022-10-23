import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Typography, IconButton, Box } from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowNext from '@mui/icons-material/ArrowForwardIosOutlined';

import { Balance, AddBalanceForm } from '.'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { set_is_adding_balance, set_month_select } from '../../redux/slices/uiSlice'

export const Planner = () => {

    const { isAddingBalance, monthSelected } = useAppSelector(state => state.ui)
    const { balances } = useAppSelector(state => state.finance)

    const dispatch = useAppDispatch()

    const current_date = new Date().setMonth(monthSelected)

    return (
        <>
            <Box display='flex' justifyContent='space-evenly' alignItems='center' >
                <IconButton onClick={() => dispatch(set_month_select(monthSelected - 1))}>
                    <ArrowBack />
                </IconButton>

                <Typography textTransform='uppercase' variant='h6'>{format(current_date, 'MMMM', { locale: es })}</Typography>

                <IconButton onClick={() => dispatch(set_month_select(monthSelected + 1))}>
                    <ArrowNext />
                </IconButton>
            </Box>

            <div className='style_scrooll' style={{ overflowX: 'auto', overflowY: 'auto', whiteSpace: 'nowrap', padding: 10, marginTop: 20 }}>

                {balances.filter(balance => new Date(balance.date).getMonth() === monthSelected).map(balance => (
                    <Balance key={balance._id} balance={balance} />
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
        </>
    )
}
