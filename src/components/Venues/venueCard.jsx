import React from "react";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { Link } from "react-router-dom";
import Discount from "../DiscountNote";

function VenueCard({ product: { id, name, price, media, location, rating, meta } }) {
  return (
    <Link
      key={id}
      to={`/${id}`}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4 relative"
    >
      <div
        id={id}
        className="p-3 group flex flex-col rounded-lg overflow-hidden bg-white border-2 border-primary hover:shadow-md transition duration-300"
      >
        <img
          src={media[0].url}
          alt={name}
          className="w-full h-48 object-cover object-center group-hover:opacity-75"
        />
        <div className="flex justify-between content-center mt-3">
          <h2 className=" text-darkGreen">{name}</h2>
          <p className="bg-primary px-2 self-center rounded">{rating}/5</p>
        </div>
        <p>
          {location.city}, {location.country}
        </p>
        <div className="flex justify-end">
        {meta.breakfast && (
          <div className="text-sm bg-lightGreen self-center p-1 rounded">Breakfast          
          </div>
        )}
        <p className="m-2 text-xl font-medium text-end">Nok {price}</p>
        </div>
       
      </div>
    </Link>
  );
}

export default VenueCard;
