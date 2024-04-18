import React from "react";
import { PrimaryButton, SecondaryButton } from "../../Buttons";
import { Link } from "react-router-dom";
import Discount from "../../DiscountNote";

function VenueCard({
  product: { id, name, price, media, location, rating, meta },
}) {
  return (
    <Link
      key={id}
      to={`/${id}`}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4 relative flex"
    >
      <div
        id={id}
        className="p-3 group flex flex-col flex-grow rounded-lg overflow-hidden bg-white border-2 border-primary hover:shadow-md transition duration-300"
      >
        <img
          src={media[0].url}
          alt={name}
          className="w-full h-48 object-cover object-center group-hover:opacity-75 flex-shrink-0"
        />
        <div className="flex justify-between content-center mt-3">
          <h2 className=" text-darkGreen">{name}</h2>
          <p className="bg-primary px-2 self-center rounded">{rating}/5</p>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 100 100"
          >
            <path
              fill="#75BFAA"
              d="M50.001 0C33.65 0 20.25 13.36 20.25 29.666c0 6.318 2.018 12.19 5.433 17.016L46.37 82.445c2.897 3.785 4.823 3.066 7.232-.2l22.818-38.83c.46-.834.822-1.722 1.137-2.629a29.28 29.28 0 0 0 2.192-11.12C79.75 13.36 66.354 0 50.001 0m0 13.9c8.806 0 15.808 6.986 15.808 15.766c0 8.78-7.002 15.763-15.808 15.763c-8.805 0-15.81-6.982-15.81-15.763c0-8.78 7.005-15.765 15.81-15.765"
            />
            <path
              fill="#75BFAA"
              d="m68.913 48.908l-.048.126c.015-.038.027-.077.042-.115zM34.006 69.057C19.88 71.053 10 75.828 10 82.857C10 92.325 26.508 100 50 100s40-7.675 40-17.143c0-7.029-9.879-11.804-24.004-13.8l-1.957 3.332C74.685 73.866 82 76.97 82 80.572c0 5.05-14.327 9.143-32 9.143c-17.673 0-32-4.093-32-9.143c-.001-3.59 7.266-6.691 17.945-8.174c-.645-1.114-1.294-2.226-1.94-3.341"
              color="#75BFAA"
            />
          </svg>
          {location.city}, {location.country}
        </div>
        <div className="flex justify-end">
          {meta.breakfast && (
            <div className="text-sm bg-lightGreen self-center p-1 rounded flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#325249"
                  d="M18 3a1 1 0 0 1 .993.883L19 4v16a1 1 0 0 1-1.993.117L17 20v-5h-1a1 1 0 0 1-.993-.883L15 14V8c0-2.21 1.5-5 3-5m-6 0a1 1 0 0 1 .993.883L13 4v5a4 4 0 0 1-3 3.874V20a1 1 0 0 1-1.993.117L8 20v-7.126a4 4 0 0 1-2.995-3.668L5 9V4a1 1 0 0 1 1.993-.117L7 4v5a2 2 0 0 0 1 1.732V4a1 1 0 0 1 1.993-.117L10 4l.001 6.732a2 2 0 0 0 .992-1.563L11 9V4a1 1 0 0 1 1-1"
                />
              </svg>
              <p className="ml-1">Breakfast</p>
            </div>
          )}
          <p className="m-2 text-xl font-medium text-end">
            Nok {price.toFixed()}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VenueCard;
