import React from "react";

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
