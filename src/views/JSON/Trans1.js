// 소스
const customCharts.data = [ { "col": "DUCK", "text1": "1", "text2": "1", "text3": "0" }, { "col": "BONDU", "text1": "0", "text2": "0", "text3": "1" } ];

// 변환
const transformedData = {
    labels: Object.keys(this.customCharts.data[0]).filter(key => key !== 'col'),
    datasets: this.customCharts.data.map(item => {
        return {
            data: Object.values(item).filter(
                value => Object.keys(item).indexOf(value) !== 0,
            ),
            label: item.col,
            total: Object.values(item).reduce(
                (total, value) => total + parseInt(value),
                0,
            ),
        };
    }),
};

// 결과
{
    "labels": ["text1", "text2", "text3"],
    "datasets": [
        {
            "data": ["1", "1", "0"],
            "label": DUCK",
            "total": 2
        },
        {
            "data": ["0", "0", "1"],
            "backgroundColor": "#f57c00",
            "label": "BONDU",
            "total": 1
        },
    ]
}
