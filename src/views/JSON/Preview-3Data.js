// 3개의 데이터가 들어갔을때
// ex)열=작업자(이름), 값=체크 상자(개수), 행=행의 종류에 있는 모든 값이 들어옴
const OBJ3 = [
    { col: 'MIKU', A: '0', B: '2', C: '0' },
    { col: 'ZENN', A: '1', B: '3', C: '1' },
];

// 시트로 만들 경우
// 오브젝트의 개수 + 2(제목/합계)만큼 열이 생겨야한다.
// 열의 제목은 각각 필드 이름 / 각 오브젝트의 col, / 합계가 된다.
// 몇줄(행)이 될 것인지는 오브젝트에서 col의 값을 제외한 만큼이 된다.
// 각 행의 타이틀은 오브젝트에서 col을 제외한 각 name이 된다.

//
if (this.columnLabel && this.valueLabel && this.rowLabel) {
    const transformedData3 = {
        labels: this.customCharts.data.map(item => item.col),
        datasets: Object.keys(this.customCharts.data[0])
            .filter(key => key !== 'col')
            .map(key => ({
                data: this.customCharts.data.map(item => item[key]),
                label: key,
                total: this.customCharts.data.reduce((acc, item) => acc + parseInt(item[key]), 0),
            })),
    };

    this.customStatistics = transformedData3;
    this.customDataTable = transformedData3;
}

let OBJ = {
    labels: ['MIKU', 'ZENN'],
    datasets: [
        { data: ['0', '1'], label: 'A', total: 1 },
        { data: ['2', '3'], label: 'B', total: 5 },
        { data: ['0', '1'], label: 'C', total: 1 },
    ],
};

let OBJ2 = [
    {
        data: ['0', '1'],
        label: '3201',
        total: 1,
        backgroundColor: 'rgba(\n 116,\n 84,\n 190,\n 0.6)',
    },
    {
        data: ['1', '2'],
        label: '7002',
        total: 3,
        backgroundColor: 'rgba(\n 117,\n 139,\n 55,\n 0.6)',
    },
    {
        data: ['1', '3'],
        label: '8005',
        total: 4,
        backgroundColor: 'rgba(\n 203,\n 161,\n 82,\n 0.6)',
    },
    {
        data: ['0', '1'],
        label: 'G3800',
        total: 1,
        backgroundColor: 'rgba(\n 142,\n 101,\n 21,\n 0.6)',
    },
    {
        data: ['0', '1'],
        label: 'G8808',
        total: 1,
        backgroundColor: 'rgba(\n 253,\n 153,\n 24,\n 0.6)',
    },
    {
        data: ['1', '1'],
        label: 'G8157',
        total: 2,
        backgroundColor: 'rgba(\n 139,\n 96,\n 183,\n 0.6)',
    },
];
