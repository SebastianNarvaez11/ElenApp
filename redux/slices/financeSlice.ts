import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBalance, IDaily, IItem } from '../../interfaces';


export interface BalanceState {
    balances: IBalance[],
    items: IItem[],
    dailies: IDaily[]
}

const initialState: BalanceState = {
    balances: [],
    items: [],
    dailies: []
}



export const financeSlice = createSlice({
    name: 'finance',
    initialState,
    reducers: {

        set_balances: (state, action: PayloadAction<IBalance[]>) => {
            state.balances = action.payload
        },

        add_balance: (state, action: PayloadAction<IBalance>) => {
            state.balances = [...state.balances, action.payload]
        },

        del_balance: (state, action: PayloadAction<string>) => {
            state.balances = state.balances.filter(balance => balance._id !== action.payload)
        },

        update_balance: (state, action: PayloadAction<IBalance>) => {
            state.balances = state.balances.map(balance => balance._id === action.payload._id ? (balance = action.payload) : balance)
        },

        set_items: (state, action: PayloadAction<IItem[]>) => {
            state.items = action.payload
        },

        add_item: (state, action: PayloadAction<IItem>) => {
            state.items = [action.payload, ...state.items]
        },

        del_item: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item._id !== action.payload)
        },

        set_dailies: (state, action: PayloadAction<IDaily[]>) => {
            state.dailies = action.payload
        },

        update_daily: (state, action: PayloadAction<IDaily>) => {
            state.dailies = state.dailies.map(daily => daily._id === action.payload._id ? (daily = action.payload) : daily)
        }
    }

})

export const { add_balance, add_item, set_items, set_balances, update_balance, del_balance, del_item, set_dailies, update_daily } = financeSlice.actions
export default financeSlice.reducer