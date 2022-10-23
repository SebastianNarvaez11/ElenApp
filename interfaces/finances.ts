export interface IBalance {
    _id: string,
    date : number,
    createdAt: number,
    items: IItem[]
}

export interface IItem {
    _id: string,
    concept: string,
    value: number,
    balances: IBalance[],
    category: ICategoryItem,
    type: ITypeItem,
    createdAt: number,
}

export type ICategoryItem =
    | 'Hogar'
    | 'Educacion'
    | 'Alimentacion'
    | 'Vehiculo'
    | 'Transporte'
    | 'Trabajo'
    | 'Recreacion'

export type ITypeItem =
    | 'income'
    | 'expense'