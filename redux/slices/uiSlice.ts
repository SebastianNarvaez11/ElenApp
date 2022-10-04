import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
    hideSidebar: boolean
}


const initialState: UIState = {
    hideSidebar: false
}


export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {

        set_hide_sidebar: (state) => {
            state.hideSidebar = !state.hideSidebar
        }
    }
})


export const { set_hide_sidebar } = uiSlice.actions
export default uiSlice.reducer

