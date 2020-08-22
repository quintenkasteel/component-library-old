import styled from 'styled-components';

const DayContainer = styled.div``;
const DayHeader = styled.div``;
const DayHeaderContainer = styled.div``;
const CalendarContainer = styled.div``;
const CalendarBody = styled.div`
  width: 100%;
  min-height: 270px;
`;
const DatePickerContainer = styled.div``;

const DatePickerInput = styled.input`
  position: relative;
  border: 1px solid #cacaca;
  border-radius: 5px;
  line-height: 25px;
  padding: 0.5rem;
  width: 100%;
  outline: none;
`;

const DateSelectorContainer = styled.div`
  float: left;
  position: absolute;
  left: 0;
  top: 40px;
  width: 300px;
  min-height: 350px;
  background: #fff;
  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  overflow: hidden;
  padding: 25px 30px;
`;
const DateSelectorHeader = styled.div``;
const DateArrow = styled.div``;
const CurrentDateContainer = styled.div``;
const CurrentYear = styled.div`
  float: left;
  width: 100%;
  font-size: 27px;
  color: #666;
  font-weight: 600;
  text-align: center;
`;
const CurrentMonth = styled.div`
  float: left;
  width: 100%;
  font-size: 13px;
  color: #666;
  font-weight: 200px;
  text-align: center;
`;

export {
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
};
