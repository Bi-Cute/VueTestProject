// 프리뷰 차트 인풋 3개 
const OBJ = [ { "col": "bd2", "A": "0", "B": "2", "C": "0" }, { "col": "ZENN", "A": "1", "B": "3", "C": "1" } ]

// 변환
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
    console.log('🚀 ~  ~ transformedData3', transformedData3);
}


//결과
{
    "labels": ["bd2", "ZENN"],
    "datasets": [
        {
            "data": ["0", "1"],
            "label": "A",
            "total": 1
        },
        {
            "data": ["2", "3"],
            "label": "B",
            "total": 5
        },
        {
            "data": ["0", "1"],
            "label": "C",
            "total": 1
        },
    ]
}
