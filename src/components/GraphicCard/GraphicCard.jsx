import { useMemo, useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { HeadingXL, BodyBase, LabelSmall } from '../Typography/Headlines&Texts';
import './GraphicCard.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

const GraphicCard = ({ data, name, unit, interval }) => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);

  const { values, dates, totalAdSpend, percentageChange, isPositive } =
    useMemo(() => {
      const values = data.map((item) => item.value);
      const dates = data.map((item) => item.date);
      const totalAdSpend = values.reduce((acc, val) => acc + val, 0);
      const percentageChange = data.length
        ? ((values[values.length - 1] - values[0]) / values[0]) * 100
        : 0;

      return {
        values,
        dates,
        totalAdSpend,
        percentageChange: Number.isNaN(percentageChange) ? 0 : percentageChange,
        isPositive: percentageChange >= 0,
      };
    }, [data]);

  useEffect(() => {
    if (chartRef.current && containerRef.current) {
      const ctx = chartRef.current.ctx;
      const chartHeight = containerRef.current.clientHeight;

      const gradient = ctx.createLinearGradient(0, 0, 0, chartHeight);
      gradient.addColorStop(0.05, 'rgba(0, 102, 204, 0.3)');
      gradient.addColorStop(0.95, 'rgba(0, 102, 204, 0)');

      chartRef.current.config.data.datasets[0].backgroundColor = gradient;
      chartRef.current.update();
    }
  }, []);

  const chartData = useMemo(
    () => ({
      labels: dates,
      datasets: [
        {
          label: `${name} (${unit})`,
          data: values,
          borderColor: '#99C2EA',
          backgroundColor: 'rgba(0, 102, 204, 0.3)',
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          borderWidth: 2,
        },
      ],
    }),
    [dates, values, name, unit]
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      animation: { duration: 0 },
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        x: { display: false },
        y: { display: false },
      },
    }),
    []
  );

  if (!data?.length) return null;

  return (
    <div className="graphic-card" ref={containerRef}>
      <div className="header">
        <BodyBase className="subtitle">{name}</BodyBase>
        <HeadingXL className="total-value">
          {totalAdSpend.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          })}
        </HeadingXL>
        <LabelSmall
          className={`percentage ${isPositive ? 'positive' : 'negative'}`}
        >
          <img src={isPositive ? '/SVG-18.svg' : '/SVG-19.svg'} />
          <span>{Math.abs(percentageChange).toFixed(1)}%</span>
          <span className="vs-period">vs {interval}</span>
        </LabelSmall>
      </div>

      <div className="chart-container">
        <Line ref={chartRef} data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default GraphicCard;
