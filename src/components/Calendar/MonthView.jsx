import React, { useMemo, useCallback } from 'react';
import MonthHeader from './MonthHeader';
import DaysGrid from './DaysGrid';
import styles from './Calendar.module.scss';

const MonthView = React.memo(
  ({
    month,
    isLeftMonth,
    range,
    today,
    leftMonth,
    rightMonth,
    onLeftMonthChange,
    onRightMonthChange,
    onSelect,
  }) => {
    const startDay = useMemo(() => month.startOf('month').weekday(0), [month]);
    const days = useMemo(
      () => Array.from({ length: 42 }, (_, i) => startDay.add(i, 'day')),
      [startDay]
    );

    const handlePrevYear = useCallback(() => {
      const newMonth = month.subtract(1, 'year');
      isLeftMonth ? onLeftMonthChange(newMonth) : onRightMonthChange(newMonth);
    }, [month, isLeftMonth, onLeftMonthChange, onRightMonthChange]);

    const handlePrevMonth = useCallback(() => {
      const newMonth = month.subtract(1, 'month');
      if (isLeftMonth) {
        onLeftMonthChange(newMonth);
      } else if (newMonth.isAfter(leftMonth)) {
        onRightMonthChange(newMonth);
      }
    }, [month, isLeftMonth, leftMonth, onLeftMonthChange, onRightMonthChange]);

    const handleNextMonth = useCallback(() => {
      const newMonth = month.add(1, 'month');
      if (isLeftMonth) {
        if (newMonth.isBefore(rightMonth)) {
          onLeftMonthChange(newMonth);
        }
      } else {
        onRightMonthChange(newMonth);
      }
    }, [month, isLeftMonth, rightMonth, onLeftMonthChange, onRightMonthChange]);

    const handleNextYear = useCallback(() => {
      const newMonth = month.add(1, 'year');
      isLeftMonth ? onLeftMonthChange(newMonth) : onRightMonthChange(newMonth);
    }, [month, isLeftMonth, onLeftMonthChange, onRightMonthChange]);

    return (
      <div className={styles.monthContainer}>
        <MonthHeader
          month={month}
          isLeftMonth={isLeftMonth}
          leftMonth={leftMonth}
          rightMonth={rightMonth}
          onPrevYear={handlePrevYear}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onNextYear={handleNextYear}
        />
        <DaysGrid
          days={days}
          month={month}
          range={range}
          today={today}
          onSelect={onSelect}
        />
      </div>
    );
  }
);

export default MonthView;
