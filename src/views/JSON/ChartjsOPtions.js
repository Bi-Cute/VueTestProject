const options = {
    plugins: {
        title: {
            display: true,
            text: 'sample chart',
            color: '#191',
            font: {
                family: 'Times',
                size: 20,
                style: 'normal',
                lineHeight: 1.2,
            },
            padding: { top: 30, left: 0, right: 0, bottom: 0 },
        },
        legend: {
            display: true,
            position: 'top',
        },
    },
    scales: {
        x: {
            type: 'category',
            min: 5,
            max: 11,
        },
        y: {
            axis: 'y',
            display: true,
            type: 'linear',
            beginAtZero: true,
            ticks: {
                minRotation: 0,
                maxRotation: 50,
                mirror: false,
                textStrokeWidth: 0,
                textStrokeColor: '',
                padding: 3,
                display: true,
                autoSkip: true,
                autoSkipPadding: 3,
                labelOffset: 0,
                minor: {},
                major: {},
                align: 'center',
                crossAlign: 'near',
                showLabelBackdrop: false,
                backdropColor: 'rgba(255, 255, 255, 0.75)',
                backdropPadding: 2,
                color: '#666',
            },
            offset: false,
            reverse: false,
            bounds: 'ticks',
            grace: 0,
            grid: {
                circular: false, // 그리드 뒷배경 원형으로 할것인지
                display: true,
                lineWidth: 1,
                drawOnChartArea: true,
                drawTicks: true,
                tickLength: 8,
                offset: false,
                color: 'rgba(0,0,0,0.1)',
            },
            border: {
                display: true,
                dash: [],
                dashOffset: 0,
                width: 1,
                color: 'rgba(0,0,0,0.1)',
            },
            title: {
                display: false,
                text: '',
                padding: {
                    top: 4,
                    bottom: 4,
                },
                color: '#666',
            },
            id: 'y',
            position: 'left',
        },
    },
};

let options2 = {
    plugins: {
        title: { display: true, text: 'sample chart' },
        legend: { display: true, position: 'top' },
    },
    interaction: { intersect: true },
    scales: {
        y: {
            axis: 'y',
            display: true,
            type: 'linear',
            beginAtZero: true,
            ticks: {
                minRotation: 0,
                maxRotation: 50,
                mirror: false,
                textStrokeWidth: 0,
                textStrokeColor: '',
                padding: 3,
                display: true,
                autoSkip: true,
                autoSkipPadding: 3,
                labelOffset: 0,
                minor: {},
                major: {},
                align: 'center',
                crossAlign: 'near',
                showLabelBackdrop: false,
                backdropColor: 'rgba(255, 255, 255, 0.75)',
                backdropPadding: 2,
                color: '#666',
            },
            offset: false,
            reverse: false,
            bounds: 'ticks',
            grace: 0,
            grid: {
                circular: false,
                display: true,
                lineWidth: 1,
                drawOnChartArea: true,
                drawTicks: true,
                tickLength: 8,
                offset: false,
                color: 'rgba(0,0,0,0.1)',
                drawBorder: true,
                borderDash: [],
                borderDashOffset: 0,
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.1)',
            },
            border: {
                display: true,
                dash: [],
                dashOffset: 0,
                width: 1,
                color: 'rgba(0,0,0,0.1)',
            },
            title: {
                display: false,
                text: '',
                padding: { top: 4, bottom: 4 },
                color: '#666',
            },
            id: 'y',
            position: 'left',
        },
        x: {
            axis: 'x',
            type: 'category',
            offset: true,
            grid: {
                offset: true,
                display: true,
                lineWidth: 1,
                drawBorder: true,
                drawOnChartArea: true,
                drawTicks: true,
                tickLength: 8,
                borderDash: [],
                borderDashOffset: 0,
                borderWidth: 1,
                color: 'rgba(0,0,0,0.1)',
                borderColor: 'rgba(0,0,0,0.1)',
                circular: false,
            },
            ticks: {
                minRotation: 0,
                maxRotation: 50,
                mirror: false,
                textStrokeWidth: 0,
                textStrokeColor: '',
                padding: 3,
                display: true,
                autoSkip: true,
                autoSkipPadding: 3,
                labelOffset: 0,
                minor: {},
                major: {},
                align: 'center',
                crossAlign: 'near',
                showLabelBackdrop: false,
                backdropColor: 'rgba(255, 255, 255, 0.75)',
                backdropPadding: 2,
                color: '#666',
            },
            display: true,
            reverse: false,
            beginAtZero: false,
            bounds: 'ticks',
            grace: 0,
            title: {
                display: false,
                text: '',
                padding: { top: 4, bottom: 4 },
                color: '#666',
            },
            id: 'x',
            position: 'bottom',
        },
        r: {
            axis: 'r',
            type: 'radialLinear',
            angleLines: {
                display: false,
                lineWidth: 1,
                borderDash: [],
                borderDashOffset: 0,
                color: 'rgba(0,0,0,0.1)',
            },
            beginAtZero: true,
            grid: {
                circular: true,
                display: true,
                lineWidth: 1,
                drawBorder: true,
                drawOnChartArea: true,
                drawTicks: true,
                tickLength: 8,
                offset: false,
                borderDash: [],
                borderDashOffset: 0,
                borderWidth: 1,
                color: 'rgba(0,0,0,0.1)',
                borderColor: 'rgba(0,0,0,0.1)',
            },
            pointLabels: {
                display: false,
                backdropPadding: 2,
                font: { size: 10 },
                padding: 5,
                centerPointLabels: false,
                color: '#666',
            },
            startAngle: 0,
            display: true,
            animate: true,
            position: 'chartArea',
            ticks: {
                showLabelBackdrop: true,
                color: '#666',
                minRotation: 0,
                maxRotation: 50,
                mirror: false,
                textStrokeWidth: 0,
                textStrokeColor: '',
                padding: 3,
                display: true,
                autoSkip: true,
                autoSkipPadding: 3,
                labelOffset: 0,
                minor: {},
                major: {},
                align: 'center',
                crossAlign: 'near',
                backdropColor: 'rgba(255, 255, 255, 0.75)',
                backdropPadding: 2,
            },
            offset: false,
            reverse: false,
            bounds: 'ticks',
            grace: 0,
            title: {
                display: false,
                text: '',
                padding: { top: 4, bottom: 4 },
                color: '#666',
            },
            id: 'r',
        },
    },
};

