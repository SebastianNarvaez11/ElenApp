import { AppDispatch } from './../store';
import { financeApi } from '../../apis';
import { IBalance, IDaily, IItem } from '../../interfaces';
import { add_balance, add_item, del_balance, del_item, set_balances, set_dailies, set_items, update_balance, update_daily } from '../slices/financeSlice';

export const fetchItems = () => (dispatch: AppDispatch) => {

    financeApi.get<IItem[]>('/items')
        .then(response => {
            dispatch(set_items(response.data))
        })
        .catch(error => {
            console.log(error);
        })

}

export const addItem = (concept: string, value: number, category: string, type: string) => (dispatch: AppDispatch) => {

    financeApi.post<IItem>('/items', { concept, value, category, type })
        .then(response => {
            dispatch(add_item(response.data))
        })
        .catch(error => {
            console.log(error);
        })
}


export const fetchBalances = () => (dispatch: AppDispatch) => {

    financeApi.get<IBalance[]>('/balances')
        .then(response => {
            dispatch(set_balances(response.data))
        })
        .catch(error => {
            console.log(error);
        })
}


export const AddBalance = (date: number) => (dispatch: AppDispatch) => {

    financeApi.post<IBalance>('/balances', { date })
        .then(response => {
            dispatch(add_balance(response.data))
        })
        .catch(error => {
            console.log(error);
        })
}


// esta funcion recibe: 
// 1. el id del balance ha actualizar
// 2. el listado actualizado de los items que ahora contien el balance
// 3. el id del item que se agrego al balance (opcional)
// 4. el id del item que se elimino del balance (opcional)

export const updateBalance = (id: string, items: IItem[], add_item_id?: string, del_item_id?: string) => (dispatch: AppDispatch) => {

    financeApi.put<IBalance>(`/balances/${id}`, { items, add_item_id, del_item_id })
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

    financeApi.delete<IBalance[]>(`/items/${id}`)
        .then(response => {
            dispatch(del_item(id))
            dispatch(set_balances(response.data))
        })
        .catch(error => {
            console.log(error);
        })
}


export const addDaily = (date: number) => (dispatch: AppDispatch) => {

    financeApi.post<IDaily>('/daily', { date })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
}


export const fetchDailies = () => (dispatch: AppDispatch) => {

    financeApi.get<IDaily[]>('/daily')
        .then(response => {
            dispatch(set_dailies(response.data))
        })
        .catch(error => {
            console.log(error);
        })
}


export const updateDaily = (id: string, items: IItem[]) => (dispatch: AppDispatch) => {

    financeApi.put<IDaily>(`/daily/${id}`, { items })
        .then(response => {
            dispatch(update_daily(response.data))
        })
        .catch(error => {
            console.log(error);
        })
}