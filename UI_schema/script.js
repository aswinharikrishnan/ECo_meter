document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initRealTimeUpdates();
    initCharts();
    initResponsiveElements();
    updateDate();
    setInterval(updateLeaderboard, 10000);
});

// Initialize real-time data updates
function initRealTimeUpdates() {
    function fetchRealTimeData() {
        return {
            currentPower: (3.8 + Math.random() * 1.5).toFixed(1),
            todayConsumption: (7.0 + Math.random() * 3).toFixed(1),
            powerChange: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 5).toFixed(1),
            estimatedCost: 'INR ' + (4000 + Math.random() * 1000).toFixed(2),
            carbonSaved: (100 + Math.random() * 50).toFixed(0),
            carbonChange: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 15).toFixed(0)
        };
    }

    function updateDisplay(data) {
        document.getElementById('current-power').innerHTML = `${data.currentPower} <span>kW</span>`;
        document.getElementById('today-consumption').innerHTML = `${data.todayConsumption} <span>kWh</span>`;
        document.getElementById('estimated-cost').textContent = data.estimatedCost;
        document.getElementById('carbon-saved').innerHTML = `${data.carbonSaved} <span>kg</span>`;
        
        // Update change indicators
        const powerChangeElement = document.getElementById('power-change');
        const carbonChangeElement = document.getElementById('carbon-change');
        
        powerChangeElement.innerHTML = `<p>${data.powerChange}%</p>`;
        carbonChangeElement.textContent = `${data.carbonChange}%`;
        
        // Update colors based on change
        updateChangeColor(powerChangeElement, data.powerChange);
        updateChangeColor(carbonChangeElement, data.carbonChange);
    }

    function updateChangeColor(element, value) {
        element.classList.remove('positive', 'negative');
        if (value.startsWith('+')) {
            element.classList.add('positive');
        } else if (value.startsWith('-')) {
            element.classList.add('negative');
        }
    }

    // Initial update
    updateDisplay(fetchRealTimeData());
    
    // Set up periodic updates (every 5 seconds)
    setInterval(() => {
        updateDisplay(fetchRealTimeData());
    }, 5000);
}

// Initialize all charts
function initCharts() {
    // Consumption Line Chart
    const consumptionCtx = document.getElementById('consumptionChart').getContext('2d');
    const consumptionChart = new Chart(consumptionCtx, {
        type: 'line',
        data: getChartData('24h'),
        options: getChartOptions('Power (kW)', 'kW', 15) // Increased max to 15kW for more realistic values
    });

    // Window resize event handler for charts
    window.addEventListener('resize', function() {
        consumptionChart.resize();
    });

    // Chart range selector functionality
    document.querySelectorAll('[data-chart-range]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const range = this.getAttribute('data-chart-range');
            consumptionChart.data = getChartData(range);
            consumptionChart.update();
            
            // Update active state of buttons
            document.querySelectorAll('[data-chart-range]').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

// Get appropriate chart data based on time range
function getChartData(range) {
    let labels, data;
    
    switch(range) {
        case '7d':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            data = Array.from({length: 7}, () => 5 + Math.random() * 10); // More realistic range (5-15kW)
            break;
        case '30d':
            labels = Array.from({length: 30}, (_, i) => (i + 1).toString());
            data = Array.from({length: 30}, () => 5 + Math.random() * 10);
            break;
        case '24h':
        default:
            labels = Array.from({length: 24}, (_, i) => `${i}:00`);
            data = Array.from({length: 24}, () => 5 + Math.random() * 10);
    }
    
    return {
        labels: labels,
        datasets: [{
            label: 'Power (kW)',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            tension: 0.1,
            fill: true
        }]
    };
}

// Get chart options based on type
function getChartOptions(label, unit, maxValue) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: false,
                min: 0,
                max: maxValue,
                ticks: {
                    callback: function(value) {
                        return value + ' ' + unit;
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.parsed.y.toFixed(2) + ' ' + unit;
                    }
                }
            }
        }
    };
}

function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    document.querySelector('.date').textContent = today.toLocaleDateString('en-US', options);
}

function updateLeaderboard() {
    const names = [
        "Michael Brown", "Christopher Wilson", "Olivia Martin", 
        "Alice Johnson", "Emily Davis", "Sophia Anderson",
        "James Miller", "Robert Taylor", "Jennifer Thomas",
        "Daniel White", "Sarah Clark", "David Hall"
    ];
    
    // Shuffle array and pick first 6
    const shuffled = names.sort(() => 0.5 - Math.random());
    const leaderboard = shuffled.slice(0, 6);
    
    // Update DOM
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = leaderboard.map(name => `<li>${name}</li>`).join('');
}

// Handle responsive elements
function initResponsiveElements() {
    // Adjust card layout for mobile
    function adjustCardLayout() {
        const cards = document.querySelectorAll('.card');
        
        if (window.innerWidth < 768) {
            cards.forEach(card => {
                card.style.marginBottom = '1rem';
            });
        } else {
            cards.forEach(card => {
                card.style.marginBottom = '';
            });
        }
    }
    
    // Initial adjustment
    adjustCardLayout();
    
    // Adjust on resize
    window.addEventListener('resize', adjustCardLayout);
}