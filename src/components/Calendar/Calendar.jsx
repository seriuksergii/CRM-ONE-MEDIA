import React, { useState } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import styles from './Calendar.module.scss';
import Button from '../Button/Button';

dayjs.extend(weekday);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function CustomDateRangeCalendar() {
  const [range, setRange] = useState([null, null]);
  const [leftMonth, setLeftMonth] = useState(dayjs().startOf('month'));
  const [isOpen, setIsOpen] = useState(false);

  const today = dayjs();
  const rightMonth = leftMonth.add(1, 'month');

  const handleSelect = (date) => {
    const [start, end] = range;
    if (!start || (start && end)) {
      setRange([date, null]);
    } else if (date.isBefore(start)) {
      setRange([date, start]);
    } else {
      setRange([start, date]);
    }
  };

  const getDayClass = (date, month) => {
    const [start, end] = range;
    const isInMonth = date.month() === month.month();
    const isToday = date.isSame(today, 'day');
    const isStart = start && date.isSame(start, 'day');
    const isEnd = end && date.isSame(end, 'day');
    const inRange = start && end && date.isBetween(start, end, 'day');

    return [
      styles.dayCell,
      isToday && styles.today,
      !isInMonth && styles.outMonth,
      isStart && styles.rangeStart,
      isEnd && styles.rangeEnd,
      inRange && styles.inRange,
    ]
      .filter(Boolean)
      .join(' ');
  };

  const renderMonth = (month, isLeftMonth = true) => {
    const startDay = month.startOf('month').weekday(0);
    const days = Array.from({ length: 42 }, (_, i) => startDay.add(i, 'day'));

    return (
      <div className={styles.monthContainer}>
        <div className={styles.monthHeader}>
          {isLeftMonth ? (
            <div className={styles.monthControls}>
              <button
                onClick={() => setLeftMonth((prev) => prev.subtract(1, 'year'))}
                aria-label="Previous year"
                className={styles.navButton}
              >
                <svg width="7" height="10">
                  <use href="/public/sprite.svg#arrow-left-small" />
                </svg>
                <svg width="7" height="10">
                  <use href="/public/sprite.svg#arrow-left-small" />
                </svg>
              </button>
              <button
                onClick={() =>
                  setLeftMonth((prev) => prev.subtract(1, 'month'))
                }
                aria-label="Previous month"
                className={styles.navButton}
              >
                <svg width="7" height="10">
                  <use href="/public/sprite.svg#arrow-left-small" />
                </svg>
              </button>
            </div>
          ) : null}
          <div className={styles.monthTitle}>{month.format('MMMM YYYY')}</div>
          {!isLeftMonth ? (
            <div className={styles.monthControls}>
              <button
                onClick={() => setLeftMonth((prev) => prev.add(1, 'month'))}
                aria-label="Next month"
                className={styles.navButton}
              >
                <svg width="7" height="10">
                  <use href="/public/sprite.svg#arrow-right-small" />
                </svg>
              </button>
              <button
                onClick={() => setLeftMonth((prev) => prev.add(1, 'year'))}
                aria-label="Next year"
                className={styles.navButton}
              >
                <svg width="7" height="10">
                  <use href="/public/sprite.svg#arrow-right-small" />
                </svg>
                <svg width="7" height="10">
                  <use href="/public/sprite.svg#arrow-right-small" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
        <div className={styles.grid}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <div key={d} className={styles.dayName}>
              {d}
            </div>
          ))}
          {days.map((day) => (
            <div
              key={day.format('YYYY-MM-DD')}
              onClick={() => handleSelect(day)}
              className={getDayClass(day, month)}
            >
              {day.date()}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const toggleCalendar = () => setIsOpen((prev) => !prev);

  const formatRangeDate = () => {
    const [start, end] = range;

    if (!start && !end) {
      return today.format('MMM D, YYYY');
    }

    if (start && !end) {
      return start.format('MMM D, YYYY');
    }

    if (start && end) {
      if (start.year() === end.year() && start.month() === end.month()) {
        return `${start.format('MMM D')} - ${end.format('D, YYYY')}`;
      }
      return `${start.format('MMM D')} - ${end.format('MMM D, YYYY')}`;
    }

    return today.format('MMM D, YYYY');
  };

  return (
    <div className={styles.calendarContainer}>
      <button className={styles.toggleButton} onClick={toggleCalendar}>
        <svg width="16" height="17" className={styles.calendarIcon}>
          <use href="/public/sprite.svg#calendar" />
        </svg>
        <span className={styles.dateText}>{formatRangeDate()}</span>
        <svg width="16" height="16" className={styles.arrowIcon}>
          <use
            href={`/public/sprite.svg#${
              isOpen ? 'chevron-up' : 'chevron-down'
            }`}
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.calendarWrapper}>
          <div className={styles.controls}>
            <div style={{ display: 'flex', gap: '8px' }}></div>
          </div>
          <div className={styles.months}>
            {renderMonth(leftMonth, true)}
            {renderMonth(rightMonth, false)}
          </div>
          <div className={styles.footer}>
            <Button
              type="button"
              text="OK"
              className={styles.okButton}
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
