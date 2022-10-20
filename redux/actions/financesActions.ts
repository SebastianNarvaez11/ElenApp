import { AppDispatch } from './../store';
import { financeApi } from '../../apis';
import { Balance, Item } from '../../interfaces';
import { add_balance, add_item, del_balance, del_item, set_balances, set_items, update_balance } from '../slices/financeSlice';

export const fetchItems = () => (dispatch: AppDispatch) => {

    financeApi.get<Item[]>('/items')
        .then(response => {
            dispatch(set_items(response.data))
        })
        .catch(error => {
            console.log(error);
        })

}

export const addItem = (concept: string, value: number, category: string, type: string) => (dispatch: AppDispatch) => {

    financeApi.post<Item>('/items', { concept, value, category, type })
        .then(response => {
            dispatch(add_item(response.data))
        })
        .catch(error => {
            console.log(error);
        })
}


export const fetchBalances = () => (dispatch: AppDispatch) => {

    financeApi.get<Balance[]>('/balances')
        .then(response => {
            dispatch(set_balances(response.data))
        })
        .catch(error => {
            console.log(error);
        })
}


export const AddBalance = (date: number) => (dispatch: AppDispatch) => {

    financeApi.post<Balance>('/balances', { date })
        .then(response => {
            dispatch(add_balance(response.data))
        })
        .catch(error => {
            console.log(error);
        })
}



export const updateBalance = (id: string, items: Item[], add_item_id?: string, del_item_id?: string) => (dispatch: AppDispatch) => {

    financeApi.put<Balance>(`/balances/${id}`, { items, add_item_id, del_item_id })
        .then(response => {
            dispatch(update_balance(response.data))
        })
        .catch(error => {
            console.log(error);
        })
}



export const deleteBalance = (id: string) => (dispatch: AppDispatch) => {

    financeApi.delete(`/balances/${id}`)
        .then(response => {
            console.log(response.data);
            dispatch(del_balance(id))
        })
        .catch(error => {
            console.log(error);
        })
}


export const deleteItem = (id: string) => (dispatch: AppDispatch) => {

    financeApi.delete(`/items/${id}`)
        .then(response => {
            dispatch(del_item(id))
        })
        .catch(error => {
            console.log(error);
        })
}