import { configureStore } from '@reduxjs/toolkit'
import uiSlice from './slices/uiSlice'
import financeSlice from './slices/financeSlice'


export const store = configureStore({
    reducer: {
        ui: uiSlice,
        finance: financeSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch