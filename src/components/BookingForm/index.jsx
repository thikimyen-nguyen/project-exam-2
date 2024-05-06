import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { accessToken, currentUserName } from "../../store/profile";
import Alert from "../Alert";
import { useEffect, useState } from "react";
import useProfileStore from "../../store/profile";
import useVenuesStore from "../../store/venues";
import useBookingStore from "../../store/bookings";
import VenueCalendar from "../BookingCalendar";

// const schema = yup
//   .object({
//     dateFrom: yup
//       .date()
//       .required("Check-in date is required")
//       .typeError("Check-in date must be a valid date")
//       .min(new Date(), "Check-in date must be today or later"),
//     dateTo: yup
//       .date()
//       .required("Check-out date is required")
//       .typeError("Check-out date must be a valid date")
//       .min(yup.ref("dateFrom"), "Check-out date must be after check-in date"),
//     guests: yup
//       .number()
//       .required("Number of guests is required")
//       .min(1, "Number of guests must be at least 1")
//       .max(4, "Number of guests must not be more than max Guests")
//       .typeError("Please choose number of Guests"),
//   })
//   .required();

export function BookingVenueForm({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // resolver: yupResolver(schema),
  });
  const { fetchCreateBooking, createBookingSuccess } = useBookingStore();
  const { apiKey } = useProfileStore();
  const { singleVenue, bookings } = useVenuesStore();
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);

  const handleCheckOutDate = (date) => {
    console.log("checkOutDate", date);
    setSelectedDateTo(date);
  };
  const handleCheckInDate = (date) => {
    console.log("checkInDate", date);
    setSelectedDateFrom(date);
  };
  async function onSubmit(data) {
    reset();
    try {
      const requestData = {
        dateFrom: selectedDateFrom.toISOString(),
        dateTo: selectedDateTo.toISOString(),
        guests: parseInt(data.guests),
        venueId: singleVenue?.id,
      };
      requestData.dateFrom = new Date(
        selectedDateFrom.getTime() -
          selectedDateFrom.getTimezoneOffset() * 60000
      ).toISOString();
      requestData.dateTo = new Date(
        selectedDateTo.getTime() - selectedDateTo.getTimezoneOffset() * 60000
      ).toISOString();
      console.log(requestData);

      await fetchCreateBooking(apiKey, accessToken, requestData);
    } catch (error) {
      console.error("Error registering account:", error);
    }
  }

  function closeSuccessAlert() {
    window.location.href = "/profile";
  }
  function closeErrorAlert() {
    window.location.reload();
  }
  return (
    <div className="my-20 p-5">
      <h1 className="text-center">Booking</h1>
      {createBookingSuccess === true && (
        <Alert
          message="Your booking is completed!"
          onClose={closeSuccessAlert}
        />
      )}
      {createBookingSuccess === false && (
        <Alert
          textColor="text-red"
          message="Error booking. You can try again later."
          onClose={closeErrorAlert}
        />
      )}
      <div className="text-end">
        <SecondaryButton label="X Close" onClick={onClose} />
      </div>
      <div>
        <p>
          Location: <span className="font-bold">{singleVenue?.name}</span>{" "}
          <span>
            in {singleVenue?.location?.city}, {singleVenue?.location?.country}
          </span>
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col  content-center mx-auto items-center p-3 "
      >
        <div className="mb-4">
          <label htmlFor="dateFrom" className="block font-semibold">
            Check-in Date
          </label>
          <VenueCalendar bookings={bookings} onDateSelect={handleCheckInDate} />

          {selectedDateFrom === null && (
            <p className="text-red">Please select check-in date</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="dateTo" className="block font-semibold">
            Check-out Date
          </label>

          <VenueCalendar
            bookings={bookings}
            onDateSelect={handleCheckOutDate}
          />

          {selectedDateTo === null && (
            <p className="text-red">Please select check-out date</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="guests" className="block font-semibold">
            Number of Guests{" "}
            {singleVenue && (
              <span className="text-gray-500">
                {" "}
                (Max {singleVenue?.maxGuests})
              </span>
            )}
          </label>

          <input
            id="guests"
            type="number"
            {...register("guests", {
              required: "Number of guests is required",
              min: { value: 1, message: "Number of guests must be at least 1" },
              max: {
                value: singleVenue?.maxGuests,
                message: `Number of guests must not be more than ${singleVenue?.maxGuests}`,
              },
            })}
            className={`mt-1 p-2 text-black ${
              errors.guests ? "error-border" : "border-primary"
            } rounded w-full`}
            placeholder="0"
            max={singleVenue?.maxGuests}
            min={1}
          />

          <p className="text-red">{errors.guests?.message}</p>
        </div>

        <div className="mt-4 text-center">
          <PrimaryButton label="Submit" />{" "}
        </div>
      </form>
    </div>
  );
}
