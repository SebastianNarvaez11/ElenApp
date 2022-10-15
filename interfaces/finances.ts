export interface Balance {
    _id: string,
    date : number,
    createdAt: number,
    items: Item[]
}

export interface Item {
    _id: string,
    concept: string,
    value: number,
    category: CategoryItem,
    type: TypeItem,
    createdAt: number,
}

export type CategoryItem =
    | 'Hogar'
    | 'Educacion'
    | 'Alimentacion'
    | 'Vehiculo'
    | 'Transporte'
    | 'Trabajo'
    | 'Recreacion'

export type TypeItem =
    | 'income'
    | 'expense'