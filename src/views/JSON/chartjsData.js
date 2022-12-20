var ctx = document.getElementById('myChart').getContext('2d');

var chart = new Chart(ctx, {
    type: 'bar', // Specify the chart type
    data: {
        // Specify the chart data
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Sales',
                data: [12, 19, 3, 5, 2],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    },
    options: {
        // Customize various aspects of the chart
        title: {
            display: true,
            text: 'Monthly Sales',
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    },
    responsive: true, // Enable responsive behavior
    maintainAspectRatio: false, // Disable aspect ratio preservation
    animation: {
        // Customize chart animations
        duration: 2000,
        easing: 'easeInOutQuad',
    },
    events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove', 'touchend'], // Specify which events to listen for
});
