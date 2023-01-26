// 2개의 데이터가 들어갔을때
// ex)열=작업자(이름), 값=체크 상자(개수)
const OBJ2 = [
    { "col": "MIKU", "val": "2" },
    { "col": "ZENN", "val": "5" }
]





if (this.columnLabel && this.valueLabel && !this.rowLabel) {
    const transformedData2 = {
        labels: this.customCharts.data.map(item => item.col),
        datasets: [
            {
                data: this.customCharts.data.map(item => item.val),
                label: 'value',
                total: this.customCharts.data.reduce(
                    (total, item) => total + parseInt(item.val),
                    0,
                ),
            },
        ],
    };
    this.customStatistics = transformedData2;
}


// 차트로 변환 결ㅏ
{
    "labels": [ "MIKU", "ZENN" ],
    "datasets": [
        { "data": [ "2", "5" ],
        "label": "value", "total": 7 }
    ]
}


// 테이블로 변환 결과
[ 
    { "data": [ "10" ], "label": "DUCK", "total": 10 } 
]
