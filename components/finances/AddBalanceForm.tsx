
import { useMemo, useState } from 'react';
import { Box, Typography, InputLabel, Select, FormControl, MenuItem, Button, SelectChangeEvent } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { set_is_adding_balance } from '../../redux/slices/uiSlice';
import { getAllDaysInMonth } from '../../utils';
import { AddBalance } from '../../redux/actions/financesActions';

export const AddBalanceForm = () => {

    const { monthSelected } = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()

    const current_date = new Date()
    const dates = useMemo(() => getAllDaysInMonth(current_date.getFullYear(), current_date.getMonth()), [current_date.getFullYear(), current_date.getMonth()])



    const [value, setValue] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };


    const saveBalance = () => {
        const date = new Date()
        date.setDate(Number(value))
        date.setMonth(monthSelected)

        dispatch(AddBalance(Number(date)))
        dispatch(set_is_adding_balance())
        setValue('')
    }




    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 200
            },
        },
    };

    return (
        <Box sx={{ minWidth: 120, maxWidth: 250 }} >
            <Typography marginBottom={3}>Agregar nuevo balance</Typography>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Dia del mes</InputLabel>
                <Select
                    autoFocus
                    value={value}
                    label="Dia del mes"
                    onChange={handleChange}
                    MenuProps={MenuProps}
                >
                    {dates.map(date => (
                        <MenuItem key={date.getDate()} value={date.getDate()}>{date.getDate()}</MenuItem>
                    ))}

                </Select>
                <div style={{ width: '100%', marginTop: 10 }} >
                    <Button color="success" variant="contained" size="small" style={{ marginRight: 10 }} onClick={saveBalance} disabled={value === ''}>Agregar</Button>
                    <Button color="secondary" size="small" onClick={() => dispatch(set_is_adding_balance())}>Cancelar</Button>
                </div>
            </FormControl>
        </Box >
    )
}
