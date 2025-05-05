import React, { useRef, useState } from 'react';
import { BodyBase } from '../Typography/Headlines&Texts';
import styles from './Metrics.module.scss';
import useOutsideClick from '../../hooks/useOutsideClick';

const availableMetrics = [
  { id: 'spend', label: 'Spend', icon: 'circle-blue' },
  { id: 'impressions', label: 'Impressions', icon: 'circle-green' },
  { id: 'clicks', label: 'Clicks', icon: 'circle-orange' },
  { id: 'ctr', label: 'CTR', icon: 'circle-red' },
  { id: 'cpc', label: 'CPC', icon: 'circle-purple' },
];

const MetricsDropdown = ({ selectedMetrics, setSelectedMetrics }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setShowDropdown(false));

  const toggleMetric = (metricId) => {
    if (selectedMetrics.includes(metricId)) {
      setSelectedMetrics(selectedMetrics.filter((id) => id !== metricId));
    } else if (selectedMetrics.length < 2) {
      setSelectedMetrics([...selectedMetrics, metricId]);
    }
  };

  return (
    <div className={styles.metricsSelector} ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={styles.metricsButton}
        aria-expanded={showDropdown}
      >
        <BodyBase style={{ color: '#09090B' }}>Metrics</BodyBase>
        <svg width="16" height="16" className={styles.arrowIcon}>
          <use
            href={`/sprite.svg#${showDropdown ? 'chevron-up' : 'chevron-down'}`}
          />
        </svg>
      </button>

      {showDropdown && (
        <div className={styles.metricsDropdown}>
          {availableMetrics.map((metric) => (
            <div
              key={metric.id}
              onClick={() => toggleMetric(metric.id)}
              className={`${styles.metricItem} ${
                selectedMetrics.includes(metric.id) ? styles.selected : ''
              }`}
            >
              <svg width="14" height="15" className={styles.metricIcon}>
                <use href={`/sprite.svg#${metric.icon}`} />
              </svg>
              <BodyBase component="span" className={styles.metricLabel}>
                {metric.label}
              </BodyBase>
              <span className={styles.metricDot}>
                <svg width="9" height="9" className={styles.metricDotSvg}>
                  <use
                    href={`/sprite.svg#${
                      selectedMetrics.includes(metric.id)
                        ? 'circle-dot-blue'
                        : 'circle-empty'
                    }`}
                  />
                </svg>
              </span>
            </div>
          ))}
          <div className={styles.metricHint}>
            {selectedMetrics.length === 2
              ? 'Max 2 metrics selected'
              : `Select ${2 - selectedMetrics.length} more`}
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricsDropdown;
