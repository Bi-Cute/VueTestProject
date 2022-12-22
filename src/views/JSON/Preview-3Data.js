// 3개의 데이터가 들어갔을때
// ex)열=작업자(이름), 값=체크 상자(개수), 행=행의 종류에 있는 모든 값이 들어옴
const OBJ3 = [
    { "col": "MIKU", "A": "0", "B": "2", "C": "0" },
    { "col": "ZENN", "A": "1", "B": "3", "C": "1" }
]


//
if (this.columnLabel && this.valueLabel && this.rowLabel) {
    const transformedData3 = {
        labels: this.customCharts.data.map(item => item.col),
        datasets: Object.keys(this.customCharts.data[0])
            .filter(key => key !== 'col')
            .map(key => ({
                data: this.customCharts.data.map(item => item[key]),
                label: key,
                total: this.customCharts.data.reduce(
                    (acc, item) => acc + parseInt(item[key]),
                    0,
                ),
            })),
    };

    this.customStatistics = transformedData3;
    this.customDataTable = transformedData3;
}



let OBJ = {
    "labels": [ "MIKU", "ZENN" ],
    "datasets": [
        { "data": [ "0", "1" ], "label": "A", "total": 1 },
        { "data": [ "2", "3" ], "label": "B", "total": 5 },
        { "data": [ "0", "1" ], "label": "C", "total": 1 }
    ]
}
