import { useMemo, FC, DragEvent } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Grid, Paper, Typography } from "@mui/material"
import { Balance as IBalance, Item } from "../../interfaces"
import { ExpenseItem } from "./ExpenseItem"
import { IncomeItem } from "./IncomeItem"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { AddItemToBalance } from "../../redux/actions/financesActions"
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
        dispatch(AddItemToBalance(balance._id, item._id))
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


    return (
        <Paper elevation={1} style={{ display: 'inline-table', width: 400, marginRight: 30, padding: 15, marginBottom: 50, borderRadius: 15 }}>
            <Typography align="center" marginBottom={1}>{format(balance.date, 'dd MMMM yyyy', { locale: es })}</Typography>

            <Grid container spacing={1}>

                <Grid item xs={6} sm={6}>
                    <div className={isDragging === 'expense' ? 'dragging': ''} style={{ backgroundColor: '#FFE5E7', padding: 10, borderRadius: 5, height: '100%', minHeight: 200 }} onDrop={onDrop} onDragOver={onDragOverExpense}>
                        <Typography align="center">Gastos</Typography>
                        {balance.items.filter(item => item.type === 'expense').map((item, index) => (
                            <ExpenseItem key={item._id + index} item={item} />
                        ))}
                    </div>
                </Grid>

                <Grid item xs={6} sm={6}>
                    <div className={isDragging === 'income' ? 'dragging': ''} style={{ backgroundColor: '#D4F5E9', padding: 10, borderRadius: 5, height: '100%', minHeight: 200 }} onDrop={onDrop} onDragOver={onDragOverIncome}>
                        <Typography align="center">Ingresos</Typography>
                        {balance.items.filter(item => item.type === 'income').map((item, index) => (
                            <IncomeItem key={item._id + index} item={item} />
                        ))}
                    </div>
                </Grid>

            </Grid>

            <Grid container spacing={1}>
                <Grid item xs={6} sm={6}>
                    <div style={{ backgroundColor: '#FFE5E7', padding: 5, borderRadius: 5, marginTop: 3 }}>
                        <Typography align="center" fontWeight="bold" color="#FF565E">{toMoney(total_expense)}</Typography>
                    </div>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <div style={{ backgroundColor: '#D4F5E9', padding: 5, borderRadius: 5, marginTop: 3 }}>
                        <Typography align="center" fontWeight="bold" color="#3ED598" >{toMoney(total_income)}</Typography>
                    </div>
                </Grid>
            </Grid>

            <div style={{ backgroundColor: '#FEF3D9', padding: 5, borderRadius: 5, marginTop: 10 }}>
                <Typography align="center" fontWeight="bold" color="#FFC542">{toMoney(total_income - total_expense)}</Typography>
            </div>
        </Paper>
    )
}
