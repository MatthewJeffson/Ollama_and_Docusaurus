
import React from 'react';
import 'react-day-picker/dist/style.css';

import { DayClickEventHandler, DayPicker } from 'react-day-picker';

const bookedDays = [new Date(2024, 5, 11), new Date(2024, 5, 18)];
const bookedStyle = { border: '2px solid currentColor' };

export default function App() {
  const [booked, setBooked] = React.useState(false);

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    setBooked(day && modifiers.booked);
  };

  const footer = booked
    ? 'clicked'
    : 'test';

  return (
    <DayPicker
      defaultMonth={new Date(2024, 5, 21)}
      modifiers={{ booked: bookedDays }}
      modifiersStyles={{ booked: bookedStyle }}
      onDayClick={handleDayClick}
      footer={footer}
    />
  );
}
