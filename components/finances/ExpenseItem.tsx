import { FC, DragEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

import { Box, IconButton, Paper, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';

import { Item } from '../../interfaces'
import { set_is_dragging } from '../../redux/slices/uiSlice'
import { toMoney } from '../../utils'

interface Props {
    item: Item,
    deleteItemFromBalance?: (id_item: string) => void
}

export const ExpenseItem: FC<Props> = ({ item, deleteItemFromBalance }) => {

    const { isDragging } = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('item', JSON.stringify(item))
        dispatch(set_is_dragging('expense'))
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
                backgroundColor: '#FF716A',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                marginTop: 8,
                cursor: 'grab',
                maxWidth: 160,
                opacity: isDragging === 'expense' ? 0.2 : 1,
                transition: 'all .3s'
            }} >
            <Box display='flex'>
                <Typography color='white' fontSize={13}>{toMoney(item.value)}</Typography>
                <Box flex={1} />
                {deleteItemFromBalance &&
                    <ClearIcon fontSize='small' style={{ height: 15, width: 15, cursor: 'pointer' }} onClick={() => deleteItemFromBalance(item._id)} />
                }
            </Box>
            <Typography color='white' align='right' fontSize={11}>{item.concept}</Typography>
        </Paper>
    )
}