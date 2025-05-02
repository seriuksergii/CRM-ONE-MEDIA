import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { Chart, registerables } from 'chart.js';
import CrosshairPlugin from 'chartjs-plugin-crosshair';
import styles from './Metrics.module.scss';

Chart.register(...registerables, CrosshairPlugin);

const METRIC_CONFIGS = {
  spend: {
    label: 'Spend ($)',
    borderColor: '#0066CC',
    gradientStart: 'rgba(0, 102, 204, 0.2)',
    gradientEnd: 'rgba(58, 150, 242, 0)',
    yAxisID: 'y',
    formatValue: (value) => value,
  },
  impressions: {
    label: 'Impressions',
    borderColor: '#16A34A',
    gradientStart: '#DFE8F2',
    gradientEnd: 'rgba(214, 249, 204, 0)',
    yAxisID: 'y',
    formatValue: (value) => value,
  },
  clicks: {
    label: 'Clicks',
    borderColor: '#F59F0A',
    gradientStart: '#FFF5E9',
    gradientEnd: 'rgba(255, 245, 233, 0)',
    yAxisID: 'y',
    formatValue: (value) => value,
  },
  ctr: {
    label: 'CTR (%)',
    borderColor: '#DC2626',
    gradientStart: 'rgba(239, 68, 68, 0.2)',
    gradientEnd: 'rgba(239, 68, 68, 0)',
    yAxisID: 'yPercentage',
    formatValue: (value) => `${Math.round(value * 100) / 100}%`,
  },
  cpc: {
    label: 'CPC ($)',
    borderColor: '#7C3AED',
    gradientStart: '#E8DFFD',
    gradientEnd: 'rgba(232, 223, 253, 0)',
    yAxisID: 'y',
    formatValue: (value) => value,
  },
};

const PerformanceChart = ({ selectedMetrics, timeRange }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const chartData = useMemo(() => {
    const days = parseInt(timeRange);
    const now = new Date();

    const labels = Array.from({ length: days }, (_, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (days - 1 - i));
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    });

    const ctx = chartRef.current?.getContext('2d');

    return {
      labels,
      datasets: selectedMetrics.map((metricId) => {
        const config = METRIC_CONFIGS[metricId];
        const gradient = ctx
          ? (() => {
              const g = ctx.createLinearGradient(0, 0, 0, 400);
              g.addColorStop(0.05, config.gradientStart);
              g.addColorStop(0.95, config.gradientEnd);
              return g;
            })()
          : config.gradientStart;

        return {
          label: config.label,
          data: Array.from({ length: days }, () =>
            metricId === 'ctr'
              ? Math.random() * 5
              : Math.floor(Math.random() * 450)
          ),
          borderColor: config.borderColor,
          backgroundColor: gradient,
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBorderWidth: 0,
          pointBackgroundColor: config.borderColor,
          pointHoverBackgroundColor: config.borderColor,
          yAxisID: config.yAxisID,
        };
      }),
    };
  }, [selectedMetrics, timeRange]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 450,
          ticks: { stepSize: 90, color: '#71717A' },
          grid: {
            color: '#F0F0F0',
            borderDash: [4, 4],
            lineWidth: 1,
            drawBorder: false,
            drawTicks: false,
          },
          position: 'left',
        },
        yPercentage: {
          beginAtZero: true,
          max: 5,
          ticks: {
            callback: (value) => `${value}%`,
            color: '#71717A',
            stepSize: 1.5,
          },
          grid: { display: false, drawBorder: false },
          position: 'right',
        },
        x: {
          grid: { display: false },
          ticks: { color: '#71717A' },
        },
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 16,
            boxHeight: 16,
            padding: 20,
            generateLabels: (chart) =>
              chart.data.datasets.map((dataset) => ({
                text: dataset.label,
                fillStyle: dataset.borderColor,
                strokeStyle: dataset.borderColor,
                fontColor: dataset.borderColor,
                usePointStyle: true,
                pointStyle: 'circle',
                boxWidth: 12,
              })),
            font: { size: 12 },
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: '#FCFCFD',
          bodyColor: '#09090B',
          titleColor: '#09090B',
          bodyFont: { size: 14, weight: '400' },
          titleFont: { size: 14 },
          padding: { top: 12, right: 16, bottom: 12, left: 16 },
          borderWidth: 1,
          borderColor: '#E4E4E7',
          cornerRadius: 4,
          usePointStyle: true,
          boxPadding: 6,
          callbacks: {
            label: (context) => {
              const config =
                METRIC_CONFIGS[selectedMetrics[context.datasetIndex]];
              return `${context.dataset.label}: ${config.formatValue(
                context.parsed.y
              )}`;
            },
            title: (context) => context[0].label,
          },
        },
        crosshair: {
          line: { color: '#71717A', width: 1 },
          zoom: { enabled: false },
        },
      },
      interaction: { mode: 'index', intersect: false },
      elements: { line: { tension: 0.4 } },
      layout: { padding: { top: 40, right: 10, bottom: 40, left: 10 } },
    }),
    [selectedMetrics]
  );

  const initChart = useCallback(() => {
    if (!chartRef.current || selectedMetrics.length === 0) return;

    const ctx = chartRef.current.getContext('2d');
    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });
  }, [chartData, chartOptions, selectedMetrics]);

  useEffect(() => {
    initChart();
    return () => chartInstance.current?.destroy();
  }, [initChart]);

  return (
    <div className={styles.chartContainer}>
      {selectedMetrics.length > 0 ? (
        <canvas ref={chartRef} />
      ) : (
        <div className={styles.emptyState}>
          Please select up to 2 metrics to display
        </div>
      )}
    </div>
  );
};

export default React.memo(PerformanceChart);
