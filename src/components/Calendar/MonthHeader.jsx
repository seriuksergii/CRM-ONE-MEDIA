import React from 'react';
import styles from './Calendar.module.scss';

const MonthHeader = React.memo(
  ({
    month,
    isLeftMonth,
    leftMonth,
    rightMonth,
    onPrevYear,
    onPrevMonth,
    onNextMonth,
    onNextYear,
  }) => (
    <div className={styles.monthHeader}>
      <div className={styles.monthControls}>
        <button
          onClick={onPrevYear}
          aria-label="Previous year"
          className={styles.navButton}
        >
          <svg width="7" height="10">
            <use href="/sprite.svg#arrow-left-small" />
          </svg>
          <svg width="7" height="10">
            <use href="/sprite.svg#arrow-left-small" />
          </svg>
        </button>
        <button
          onClick={onPrevMonth}
          aria-label="Previous month"
          className={styles.navButton}
          disabled={
            !isLeftMonth && month.subtract(1, 'month').isSameOrBefore(leftMonth)
          }
        >
          <svg width="7" height="10">
            <use href="/sprite.svg#arrow-left-small" />
          </svg>
        </button>
      </div>
      <div className={styles.monthTitle}>{month.format('MMMM YYYY')}</div>
      <div className={styles.monthControls}>
        <button
          onClick={onNextMonth}
          aria-label="Next month"
          className={styles.navButton}
          disabled={
            isLeftMonth && month.add(1, 'month').isSameOrAfter(rightMonth)
          }
        >
          <svg width="7" height="10">
            <use href="/sprite.svg#arrow-right-small" />
          </svg>
        </button>
        <button
          onClick={onNextYear}
          aria-label="Next year"
          className={styles.navButton}
        >
          <svg width="7" height="10">
            <use href="/sprite.svg#arrow-right-small" />
          </svg>
          <svg width="7" height="10">
            <use href="/sprite.svg#arrow-right-small" />
          </svg>
        </button>
      </div>
    </div>
  )
);

export default MonthHeader;
