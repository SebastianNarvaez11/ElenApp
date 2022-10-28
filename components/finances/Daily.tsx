import { useMemo, DragEvent } from "react"
import { Paper, Box, Typography, IconButton } from "@mui/material"
import { addDaily, updateDaily } from "../../redux/actions/financesActions"

import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getDailyByMonth } from "../../utils"
import { ExpenseItem } from "./ExpenseItem"
import { IncomeItem } from "./IncomeItem"
import { IItem } from "../../interfaces"

export const Daily = () => {

    const { monthSelected } = useAppSelector(state => state.ui)
    const { dailies } = useAppSelector(state => state.finance)

    const dispatch = useAppDispatch()


    const current_daily = useMemo(() => getDailyByMonth(monthSelected, dailies), [monthSelected, dailies])

    const onSaveDaily = () => {
        const date = new Date()
        date.setMonth(monthSelected)
        dispatch(addDaily(Number(date)))
    }


    const onDrop = (e: DragEvent) => {
        const item: IItem = JSON.parse(e.dataTransfer.getData('item'))
        const items = [...current_daily?.items || [], item]

        dispatch(updateDaily(current_daily?._id!, items))
    }


    const onDragOver = (e: DragEvent) => {
        return e.preventDefault()
    }

    const deleteItemFromDaily = (id : string) => {
        const items = current_daily?.items.filter(daily => daily._id !== id)
        dispatch(updateDaily(current_daily?._id!, items!))
    }

    return (
        <Box>
            {!current_daily ?
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
                :
                <Paper
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    elevation={0}
                    style={{
                        maxWidth: 320,
                        padding: 20,
                        margin: '0px auto'
                    }} >
                    {current_daily.items.map((item, index) => {

                        if (item.type === 'expense') {
                            return (
                                <Box display='flex'>
                                    <Box flex={1} style={{ borderRight: '1px dashed' }}>
                                        <ExpenseItem item={item} deleteItemFromDaily={deleteItemFromDaily}/>
                                    </Box>
                                    <Box flex={1} />
                                </Box>
                            )
                        } else {
                            return (
                                <Box display='flex'>
                                    <Box flex={1} />
                                    <Box flex={1} style={{ borderLeft: '1px dashed' }}>
                                        <IncomeItem item={item} deleteItemFromDaily={deleteItemFromDaily} />
                                    </Box>
                                </Box>
                            )
                        }
                    })}
                </Paper>
            }



        </Box>
    )
}
