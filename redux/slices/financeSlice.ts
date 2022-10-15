import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Balance, Item } from '../../interfaces';


export interface BalanceState {
    balances: Balance[],
    items: Item[]
}

const initialState: BalanceState = {
    balances: [],
    items: []
}



export const financeSlice = createSlice({
    name: 'finance',
    initialState,
    reducers: {

        set_balances: (state, action: PayloadAction<Balance[]>) => {
            state.balances = action.payload
        },

        add_balance: (state, action: PayloadAction<Balance>) => {
            state.balances = [...state.balances, action.payload]
        },

        update_balance: (state, action: PayloadAction<Balance>) => {
            state.balances = state.balances.map(balance => balance._id === action.payload._id ? (balance = action.payload) : balance)
        },

        set_items: (state, action: PayloadAction<Item[]>) => {
            state.items = action.payload
        },

        add_item: (state, action: PayloadAction<Item>) => {
            state.items = [action.payload, ...state.items]
        },

    }

})

export const { add_balance, add_item, set_items, set_balances, update_balance } = financeSlice.actions
export default financeSlice.reducer