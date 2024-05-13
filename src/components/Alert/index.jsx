import React from "react";
import { PrimaryButton } from "../Buttons";

function Alert({ message, onClose, textColor }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-4 rounded-lg text-center">
        <p className={textColor}>{message}</p>
        <div className="mt-3">
          <PrimaryButton
            label="Close"
            onClick={onClose}
            stylingCss="primaryButton"
          />
        </div>
      </div>
    </div>
  );
}

export default Alert;
