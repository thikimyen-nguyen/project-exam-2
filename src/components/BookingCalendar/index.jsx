import React, { useState } from "react";

function VenueCalendar({ bookings, onDateSelect }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [clickedDate, setClickedDate] = useState(null);

  const getAvailableDates = () => {
    const bookedDates = bookings?.map((booking) => ({
      start: new Date(booking.dateFrom),
      end: new Date(booking.dateTo),
    }));

    const startDate = new Date(selectedYear, selectedMonth, 1);
    const endDate = new Date(selectedYear, selectedMonth + 1, 0);

    const availableDates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      availableDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    bookedDates.forEach((bookedDate) => {
      const startDate = new Date(bookedDate.start);
      const endDate = new Date(bookedDate.end);
      for (
        let date = new Date(startDate);
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        if (date.getTime() !== endDate.getTime()) {
          const index = availableDates.findIndex(
            (availableDate) => availableDate.getTime() === date.getTime()
          );
          if (index !== -1) {
            availableDates.splice(index, 1);
          }
        }
      }
    });

    return availableDates;
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleDateClick = (date) => {
    console.log("Clicked date:", date);
    setClickedDate(date);
    onDateSelect(date);
  };

  const renderCalendar = () => {
    const availableDates = getAvailableDates();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
    const lastDayOfMonth = new Date(selectedYear, selectedMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const calendarDays = [];

    // Add empty days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="p-2 bg-white"></div>
      );
    }

    // Add each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(selectedYear, selectedMonth, i);
      const isPastDate = currentDate < today;
      const isAvailable = availableDates.some(
        (availableDate) => availableDate.getTime() === currentDate.getTime()
      );
      const isBooked = bookings.some(
        (booking) =>
          currentDate >= new Date(booking.dateFrom) &&
          currentDate < new Date(booking.dateTo)
      );

      calendarDays.push(
        <div
          key={i}
          className={`p-2 text-center  ${
            isPastDate
              ? "text-lightGreen"
              : isBooked
              ? "bg-lightGreen line-through text-red cursor-not-allowed"
              : isAvailable
              ? "bg-darkGreen text-lightGreen cursor-pointer "
              : "bg-lightGreen"
          } ${
            clickedDate && clickedDate.getTime() === currentDate.getTime()
              ? "bg-red border rounded"
              : ""
          }`} // Apply focus class if clicked date matches current date
          onClick={
            isAvailable && !isBooked ? () => handleDateClick(currentDate) : null
          }
        >
          {i}
        </div>
      );
    }

    // Render the calendar
    return (
      <div className="calendar">
        <div className="flex justify-center mb-4">
          <div className="mr-2">
            <label htmlFor="month">Month:</label>
            <select
              id="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="ml-2 px-2 py-1 border rounded"
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <option key={index} value={index}>
                  {new Date(0, index).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="year">Year:</label>
            <select
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
              className="ml-2 px-2 py-1 border rounded"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <option key={index} value={new Date().getFullYear() + index}>
                  {new Date().getFullYear() + index}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 border-2 rounded border-primary p-3">
          <div className="col-span-1 p-2">Sun</div>
          <div className="col-span-1 p-2">Mon</div>
          <div className="col-span-1 p-2">Tue</div>
          <div className="col-span-1 p-2">Wed</div>
          <div className="col-span-1 p-2">Thu</div>
          <div className="col-span-1 p-2">Fri</div>
          <div className="col-span-1 p-2">Sat</div>
          {calendarDays}
        </div>
      </div>
    );
  };

  return (
    <div className="text-center my-4 md:w-1/2 m-auto">{renderCalendar()}</div>
  );
}

export default VenueCalendar;
