import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../../Buttons";
import { UpdateVenueForm } from "../../UpdateVenueForm";

function VenuesListingCard({
  venue
}) {
  const [isImageURL, setIsImageURL] = useState(false);
  const [isUpdateVenueFormOpen, setIsUpdateVenueFormOpen] = useState(false);
  const handleOpenUpdateVenueForm = () => {
    setIsUpdateVenueFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsUpdateVenueFormOpen(false);
  };
  useEffect(() => {
    let validImageURL = null;

    for (const mediaItem of venue?.media) {
      if (mediaItem.url) {
        validImageURL = mediaItem.url;
        break;
      }
    }

    setIsImageURL(validImageURL);
  }, [venue?.media]);

  return (
    <div
      key={venue?.id}
      //   to={`/${id}`}
      className="w-full my-5 bg-white border border-darkGreen"
    >
      <div id={venue?.id} className="p-3 group flex flex-grow  overflow-hidden  ">
        <div className="mr-3">
          {isImageURL && (
            <img
              src={isImageURL}
              alt={venue?.name}
              className="w-20 md:w-32 lg:w-48 xl:w-60 object-cover object-center  flex-shrink-0"
            />
          )}
        </div>

        <div>
          <p className=" text-darkGreen">
            Venue Name: <span className="font-bold"> {venue?.name}</span>
          </p>
          <p>
            Rating: <span className="font-bold"> {venue?.rating}/5</span>
          </p>
          <p>
            Address:{" "}
            <span className="font-bold">
              {venue.location.address}, {venue.location.city}, {venue.location.country},{" "}
              {venue.location.zip} {venue.location.continent}
            </span>{" "}
          </p>
          <p>
            Price: <span className="font-bold">NOK {venue.price}</span>
          </p>
          <p>
            Breakfast:{" "}
            {venue.meta.breakfast ? (
              <span className="font-bold">Yes</span>
            ) : (
              <span className="font-bold text-red">No</span>
            )}
          </p>
          <p>
            Wifi:{" "}
            {venue.meta.wifi ? (
              <span className="font-bold">Yes</span>
            ) : (
              <span className="font-bold text-red">No</span>
            )}
          </p>
          <p>
            Parking:{" "}
            {venue.meta.parking ? (
              <span className="font-bold">Yes</span>
            ) : (
              <span className="font-bold text-red">No</span>
            )}
          </p>
          <p>
            Pets:{" "}
            {venue.meta.pets ? (
              <span className="font-bold">Yes</span>
            ) : (
              <span className="font-bold text-red">No</span>
            )}
          </p>
        </div>
      </div>
      <div className="text-center mb-5">
        <PrimaryButton label="Delete" stylingCss="secondaryButton" />
        <PrimaryButton
          label="Update"
          stylingCss="primaryButton"
          onClick={handleOpenUpdateVenueForm}
        />
      </div>
      {isUpdateVenueFormOpen && (
        <div className="fixed inset-0 z-50 items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full md:w-3/4 xl:w-1/2 m-auto">
            <UpdateVenueForm onClose={handleCloseForm} venue={venue} />
          </div>
        </div>
      )}
    </div>
  );
}

export default VenuesListingCard;
