import { useMemo, FC, DragEvent } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Grid, Paper, Typography, Box } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';

import { Balance as IBalance, Item } from "../../interfaces"
import { ExpenseItem } from "./ExpenseItem"
import { IncomeItem } from "./IncomeItem"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { deleteBalance, updateBalance } from "../../redux/actions/financesActions"
import { toMoney, totalValueItems } from "../../utils"

interface Props {
    balance: IBalance
}

export const Balance: FC<Props> = ({ balance }) => {

    const { isDragging } = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()

    const total_expense = useMemo(() => totalValueItems(balance.items.filter(item => item.type === 'expense')), [balance.items])
    const total_income = useMemo(() => totalValueItems(balance.items.filter(item => item.type === 'income')), [balance.items])



    const onDrop = (event: DragEvent) => {
        const item: Item = JSON.parse(event.dataTransfer.getData('item'))

        const existeItem = balance.items.find((i) => i._id === item._id)

        if (existeItem) return

        const items: Item[] = [...balance.items, item]

        dispatch(updateBalance(balance._id, items, item._id ,undefined))
    }

    const onDragOverExpense = (event: DragEvent) => {
        if (isDragging === 'expense') {
            return event.preventDefault()
        }
    }

    const onDragOverIncome = (event: DragEvent) => {
        if (isDragging === 'income') {
            return event.preventDefault()
        }
    }



    const deleteItemFromBalance = (id_item: string) => {
        const items = balance.items.filter(item => id_item !== item._id)
        dispatch(updateBalance(balance._id, items))
    }

    const onDeleteBalance = () => {
        dispatch(deleteBalance(balance._id))
    }

    return (
        <Paper elevation={1} style={{ display: 'inline-table', width: 350, marginRight: 10, padding: 15, marginBottom: 20, borderRadius: 5 }}>

            <Box display='flex'>
                <Typography align="center" marginBottom={1}>{format(balance.date, 'dd MMMM yyyy', { locale: es })}</Typography>
                <Box flex={1} />
                <ClearIcon fontSize='small' style={{cursor: 'pointer' }} onClick={onDeleteBalance} />
            </Box>


            <Grid container spacing={1}>

                <Grid item xs={6} sm={6}>
                    <div className={isDragging === 'expense' ? 'dragging' : ''} style={{ backgroundColor: '#FFE5E7', padding: 10, borderRadius: 5, height: '100%', minHeight: 200 }} onDrop={onDrop} onDragOver={onDragOverExpense}>
                        <Typography align="center">Gastos</Typography>
                        {balance.items.filter(item => item.type === 'expense').map((item, index) => (
                            <ExpenseItem key={item._id + index} item={item} deleteItemFromBalance={deleteItemFromBalance} />
                        ))}
                    </div>
                </Grid>

                <Grid item xs={6} sm={6}>
                    <div className={isDragging === 'income' ? 'dragging' : ''} style={{ backgroundColor: '#D4F5E9', padding: 10, borderRadius: 5, height: '100%', minHeight: 200 }} onDrop={onDrop} onDragOver={onDragOverIncome}>
                        <Typography align="center">Ingresos</Typography>
                        {balance.items.filter(item => item.type === 'income').map((item, index) => (
                            <IncomeItem key={item._id + index} item={item} deleteItemFromBalance={deleteItemFromBalance} />
                        ))}
                    </div>
                </Grid>

            </Grid>

            <Grid container spacing={1}>
                <Grid item xs={6} sm={6}>
                    <div style={{ backgroundColor: '#FFE5E7', padding: 5, borderRadius: 5, marginTop: 3 }}>
                        <Typography align="center" color="#FF565E">{toMoney(total_expense)}</Typography>
                    </div>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <div style={{ backgroundColor: '#D4F5E9', padding: 5, borderRadius: 5, marginTop: 3 }}>
                        <Typography align="center" color="#3ED598" >{toMoney(total_income)}</Typography>
                    </div>
                </Grid>
            </Grid>

            <div style={{ backgroundColor: '#FEF3D9', padding: 5, borderRadius: 5, marginTop: 5 }}>
                <Typography align="center" color="#FFC542">{toMoney(total_income - total_expense)}</Typography>
            </div>
        </Paper>
    )
}
