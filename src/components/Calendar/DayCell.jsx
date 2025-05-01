import React from 'react';
import styles from './Calendar.module.scss';

const DayCell = React.memo(
  ({ day, month, isToday, isStart, isEnd, inRange, onSelect }) => {
    const isInMonth = day.month() === month.month();

    return (
      <div
        onClick={() => onSelect(day)}
        className={[
          styles.dayCell,
          isToday && styles.today,
          !isInMonth && styles.outMonth,
          isStart && styles.rangeStart,
          isEnd && styles.rangeEnd,
          inRange && styles.inRange,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {day.date()}
      </div>
    );
  }
);

export default DayCell;
