import React, { useState } from 'react';
import MetricsDropdown from './MetricsDropdown';
import TimeRangeDropdown from './TimeRangeDropdown';
import PerformanceChart from './PerformanceChart';
import styles from './Metrics.module.scss';

const Metrics = () => {
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [timeRange, setTimeRange] = useState('7');

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <MetricsDropdown
          selectedMetrics={selectedMetrics}
          setSelectedMetrics={setSelectedMetrics}
        />
        <TimeRangeDropdown timeRange={timeRange} setTimeRange={setTimeRange} />
      </div>

      <PerformanceChart
        selectedMetrics={selectedMetrics}
        timeRange={timeRange}
      />
    </div>
  );
};

export default Metrics;
