import { Paper, Box } from "@mui/material"
import { useAppSelector } from "../../redux/hooks"
import { ExpenseItem } from "./ExpenseItem"
import { IncomeItem } from "./IncomeItem"

export const Daily = () => {

    const { items } = useAppSelector(state => state.finance)

    return (
        <Box>
            <Paper elevation={1} style={{ maxWidth: 320, padding: 20, margin: '0px auto' }}>
                {items.map(item => {

                    if (item.type === 'expense') {
                        return (
                            <Box display='flex'>
                                <Box flex={1} style={{borderRight : '1px dashed'}}>
                                    <ExpenseItem item={item} />
                                </Box>
                                <Box flex={1} />
                            </Box>
                        )
                    } else {
                        return (
                            <Box display='flex'>
                                <Box flex={1} />
                                <Box flex={1} style={{borderLeft : '1px dashed'}}>
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
