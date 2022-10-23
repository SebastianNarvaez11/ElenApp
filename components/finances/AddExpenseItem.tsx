import { useFormik } from 'formik';

import { TextField, FormControl, Select, InputLabel, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from "@mui/material"
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { set_is_adding_expense } from '../../redux/slices/uiSlice';
import { Categories } from '../../json';
import { addItem } from '../../redux/actions/financesActions';

export const AddExpenseItem = () => {


  const { isAddingExpense } = useAppSelector(state => state.ui)
  const dispatch = useAppDispatch()


  const formik = useFormik({
    initialValues: {
      concept: '',
      value: 0,
      category: ''
    },

    onSubmit: values => {
      dispatch(addItem(values.concept, values.value, values.category, 'expense'))
      dispatch(set_is_adding_expense())
      formik.resetForm()
    },
  });

  return (
    <Dialog open={isAddingExpense} maxWidth='xs' onClose={() => dispatch(set_is_adding_expense())}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>+ Agregar Gasto</DialogTitle>
        <DialogContent>

          <Grid container>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Concepto"
                variant="standard"
                size="small"
                type='text'
                id='concept'
                name='concept'
                onChange={formik.handleChange}
                value={formik.values.concept} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Valor"
                variant="standard"
                size="small"
                type='number'
                id='value'
                name='value'
                onChange={formik.handleChange}
                value={formik.values.value} />
            </Grid>
            <Grid item xs={12} style={{ marginTop: 20 }}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Categoria</InputLabel>
                <Select
                  size="small"
                  id='category'
                  name='category'
                  onChange={formik.handleChange}
                  value={formik.values.category}
                >
                  {Categories.map(category => (
                    <MenuItem value={category} key={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button color="success" variant="contained" size="small" style={{ marginRight: 10 }} type='submit'>Agregar</Button>
          <Button color="secondary" size="small" onClick={() => dispatch(set_is_adding_expense())}>Cancelar</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
