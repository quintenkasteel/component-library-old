import React, { useState, useEffect, useRef, createRef } from 'react';
import './css.css';
import PropTypes from 'prop-types';

import {
  DayContainer,
  DayHeader,
  DayHeaderContainer,
  CalendarBody,
  CalendarContainer,
  DatePickerContainer,
  DatePickerInput,
  DateSelectorContainer,
  DateSelectorHeader,
  DateArrow,
  CurrentDateContainer,
  CurrentYear,
  CurrentMonth,
} from '../../../styles/DatePicker.js';

const getDateStringFromTimestamp = timestamp => {
  let dateObject = new Date(timestamp);
  let month = dateObject.getMonth() + 1;
  let date = dateObject.getDate();
  return (
    dateObject.getFullYear() +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (date < 10 ? '0' + date : date)
  );
};

const daysMap = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const monthMap = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getNumberOfDays = (year, month) => {
  return 40 - new Date(year, month, 40).getDate();
};

const getDayDetails = args => {
  const date = args.index - args.firstDay;
  const day = args.index % 7;
  const prevMonth = args.month < 0 ? 11 : args.month - 1;
  const prevYear = args.month < 0 ? args.year - 1 : args.year;

  const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
  const _date =
    (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
  const month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
  const timestamp = new Date(args.year, args.month, _date).getTime();

  return {
    date: _date,
    day,
    month,
    timestamp,
    dayString: daysMap[day],
  };
};

const getMonthDetails = (year, month) => {
  let firstDay = new Date(year, month).getDay();
  let numberOfDays = getNumberOfDays(year, month);
  let monthArray = [];
  let rows = 6;
  let currentDay = null;
  let index = 0;
  let cols = 7;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      currentDay = getDayDetails({
        index,
        numberOfDays,
        firstDay,
        year,
        month,
      });
      monthArray.push(currentDay);
      index++;
    }
  }
  return monthArray;
};

const date = new Date();
const oneDay = 60 * 60 * 24 * 1000;
const todayTimestamp =
  date.getTime() -
  (date.getTime() % oneDay) +
  date.getTimezoneOffset() * 1000 * 60;

const DatePicker = props => {
  const el = useRef(null);
  const inputRef = createRef();
  const [state, setState] = useState({
    todayTimestamp: todayTimestamp,
    year: date.getFullYear(),
    month: date.getMonth(),
    selectedDay: todayTimestamp,
    monthDetails: getMonthDetails(date.getFullYear(), date.getMonth()),
    open: false,
  });
  /** Maybe you could add this to initialState 🤷🏽‍♂️ */
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addBackDrop = e => {
    if (state.open && el && !el.current.contains(e.target)) {
      setState({ ...state, open: false });
    }
  };

  const setDateToInput = timestamp => {
    const dateString = getDateStringFromTimestamp(timestamp);
    inputRef.current.value = dateString;
  };

  useEffect(() => {
    /**
     * Only needed when using SSR ie Next.js
     * Uncomment if you're using SSR:
     * if (!process.browser) { return }
     */

    window.addEventListener('click', addBackDrop);
    setDateToInput(state.selectedDay);

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener('click', addBackDrop);
    };
  }, [state.open]);

  const isCurrentDay = day => day.timestamp === todayTimestamp;
  const isSelectedDay = day => day.timestamp === state.selectedDay;
  const getMonthStr = month =>
    monthMap[Math.max(Math.min(11, month), 0)] || 'Month';

  const onDateClick = day => {
    setState({ ...state, selectedDay: day.timestamp });
    setDateToInput(day.timestamp);

    /** Pass data to parent */
    props.onChange(day.timestamp);
  };

  const setYear = offset => {
    const year = state.year + offset;
    setState({
      ...state,
      year: year,
      monthDetails: getMonthDetails(year, state.month),
    });
  };

  const setMonth = offset => {
    const monthState = state.month + offset;
    const newmonthState =
      monthState === -1 ? 11 : monthState === 12 ? 0 : monthState;

    const newYearState =
      monthState === -1
        ? state.year - 1
        : monthState === 12
        ? state.year + 1
        : state.year;

    setState({
      ...state,
      year: newYearState,
      month: newmonthState,
      monthDetails: getMonthDetails(newYearState, newmonthState),
    });
  };

  const setDate = dateData => {
    const selectedDay = new Date(
      dateData.year,
      dateData.month - 1,
      dateData.date
    ).getTime();
    setState({ ...state, selectedDay: selectedDay });

    /** Pass data to parent */
    props.onChange(selectedDay);
  };

  const getDateFromDateString = dateValue => {
    const dateData = dateValue.split('-').map(d => parseInt(d, 10));

    if (dateData.length < 3) {
      return null;
    }

    const year = dateData[0];
    const month = dateData[1];
    const date = dateData[2];
    return { year, month, date };
  };

  const updateDateFromInput = () => {
    const dateValue = inputRef.current.value;
    const dateData = getDateFromDateString(dateValue);

    if (dateData !== null) {
      setDate(dateData);
      setState({
        ...state,
        year: dateData.year,
        month: dateData.month - 1,
        monthDetails: getMonthDetails(dateData.year, dateData.month - 1),
      });
    }
  };

  const daysMarkup = state.monthDetails.map((day, index) => (
    <DayContainer
      className={
        'c-day-container ' +
        (day.month !== 0 ? ' disabled' : '') +
        (isCurrentDay(day) ? ' highlight' : '') +
        (isSelectedDay(day) ? ' highlight-green' : '')
      }
      isCurrentDay={isCurrentDay(day)}
      isSelectedDay={isSelectedDay(day)}
      key={index}
      onClick={() => onDateClick(day)}>
      {day.date}
    </DayContainer>
  ));

  const calendarMarkup = (
    <CalendarContainer className="c-container">
      <DayHeaderContainer className="cc-head">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, i) => (
          <DayHeader key={i} className="cch-name">
            {day}
          </DayHeader>
        ))}
      </DayHeaderContainer>
      <CalendarBody className="cc-body">{daysMarkup}</CalendarBody>
    </CalendarContainer>
  );

  return (
    <DatePickerContainer ref={el}>
      <DatePickerInput
        onClick={() => setState({ ...state, open: true })}
        type="date"
        ref={inputRef}
        onChange={updateDateFromInput}
      />

      {state.open ? (
        <DateSelectorContainer className="mdp-container">
          <DateSelectorHeader className="mdpc-head">
            <DateArrow className="mdpchbi-left-arrows" onClick={() => setYear(-1)}>
              arrows left
            </DateArrow>
            <DateArrow className="mdpchbi-left-arrow" onClick={() => setMonth(-1)}>
              arrow left
            </DateArrow>
            <CurrentDateContainer className="mdpch-container">
              <CurrentYear className="mdpchc-year">{state.year}</CurrentYear>
              <CurrentMonth className="mdpchc-month">
                {getMonthStr(state.month)}
              </CurrentMonth>
            </CurrentDateContainer>
            <DateArrow onClick={() => setMonth(1)}>arrow right</DateArrow>
            <DateArrow className="mdpchbi-right-arrows" onClick={() => setYear(1)}>
              arrows right
            </DateArrow>
          </DateSelectorHeader>
          {calendarMarkup}
        </DateSelectorContainer>
      ) : null}
    </DatePickerContainer>
  );
};

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
};


export default DatePicker;
