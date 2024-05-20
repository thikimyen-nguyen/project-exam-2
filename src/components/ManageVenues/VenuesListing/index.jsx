import React, { useEffect, useState } from "react";
import { ExtraButton, PrimaryButton } from "../../Buttons";
import { UpdateVenueForm } from "../../UpdateVenueForm";
import { DeleteVenueForm } from "../../DeleteVenueForm";
import ShowBookingsDetail from "../../ShowVenueBookings";
import { allVenuesUrl } from "../../../api";

function VenuesListingCard({ venue }) {
  const [isImageURL, setIsImageURL] = useState(false);
  const [isUpdateVenueFormOpen, setIsUpdateVenueFormOpen] = useState(false);
  const [isDeleteVenueFormOpen, setIsDeleteVenueFormOpen] = useState(false);
  const [isShowBookingsOpen, setIsShowBookingsOpen] = useState(false);
  const [venueBookings, setVenueBookings] = useState([]);

  const handleOpenUpdateVenueForm = () => {
    setIsUpdateVenueFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsUpdateVenueFormOpen(false);
    setIsDeleteVenueFormOpen(false);
  };
  const handleOpenDeleteVenueForm = () => {
    setIsDeleteVenueFormOpen(true);
  };

  const handleShowBookings = () => {
    setIsShowBookingsOpen(true);
    const fetchBookings = async (id) => {
      try {
        const singleVenueUrl = `${allVenuesUrl}/${id}?_bookings=true&_owner=true`;
        const response = await fetch(singleVenueUrl);
        const json = await response.json();
        setVenueBookings(json.data.bookings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings(venue?.id);
  };
  const handleHideBookings = () => {
    setIsShowBookingsOpen(false);
  };

  useEffect(() => {
    if (venue && venue.media) {
      let validImageURL = null;

      for (const mediaItem of venue.media) {
        if (mediaItem?.url) {
          validImageURL = mediaItem.url;
          break;
        }
      }

      setIsImageURL(validImageURL);
    }
  }, [venue]);

  return (
    <div
      key={venue?.id}
      //   to={`/${id}`}
      className="w-full my-5 bg-white border border-darkGreen"
    >
      <div
        id={venue?.id}
        className="p-3 group flex flex-grow  overflow-hidden  "
      >
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
              {venue?.location?.address}, {venue?.location?.city},{" "}
              {venue?.location?.country}, {venue?.location?.zip}{" "}
              {venue?.location?.continent}
            </span>{" "}
          </p>
          <p>
            Price: <span className="font-bold">NOK {venue?.price}</span>
          </p>
          <p>
            Max Guests:{" "}
            <span className="font-bold">{venue?.maxGuests}</span>
          </p>
          <p>
            Breakfast:{" "}
            {venue?.meta?.breakfast ? (
              <span className="font-bold">Yes</span>
            ) : (
              <span className="font-bold text-red">No</span>
            )}
          </p>
          <p>
            Wifi:{" "}
            {venue?.meta?.wifi ? (
              <span className="font-bold">Yes</span>
            ) : (
              <span className="font-bold text-red">No</span>
            )}
          </p>
          <p>
            Parking:{" "}
            {venue?.meta?.parking ? (
              <span className="font-bold">Yes</span>
            ) : (
              <span className="font-bold text-red">No</span>
            )}
          </p>
          <p>
            Pets:{" "}
            {venue?.meta?.pets ? (
              <span className="font-bold">Yes</span>
            ) : (
              <span className="font-bold text-red">No</span>
            )}
          </p>
        </div>
      </div>
      <div className="text-center mb-5">
        <PrimaryButton
          label="Delete"
          stylingCss="secondaryButton"
          onClick={handleOpenDeleteVenueForm}
        />
        <PrimaryButton
          label="Update"
          stylingCss="primaryButton"
          onClick={handleOpenUpdateVenueForm}
        />
      </div>
      {!isShowBookingsOpen && (
        <div className="m-1">
          <ExtraButton label="Show Bookings" onClick={handleShowBookings} />
        </div>
      )}

      {isUpdateVenueFormOpen && (
        <div className="fixed inset-0 z-50 items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full md:w-3/4 xl:w-1/2 m-auto">
            <UpdateVenueForm onClose={handleCloseForm} venue={venue} />
          </div>
        </div>
      )}
      {isDeleteVenueFormOpen && (
        <div className="fixed inset-0 z-50 items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full md:w-3/4 xl:w-1/2 m-auto">
            <DeleteVenueForm onClose={handleCloseForm} venue={venue} />
          </div>
        </div>
      )}
      {isShowBookingsOpen && (
        <div>
          <div className="m-1">
            <ExtraButton label="Hide Bookings" onClick={handleHideBookings} />
          </div>
          <div className="my-5 mx-auto lg:w-3/4">
            <table class="table-auto my-5 min-w-full divide-y divide-primary">
              <thead className="bg-lightGreen">
                <tr>
                  <th className="px-2 py-2 uppercase font-normal ">Customer</th>
                  <th className="px-2 py-2 uppercase font-normal ">Guests</th>
                  <th className="px-5 py-2 uppercase font-normal ">From</th>
                  <th className="px-5 py-2 uppercase font-normal ">To</th>
                </tr>
              </thead>
              <tbody className="text-center divide-y divide-primary dark:divide-lightGreen">
                {venueBookings?.map((booking) => (
                  <ShowBookingsDetail
                    customerName={booking?.customer?.name}
                    dateFrom={booking?.dateFrom}
                    dateTo={booking?.dateTo}
                    guests={booking?.guests}
                  />
                ))}
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default VenuesListingCard;
