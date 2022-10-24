import { Paper, Box } from "@mui/material"
import { useAppSelector } from "../../redux/hooks"
import { ExpenseItem } from "./ExpenseItem"
import { IncomeItem } from "./IncomeItem"

export const Daily = () => {

    const { items } = useAppSelector(state => state.finance)

    return (
        <Box display='flex'>
            <Box flex={1} />
            <Box flex={{ xs: 20, sm: 5, md: 2 }}>
                <Paper elevation={1}>
                    {items.map(item => {
                        if (item.type === 'expense') {
                            return (
                                <ExpenseItem item={item} />
                            )
                        } else {
                            return (
                                <IncomeItem item={item} />
                            )
                        }
                    })}
                </Paper>
            </Box>
            <Box flex={1} />
        </Box>
    )
}
