import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DraggingType =
    | ''
    | 'expense'
    | 'income'


export interface UIState {
    isAddingBalance: boolean,
    isAddingExpense: boolean,
    isAddingIncome: boolean,
    isDragging: DraggingType,
    monthSelected: number
}

const initialState: UIState = {
    isAddingBalance: false,
    isAddingExpense: false,
    isAddingIncome: false,
    isDragging: '',
    monthSelected: new Date().getMonth()
}


export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {

        set_is_adding_balance: (state) => {
            state.isAddingBalance = !state.isAddingBalance
        },

        set_is_adding_expense: (state) => {
            state.isAddingExpense = !state.isAddingExpense
        },

        set_is_adding_income: (state) => {
            state.isAddingIncome = !state.isAddingIncome
        },

        set_is_dragging: (state, action: PayloadAction<DraggingType>) => {
            state.isDragging = action.payload
        },

        set_month_select: (state, action: PayloadAction<number>) => {
            state.monthSelected = action.payload
        }

    }
})


export const { set_is_adding_balance, set_is_adding_expense, set_is_adding_income, set_is_dragging, set_month_select } = uiSlice.actions
export default uiSlice.reducer

