import React, { useState, useEffect } from 'react';
import 'react-day-picker/dist/style.css';
import './ui_for_operating_css.css';

import { DayMouseEventHandler, DayPicker } from 'react-day-picker';
import { format, isSameDay } from 'date-fns';

export default function App() {
  const today = new Date();
  const formattedToday = format(today, 'MMMM dd, yyyy');
  const initialFooter = <p>Today is {formattedToday}.</p>;
  const [footer, setFooter] = useState(initialFooter);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (selectedDate && !isSameDay(selectedDate, today)) {
      const timer = setTimeout(() => {
        setSelectedDate(undefined);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedDate, today]);

  const handleDayClick: DayMouseEventHandler = (day, modifiers) => {
    const formattedDate = format(day, 'MMMM dd, yyyy');
    setSelectedDate(day);
    if (isSameDay(day, today)) {
      setFooter(<p>Today is {formattedDate}.</p>);
    } else {
      setFooter(<p> {formattedDate}.</p>);
    }
  };

  const modifiers = {
    today: (day: Date) => isSameDay(day, today),
    selected: (day: Date) => selectedDate && isSameDay(day, selectedDate),
  };

  const modifiersStyles = {
    today: {
      animation: 'breathe 2s infinite',
      backgroundColor: 'rgba(255, 215, 0, 1)', // 修改呼吸灯颜色为 #8DC21F
      borderRadius: '50%',
    },
    selected: {
      backgroundColor: '#8e44ad',
      color: 'white',
      borderRadius: '50%',
    },
  };

  return (
    <DayPicker
      onDayClick={handleDayClick}
      footer={footer}
      modifiers={modifiers}
      modifiersStyles={modifiersStyles}
    />
  );
}