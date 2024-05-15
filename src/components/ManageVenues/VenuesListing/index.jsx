import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExtraButton, PrimaryButton, SecondaryButton } from "../../Buttons";
import { UpdateVenueForm } from "../../UpdateVenueForm";
import { DeleteVenueForm } from "../../DeleteVenueForm";
import useVenuesStore from "../../../store/venues";
import ShowBookingsDetail from "../../ShowVenueBookings";

function VenuesListingCard({ id }) {
  const [isImageURL, setIsImageURL] = useState(false);
  const [isUpdateVenueFormOpen, setIsUpdateVenueFormOpen] = useState(false);
  const [isDeleteVenueFormOpen, setIsDeleteVenueFormOpen] = useState(false);
  const { singleVenue, fetchVenueById, bookings } = useVenuesStore();
  const [isShowBookingsOpen, setIsShowBookingsOpen] = useState(false);

  useEffect(() => {
    fetchVenueById(id);
  }, [fetchVenueById, id]);
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
  };
  const handleHideBookings = () => {
    setIsShowBookingsOpen(false);
  };

  useEffect(() => {
    if (singleVenue && singleVenue.media) {
      let validImageURL = null;

      for (const mediaItem of singleVenue.media) {
        if (mediaItem?.url) {
          validImageURL = mediaItem.url;
          break;
        }
      }

      setIsImageURL(validImageURL);
    }
  }, [singleVenue]);

  return (
    <div
      key={singleVenue?.id}
      //   to={`/${id}`}
      className="w-full my-5 bg-white border border-darkGreen"
    >
      <div
        id={singleVenue?.id}
        className="p-3 group flex flex-grow  overflow-hidden  "
      >
        <div className="mr-3">
          {isImageURL && (
            <img
              src={isImageURL}
              alt={singleVenue?.name}
              className="w-20 md:w-32 lg:w-48 xl:w-60 object-cover object-center  flex-shrink-0"
            />
          )}
        </div>

        <div>
          <p className=" text-darkGreen">
            Venue Name: <span className="font-bold"> {singleVenue?.name}</span>
          </p>
          <p>
            Rating: <span className="font-bold"> {singleVenue?.rating}/5</span>
          </p>
          <p>
            Address:{" "}
            <span className="font-bold">
              {singleVenue?.location?.address}, {singleVenue?.location?.city},{" "}
              {singleVenue?.location?.country}, {singleVenue?.location?.zip}{" "}
              {singleVenue?.location?.continent}
            </span>{" "}
          </p>
          <p>
            Price: <span className="font-bold">NOK {singleVenue?.price}</span>
          </p>
          <p>
            Breakfast:{" "}
            {singleVenue?.meta?.breakfast ? (
              <span className="font-bold">Yes</span>
            ) : (
              <span className="font-bold text-red">No</span>
            )}
          </p>
          <p>
            Wifi:{" "}
            {singleVenue?.meta?.wifi ? (
              <span className="font-bold">Yes</span>
            ) : (
              <span className="font-bold text-red">No</span>
            )}
          </p>
          <p>
            Parking:{" "}
            {singleVenue?.meta?.parking ? (
              <span className="font-bold">Yes</span>
            ) : (
              <span className="font-bold text-red">No</span>
            )}
          </p>
          <p>
            Pets:{" "}
            {singleVenue?.meta?.pets ? (
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
            <UpdateVenueForm onClose={handleCloseForm} venue={singleVenue} />
          </div>
        </div>
      )}
      {isDeleteVenueFormOpen && (
        <div className="fixed inset-0 z-50 items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full md:w-3/4 xl:w-1/2 m-auto">
            <DeleteVenueForm onClose={handleCloseForm} venue={singleVenue} />
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
                {bookings?.map((booking) => (
                  <ShowBookingsDetail
                    customerName={booking.customer.name}
                    dateFrom={booking.dateFrom}
                    dateTo={booking.dateTo}
                    guests={booking.guests}
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
