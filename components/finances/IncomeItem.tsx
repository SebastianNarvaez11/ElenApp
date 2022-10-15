import { FC, DragEvent } from 'react'
import { Paper, Typography } from '@mui/material'
import { Item } from '../../interfaces'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { set_is_dragging } from '../../redux/slices/uiSlice'
import { toMoney } from '../../utils'

interface Props {
    item: Item
}

export const IncomeItem: FC<Props> = ({ item }) => {

    const { isDragging } = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('item', JSON.stringify(item))
        dispatch(set_is_dragging('income'))
    }


    const onDragEnd = () => {
        dispatch(set_is_dragging(''))
    }

    return (
        <Paper
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            elevation={1}
            style={{
                backgroundColor: '#3ED598',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                marginTop: 8,
                cursor: 'grab',
                maxWidth: 160,
                opacity: isDragging === 'income' ? 0.2 : 1,
                transition: 'all .3s'
            }} ><Typography color='white' fontSize={10} fontWeight='bold'>{item.concept}</Typography>
            <Typography color='white' align='right' fontSize={12} fontWeight='bold'>{toMoney(item.value)}</Typography>
        </Paper>
    )
}