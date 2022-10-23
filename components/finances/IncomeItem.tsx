import { FC, DragEvent } from 'react'

import { Paper, Typography, Box } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';

import { IItem } from '../../interfaces'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { set_is_dragging } from '../../redux/slices/uiSlice'
import { toMoney } from '../../utils'
import { deleteItem } from '../../redux/actions/financesActions';

interface Props {
    item: IItem,
    deleteItemFromBalance?: (id_item: string) => void
}

export const IncomeItem: FC<Props> = ({ item, deleteItemFromBalance }) => {

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
            className='animate__animated animate__fadeIn'
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
            }} >
            <Box display='flex'>
                <Typography color='white' fontSize={13}>{toMoney(item.value)}</Typography>
                <Box flex={1} />
                {deleteItemFromBalance ?
                    <ClearIcon fontSize='small' style={{ height: 15, width: 15, cursor: 'pointer' }} onClick={() => deleteItemFromBalance(item._id)} />
                    :
                    <ClearIcon fontSize='small' style={{ height: 15, width: 15, cursor: 'pointer' }} onClick={() => dispatch(deleteItem(item._id))} />
                }
            </Box>
            <Typography color='white' align='right' fontSize={11}>{item.concept}</Typography>
        </Paper>
    )
}