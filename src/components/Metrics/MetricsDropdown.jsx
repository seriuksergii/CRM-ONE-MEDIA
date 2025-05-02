import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import { BodyBase } from '../Typography/Headlines&Texts';
import styles from './Metrics.module.scss';

const METRICS = [
  { id: 'spend', label: 'Spend', icon: 'circle-blue' },
  { id: 'impressions', label: 'Impressions', icon: 'circle-green' },
  { id: 'clicks', label: 'Clicks', icon: 'circle-orange' },
  { id: 'ctr', label: 'CTR', icon: 'circle-red' },
  { id: 'cpc', label: 'CPC', icon: 'circle-purple' },
];

const MAX_SELECTED = 2;

const MetricsDropdown = ({ selectedMetrics, setSelectedMetrics }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const toggleMetric = useCallback(
    (metricId) => {
      setSelectedMetrics((prev) => {
        if (prev.includes(metricId)) {
          return prev.filter((id) => id !== metricId);
        }
        return prev.length < MAX_SELECTED ? [...prev, metricId] : prev;
      });
    },
    [setSelectedMetrics]
  );

  const toggleDropdown = useCallback(() => {
    setShowDropdown((prev) => !prev);
  }, []);

  const selectedCount = selectedMetrics.length;
  const hintText =
    selectedCount === MAX_SELECTED
      ? 'Max 2 metrics selected'
      : `Select ${MAX_SELECTED - selectedCount} more`;

  return (
    <div className={styles.metricsSelector} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
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
          {METRICS.map((metric) => {
            const isSelected = selectedMetrics.includes(metric.id);
            return (
              <div
                key={metric.id}
                onClick={() => toggleMetric(metric.id)}
                className={`${styles.metricItem} ${
                  isSelected ? styles.selected : ''
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
                        isSelected ? 'circle-dot-blue' : 'circle-empty'
                      }`}
                    />
                  </svg>
                </span>
              </div>
            );
          })}
          <div className={styles.metricHint}>{hintText}</div>
        </div>
      )}
    </div>
  );
};

export default memo(MetricsDropdown);
