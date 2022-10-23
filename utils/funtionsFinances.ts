import { IItem } from "../interfaces";

export const totalValueItems = (items: IItem[]) => {

    let total: number = 0
    items.map(item => total = total + item.value)
    return total
}

export const toMoney = (amount : number) => {
    return '$ ' + amount.toLocaleString('co')
};