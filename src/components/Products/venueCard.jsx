import React from "react";
import { PrimaryButton } from "../Buttons";
import { Link } from "react-router-dom";
import Discount from "../DiscountNote";

function VenueCard({
  product: { id, name, price, media },
}) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4 relative">
      <div
        id={id}
        className="p-3 group flex flex-col rounded-lg overflow-hidden bg-white border-2 border-primary hover:shadow-md transition duration-300"
      >
        <img
          src={media[0].url}
          alt={name}
          className="w-full h-48 object-cover object-center group-hover:opacity-75"
        />
        <h2 className="mt-4 text-primary">{name}</h2>
        <div className="my-3 flex items-center">
          <p className="m-2 text-lg font-medium">Nok {price}</p>
         
        </div>

        <Link key={id} to={`/${id}`} className="text-center">
          <PrimaryButton label="View" />
        </Link>
      </div>
      {/* {price !== discountedPrice && (
        <div className="absolute top-0 right-0">
          <Discount price={price} discountedPrice={discountedPrice} />
        </div>
      )} */}
    </div>
  );
}

export default VenueCard;
