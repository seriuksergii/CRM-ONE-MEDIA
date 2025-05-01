import React from 'react';
import DayCell from './DayCell';
import styles from './Calendar.module.scss';

const DaysGrid = React.memo(({ days, month, range, today, onSelect }) => (
  <div className={styles.grid}>
    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
      <div key={d} className={styles.dayName}>
        {d}
      </div>
    ))}
    {days.map((day) => {
      const isStart = range[0] && day.isSame(range[0], 'day');
      const isEnd = range[1] && day.isSame(range[1], 'day');
      const inRange =
        range[0] && range[1] && day.isBetween(range[0], range[1], 'day');

      return (
        <DayCell
          key={day.format('YYYY-MM-DD')}
          day={day}
          month={month}
          isToday={day.isSame(today, 'day')}
          isStart={isStart}
          isEnd={isEnd}
          inRange={inRange}
          onSelect={onSelect}
        />
      );
    })}
  </div>
));

export default DaysGrid;
