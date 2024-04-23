import React from "react";

function SuccessAlert({ message, onClose }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <p>{message}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
          Close
        </button>
      </div>
    </div>
  );
}

export default SuccessAlert;
