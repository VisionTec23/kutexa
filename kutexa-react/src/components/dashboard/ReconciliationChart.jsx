import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

function ReconciliationChart({ period }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const chartColors = {
    primary: '#14532D',
    accent: '#C8A951',
    light: '#F4F1EC',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444'
  };

  const generateChartData = (period) => {
    switch(period) {
      case '7':
        return {
          labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
          datasets: [{
            label: 'Reconciliações Concluídas',
            data: [18, 22, 24, 20, 26, 15, 12],
            borderColor: chartColors.primary,
            backgroundColor: chartColors.primary + '20',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }, {
            label: 'Reconciliações Pendentes',
            data: [3, 5, 2, 4, 1, 6, 8],
            borderColor: chartColors.accent,
            backgroundColor: chartColors.accent + '20',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }]
        };
      case '30':
        const monthlyLabels = Array.from({length: 30}, (_, i) => `Dia ${i + 1}`);
        const monthlyData = Array.from({length: 30}, () => Math.floor(Math.random() * 30) + 10);
        return {
          labels: monthlyLabels,
          datasets: [{
            label: 'Reconciliações Diárias',
            data: monthlyData,
            borderColor: chartColors.primary,
            backgroundColor: chartColors.primary + '20',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }]
        };
      case '90':
        return {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          datasets: [{
            label: 'Reconciliações Mensais',
            data: [450, 520, 480, 610, 580, 650, 720, 680, 750, 800, 780, 850],
            borderColor: chartColors.primary,
            backgroundColor: chartColors.primary + '20',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }]
        };
      default:
        return {
          labels: [],
          datasets: []
        };
    }
  };

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    
    if (!ctx) return;

    // Destruir gráfico anterior se existir
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const chartConfig = {
      type: 'line',
      data: generateChartData(period),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#333',
              font: {
                size: 12,
                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: chartColors.primary,
            bodyColor: '#333',
            borderColor: chartColors.light,
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              color: '#666'
            }
          },
          y: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              color: '#666'
            },
            beginAtZero: period === '7'
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        },
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear'
          }
        }
      }
    };

    chartInstance.current = new Chart(ctx, chartConfig);

    // Atualização automática dos dados (simulação)
    const interval = setInterval(() => {
      if (chartInstance.current) {
        const newData = chartInstance.current.data.datasets[0].data.map(value => {
          const variation = Math.random() * 4 - 2;
          return Math.max(0, Math.round(value + variation));
        });
        
        chartInstance.current.data.datasets[0].data = newData;
        chartInstance.current.update('none');
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [period]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef} id="reconciliationsChart"></canvas>
    </div>
  );
}

export default ReconciliationChart;