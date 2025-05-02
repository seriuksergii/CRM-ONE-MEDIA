import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import { BodyBase } from '../Typography/Headlines&Texts';
import styles from './Metrics.module.scss';

const TIME_RANGE_OPTIONS = [
  { id: '7', label: 'Last 7 Days' },
  { id: '30', label: 'Last 30 Days' },
  { id: '90', label: 'Last 90 Days' },
];

const TimeRangeDropdown = ({ timeRange, setTimeRange }) => {
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

  const selectTimeRange = useCallback(
    (rangeId) => {
      setTimeRange(rangeId);
      setShowDropdown(false);
    },
    [setTimeRange]
  );

  const toggleDropdown = useCallback(() => {
    setShowDropdown((prev) => !prev);
  }, []);

  const selectedOption = TIME_RANGE_OPTIONS.find(
    (opt) => opt.id === timeRange
  )?.label;

  return (
    <div className={styles.timeRangeSelector} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={styles.metricsButton}
        aria-expanded={showDropdown}
      >
        <BodyBase style={{ color: '#09090B' }}>{selectedOption}</BodyBase>
        <svg width="16" height="16" className={styles.arrowIcon}>
          <use
            href={`/sprite.svg#${showDropdown ? 'chevron-up' : 'chevron-down'}`}
          />
        </svg>
      </button>

      {showDropdown && (
        <div className={styles.timeRangeDropdown}>
          {TIME_RANGE_OPTIONS.map((range) => {
            const isSelected = timeRange === range.id;
            return (
              <div
                key={range.id}
                onClick={() => selectTimeRange(range.id)}
                className={`${styles.metricItem} ${
                  isSelected ? styles.selected : ''
                }`}
              >
                <BodyBase component="span" className={styles.metricLabel}>
                  {range.label}
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
        </div>
      )}
    </div>
  );
};

export default memo(TimeRangeDropdown);