var options3 = {
    type: 'bar',
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
    },
    scales: {
        x: {
            type: 'category',
            // min: 5,
            // max: 10,
            suggestedMin: 0,
            suggestedMax: 50,
            display: true,
            ticks: {
                minRotation: 0,
                maxRotation: 30,
                autoSkip: true,
                autoSkipPadding: 3,
            },
        },
        y: {
            axis: 'y',
            display: true,
            type: 'linear',
            beginAtZero: true,
            ticks: {
                minRotation: 0,
                maxRotation: 50,
                mirror: false,
                textStrokeWidth: 0,
                textStrokeColor: '',
                padding: 3,
                display: true,
                autoSkip: true,
                autoSkipPadding: 3,
                labelOffset: 0,
                minor: {},
                major: {},
                align: 'center',
                crossAlign: 'near',
                showLabelBackdrop: false,
                backdropColor: 'rgba(255, 255, 255, 0.75)',
                backdropPadding: 2,
                color: '#666',
            },
            offset: false,
            reverse: false,
            bounds: 'ticks',
            grace: 0,
            grid: {
                circular: false, // 그리드 뒷배경 원형으로 할것인지
                display: true,
                lineWidth: 1,
                drawOnChartArea: true,
                drawTicks: true,
                tickLength: 8,
                offset: false,
                color: 'rgba(0,0,0,0.1)',
            },
            border: {
                display: true,
                dash: [],
                dashOffset: 0,
                width: 1,
                color: 'rgba(0,0,0,0.1)',
            },
            title: {
                display: false,
                text: '',
                padding: {
                    top: 4,
                    bottom: 4,
                },
                color: '#666',
            },
            id: 'y',
            position: 'left',
        },
    },
};

let options4 = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: '',
        },
        legend: {
            display: true,
            position: 'top',
        },
    },
    interaction: {
        intersect: true,
    },
    scales: {
        y: {
            axis: 'y',
            display: true,
            type: 'linear',
            beginAtZero: true,
            ticks: {
                minRotation: 0,
                maxRotation: 50,
                mirror: false,
                textStrokeWidth: 0,
                textStrokeColor: '',
                padding: 3,
                display: true,
                autoSkip: true,
                autoSkipPadding: 3,
                labelOffset: 0,
                minor: {},
                major: {},
                align: 'center',
                crossAlign: 'near',
                showLabelBackdrop: false,
                backdropColor: 'rgba(255, 255, 255, 0.75)',
                backdropPadding: 2,
                color: '#666',
            },
            offset: false,
            reverse: false,
            bounds: 'ticks',
            grace: 0,
            grid: {
                circular: false, // 그리드 뒷배경 원형으로 할것인지
                display: true,
                lineWidth: 1,
                drawOnChartArea: true,
                drawTicks: true,
                tickLength: 8,
                offset: false,
                color: 'rgba(0,0,0,0.1)',
            },
            border: {
                display: true,
                dash: [],
                dashOffset: 0,
                width: 1,
                color: 'rgba(0,0,0,0.1)',
            },
            title: {
                display: false,
                text: '',
                padding: {
                    top: 4,
                    bottom: 4,
                },
                color: '#666',
            },
            id: 'y',
            position: 'left',
        },
    },
};

let options5 = {
    scales: {
        xAxes: [
            {
                type: 'category',
            },
        ],
        yAxes: [
            {
                type: 'linear',
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

// 그나마 멀쩡
let options6 = {
	responsive: true,
	plugins: {
		title: {
			display: true,
			text: '',
		},
		legend: {
			display: true,
			position: 'top',
		},
	},
	interaction: {
		intersect: true,
	},
	scales: {
		y: {
			axis: 'y',
			display: true,
			type: 'linear',
			beginAtZero: true,
			ticks: {
				minRotation: 0,
				maxRotation: 50,
				mirror: false,
				textStrokeWidth: 0,
				textStrokeColor: '',
				padding: 3,
				display: true,
				autoSkip: true,
				autoSkipPadding: 3,
				labelOffset: 0,
				minor: {},
				major: {},
				align: 'center',
				crossAlign: 'near',
				showLabelBackdrop: false,
				backdropColor: 'rgba(255, 255, 255, 0.75)',
				backdropPadding: 2,
				color: '#666',
			},
			offset: false,
			reverse: false,
			bounds: 'ticks',
			grace: 0,
			grid: {
				circular: false, // 그리드 뒷배경 원형으로 할것인지
				display: true,
				lineWidth: 1,
				drawOnChartArea: true,
				drawTicks: true,
				tickLength: 8,
				offset: false,
				color: 'rgba(0,0,0,0.1)',
			},
			border: {
				display: true,
				dash: [],
				dashOffset: 0,
				width: 1,
				color: 'rgba(0,0,0,0.1)',
			},
			title: {
				display: false,
				text: '',
				padding: {
					top: 4,
					bottom: 4,
				},
				color: '#666',
			},
			id: 'y',
			position: 'left',
		},
	},
};