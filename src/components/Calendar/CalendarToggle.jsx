import React from 'react';
import styles from './Calendar.module.scss';

const CalendarToggle = ({ isOpen, formatRangeDate, toggleCalendar }) => (
  <button className={styles.toggleButton} onClick={toggleCalendar}>
    <svg width="16" height="17" className={styles.calendarIcon}>
      <use href="/sprite.svg#calendar" />
    </svg>
    <span className={styles.dateText}>{formatRangeDate}</span>
    <svg width="16" height="16" className={styles.arrowIcon}>
      <use href={`/sprite.svg#${isOpen ? 'chevron-up' : 'chevron-down'}`} />
    </svg>
  </button>
);

export default React.memo(CalendarToggle);