import React, { useState, useMemo, useCallback } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import styles from './Calendar.module.scss';
import Button from '../Button/Button';
import MonthView from './MonthView';
import CalendarToggle from './CalendarToggle';

dayjs.extend(weekday);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const Calendar = () => {
  const [range, setRange] = useState([null, null]);
  const [leftMonth, setLeftMonth] = useState(dayjs().startOf('month'));
  const [rightMonth, setRightMonth] = useState(dayjs().add(1, 'month').startOf('month'));
  const [isOpen, setIsOpen] = useState(false);

  const today = useMemo(() => dayjs(), []);

  const handleSelect = useCallback((date) => {
    setRange(prev => {
      const [start, end] = prev;
      if (!start || (start && end)) return [date, null];
      return date.isBefore(start) ? [date, start] : [start, date];
    });
  }, []);

  const handleLeftMonthChange = useCallback((newMonth) => {
    setLeftMonth(newMonth);
    if (newMonth.add(1, 'month').isAfter(rightMonth)) {
      setRightMonth(newMonth.add(1, 'month'));
    }
  }, [rightMonth]);

  const handleRightMonthChange = useCallback((newMonth) => {
    setRightMonth(newMonth);
    if (newMonth.subtract(1, 'month').isBefore(leftMonth)) {
      setLeftMonth(newMonth.subtract(1, 'month'));
    }
  }, [leftMonth]);

  const formatRangeDate = useMemo(() => {
    const [start, end] = range;
    if (!start && !end) return today.format('MMM D, YYYY');
    if (start && !end) return start.format('MMM D, YYYY');
    if (start && end) {
      if (start.year() !== end.year()) {
        return `${start.format('MMM D, YYYY')} - ${end.format('MMM D, YYYY')}`;
      }
      return start.month() === end.month()
        ? `${start.format('MMM D')} - ${end.format('D, YYYY')}`
        : `${start.format('MMM D')} - ${end.format('MMM D, YYYY')}`;
    }
    return today.format('MMM D, YYYY');
  }, [range, today]);

  const toggleCalendar = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <div className={styles.calendarContainer}>
      <CalendarToggle 
        isOpen={isOpen}
        formatRangeDate={formatRangeDate}
        toggleCalendar={toggleCalendar}
      />

      {isOpen && (
        <div className={styles.calendarWrapper}>
          <div className={styles.months}>
            <MonthView
              month={leftMonth}
              isLeftMonth={true}
              range={range}
              today={today}
              leftMonth={leftMonth}
              rightMonth={rightMonth}
              onLeftMonthChange={handleLeftMonthChange}
              onRightMonthChange={handleRightMonthChange}
              onSelect={handleSelect}
            />
            <MonthView
              month={rightMonth}
              isLeftMonth={false}
              range={range}
              today={today}
              leftMonth={leftMonth}
              rightMonth={rightMonth}
              onLeftMonthChange={handleLeftMonthChange}
              onRightMonthChange={handleRightMonthChange}
              onSelect={handleSelect}
            />
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
};

export default Calendar;