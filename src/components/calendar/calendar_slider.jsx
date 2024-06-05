import React, { useState } from 'react';
import DailyCalendar1 from './daily_calendar1';
import DailyCalendar2 from './daily_calendar2';
import './calendar_slider.css';

const CalendarSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
  };

  return (
    <div className="calendar-slider">
      <div className="calendar-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        <DailyCalendar1 />
        <DailyCalendar2 />
      </div>
      <div className="slider-buttons">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default CalendarSlider;