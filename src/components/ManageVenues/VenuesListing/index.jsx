import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../../Buttons";

function VenuesListingCard({
  venue: { id, name, price, media, location, rating, meta },
}) {
  const [isImageURL, setIsImageURL] = useState(false);

  useEffect(() => {
    let validImageURL = null;

    for (const mediaItem of media) {
      if (mediaItem.url) {
        validImageURL = mediaItem.url;
        break; // Stop iterating once a valid image URL is found
      }
    }

    setIsImageURL(validImageURL);
  }, [media]);

  return (
    <div
      key={id}
      //   to={`/${id}`}
      className="w-full my-5 bg-white border border-darkGreen"
    >
      <div
        id={id}
        className="p-3 group flex flex-grow  overflow-hidden  "
      >
        <div className="mr-3">
        {isImageURL && (
          <img
            src={isImageURL}
            alt={name}
            className="w-20 md:w-32 lg:w-48 xl:w-60 object-cover object-center  flex-shrink-0"
          />
        )}
        </div>
       

        <div>
          <p className=" text-darkGreen">
            Venue Name: <span className="font-bold"> {name}</span>
          </p>
          <p>
            Rating: <span className="font-bold"> {rating}/5</span>
          </p>
          <p>
            Address:{" "}
            <span className="font-bold">
              {location.address}, {location.city}, {location.country},{" "}
              {location.zip} {location.continent}
            </span>{" "}
          </p>
          <p>
            Price: <span className="font-bold">NOK {price}</span>
          </p>
          <p>
            Breakfast:{" "}
            {meta.breakfast ? (
              <span className="font-bold">Yes</span>
            ) : (
              <span className="font-bold text-red">No</span>
            )}
          </p>
          <p>
            Wifi:{" "}
            {meta.wifi ? (
              <span className="font-bold">Yes</span>
            ) : (
              <span className="font-bold text-red">No</span>
            )}
          </p>
          <p>
            Parking:{" "}
            {meta.parking ? (
              <span className="font-bold">Yes</span>
            ) : (
              <span className="font-bold text-red">No</span>
            )}
          </p>
          <p>
            Pets:{" "}
            {meta.pets ? (
              <span className="font-bold">Yes</span>
            ) : (
              <span className="font-bold text-red">No</span>
            )}
          </p>
        </div>
       
      </div>
      <div className="text-center mb-5">
          <PrimaryButton label="Delete" stylingCss="secondaryButton" />
          <PrimaryButton label="Update" stylingCss="primaryButton" />
        </div>
    </div>
  );
}

export default VenuesListingCard;
