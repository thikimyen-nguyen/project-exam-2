import React from "react";

/**
 * Renders booking details in a table row.
 * @param {Object} props - Component props.
 * @param {string} props.customerName - The customer's name.
 * @param {string} props.dateFrom - The start date of the booking.
 * @param {string} props.dateTo - The end date of the booking.
 * @param {number} props.guests - The number of guests.
 * @returns {JSX.Element} The booking details row. 
 */
const ShowBookingsDetail = ({ customerName, dateFrom, dateTo, guests }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <tr>
      <td className="px-4 py-2 font-bold ">{customerName}</td>
      <td className="px-4 py-2">{guests}</td>
      <td className="px-4 py-2">{formatDate(dateFrom)}</td>
      <td className="px-4 py-2">{formatDate(dateTo)}</td>
    </tr>
  );
};

export default ShowBookingsDetail;
