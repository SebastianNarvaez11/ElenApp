import { Typography, Box} from '@mui/material'

import { Balance, AddBalanceForm } from '.'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { set_is_adding_balance, set_month_select } from '../../redux/slices/uiSlice'

export const Planner = () => {

    const { isAddingBalance, monthSelected } = useAppSelector(state => state.ui)
    const { balances } = useAppSelector(state => state.finance)

    const dispatch = useAppDispatch()

    return (
        <>
            <Box className='style_scrooll' style={{ overflowX: 'auto', overflowY: 'auto', whiteSpace: 'nowrap', padding: 10, marginTop: 20 }}>

                {balances.filter(balance => new Date(balance.date).getMonth() === monthSelected).map(balance => (
                    <Balance key={balance._id} balance={balance} />
                ))}


                {isAddingBalance ?
                    <Box className='add_button' style={{ display: 'inline-table', width: 250, padding: 15, marginBottom: 50, borderRadius: 15 }}>
                        <AddBalanceForm />
                    </Box>
                    :
                    <Box className='add_button' onClick={() => dispatch(set_is_adding_balance())} style={{ display: 'inline-table', width: 250, padding: 15, marginBottom: 50, borderRadius: 15, cursor: 'pointer' }} >
                        <Typography align='center'>+ Agregar balance</Typography>
                    </Box>
                }
            </Box>
        </>
    )
}
