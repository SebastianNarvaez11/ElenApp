import { Paper, Box, Typography, IconButton } from "@mui/material"
import { addDaily } from "../../redux/actions/financesActions"

import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { ExpenseItem } from "./ExpenseItem"
import { IncomeItem } from "./IncomeItem"

export const Daily = () => {

    const { monthSelected } = useAppSelector(state => state.ui)
    const { items, dailies } = useAppSelector(state => state.finance)

    const dispatch = useAppDispatch()



    


    const onSaveDaily = () => {
        const date = new Date()
        date.setMonth(monthSelected)

        dispatch(addDaily(Number(date)))
    }

    return (
        <Box>
            <Box
                onClick={onSaveDaily}
                display='flex'
                className="add_button"
                style={{
                    width: 200,
                    height: 200,
                    margin: '0px auto',
                    cursor: 'pointer'
                }}
                justifyContent='center'
                alignItems='center'>
                <Typography>+ Crear Diario</Typography>
            </Box>

            <Paper elevation={1} style={{ maxWidth: 320, padding: 20, margin: '0px auto' }}>
                {items.map(item => {

                    if (item.type === 'expense') {
                        return (
                            <Box display='flex'>
                                <Box flex={1} style={{ borderRight: '1px dashed' }}>
                                    <ExpenseItem item={item} />
                                </Box>
                                <Box flex={1} />
                            </Box>
                        )
                    } else {
                        return (
                            <Box display='flex'>
                                <Box flex={1} />
                                <Box flex={1} style={{ borderLeft: '1px dashed' }}>
                                    <IncomeItem item={item} />
                                </Box>
                            </Box>
                        )
                    }
                })}
            </Paper>
        </Box>
    )
}
