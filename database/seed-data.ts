export const seedData = {
    items: [
        {
            concept: 'Arriendo',
            value: 400000,
            category: 'Hogar',
            type: 'expense',
            createdAt: Date.now(),
        },
        {
            concept: 'Cuota Moto',
            value: 320000,
            category: 'Vehiculo',
            type: 'expense',
            createdAt: Date.now(),
        },
        {
            concept: 'Colombo',
            value: 140000,
            category: 'Educacion',
            type: 'expense',
            createdAt: Date.now(),
        },
        {
            concept: 'Colegio',
            value: 630000,
            category: 'Trabajo',
            type: 'income',
            createdAt: Date.now(),
        },
        {
            concept: 'Reho',
            value: 500000,
            category: 'Trabajo',
            type: 'income',
            createdAt: Date.now(),
        }
    ],

    balances: [
        {
            date: Date.now(),
            createdAt: Date.now(),
            items: []
        },
        {
            date: Date.now() + 1000000000,
            createdAt: Date.now(),
            items: []
        }
    ]
}