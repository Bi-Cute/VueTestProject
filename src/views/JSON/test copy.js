let chart = [
    { 3201: '0', 7002: '1', 8005: '1', col: 'bd2', G3800: '0', G8808: '0', G8157: '1' },
    { 3201: '1', 7002: '2', 8005: '3', col: 'DUCK', G3800: '1', G8808: '1', G8157: '1' },
];

let transData = {
    labels: ['bd2', 'DUCK'],
    datasets: [
        {
            data: ['0', '1'],
            label: '3201',
            total: 1,
        },
        {
            data: ['1', '2'],
            label: '7002',
            total: 3,
        },
        {
            data: ['1', '3'],
            label: '8005',
            total: 4,
        },
        {
            data: ['0', '1'],
            label: 'G3800',
            total: 1,
        },
        {
            data: ['0', '1'],
            label: 'G8808',
            total: 1,
        },
        {
            data: ['1', '1'],
            label: 'G8157',
            total: 2,
        },
    ],
};

let chartData = [
    { col0: 'fieldName', col1: 'bd2', col2: 'ZENN', total: 'total' },
    {
        columnName: '3201',
        col1: '0',
        col2: '1',
        total: '1',
    },
    {
        label: '7002',
        col1: '1',
        col2: '2',
        total: '3',
    },
    {
        label: '8005',
        col1: '1',
        col2: '3',
        total: '4',
    },
    {
        label: 'G3800',
        col1: '0',
        col2: '1',
        total: '1',
    },
    {
        label: 'G8808',
        col1: '0',
        col2: '1',
        total: '1',
    },
    {
        label: 'G8157',
        col1: '1',
        col2: '1',
        total: '2',
    },
];
