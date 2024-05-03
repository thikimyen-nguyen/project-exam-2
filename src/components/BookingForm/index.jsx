import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { accessToken, currentUserName } from "../../store/profile";
import Alert from "../Alert";
import { useEffect, useState } from "react";
import useProfileStore from "../../store/profile";
import useVenuesStore, { currentVenue } from "../../store/venues";
import useBookingStore from "../../store/bookings";

const schema = yup.object({
    dateFrom: yup
      .date()
      .required("Check-in date is required")
      .typeError("Check-in date must be a valid date")
      .min(new Date(), "Check-in date must be today or later"),
    dateTo: yup
      .date()
      .required("Check-out date is required")
      .typeError("Check-out date must be a valid date")
      .min(yup.ref("dateFrom"), "Check-out date must be after check-in date"),
    guests: yup
      .number()
      .required("Number of guests is required")
      .min(1, "Number of guests must be at least 1")
      .typeError("Please choose number of Guests"),
  })  
  .required();

export function BookingVenueForm({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { fetchCreateBooking, createBookingSuccess} = useBookingStore();
  const { apiKey } = useProfileStore();
  const { bookings } = useVenuesStore();


  async function onSubmit(data) {
   
    reset(); 
    try {
        const requestData = {
            dateFrom: new Date(data.dateFrom).toISOString(),
            dateTo: new Date(data.dateTo).toISOString(),
            guests: data.guests,
            venueId: currentVenue?.id
          };
        console.log(requestData);

      await fetchCreateBooking(apiKey, accessToken, requestData);
    } catch (error) {
      console.error("Error registering account:", error);
    //   useAuthStore.setState({ isError: true });
    }
  }

  function closeSuccessAlert() {
    window.location.href = "/profile";
  }
  function closeErrorAlert() {
    window.location.href = "/profile";
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
          Location: <span className="font-bold">{currentVenue?.name}</span>{" "}
          <span>
            in {currentVenue?.location?.city}, {currentVenue?.location?.country}
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
          <input
            type="date"
            id="dateFrom"
            {...register("dateFrom")}
            className={`mt-1 p-2 text-black ${
              errors.dateFrom ? "error-border" : "border-primary"
            } rounded w-full`}
          />
          <p className="text-red">{errors.dateFrom?.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="dateTo" className="block font-semibold">
            Check-out Date
          </label>
          <input
            type="date"
            id="dateTo"
            {...register("dateTo")}
            className={`mt-1 p-2 text-black ${
              errors.dateTo ? "error-border" : "border-primary"
            } rounded w-full`}
          />
          <p className="text-red">{errors.dateTo?.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="guests" className="block font-semibold">
            Number of Guests{" "}
            {currentVenue && (
              <span className="text-gray-500">
                {" "}
                (Max {currentVenue?.maxGuests})
              </span>
            )}
          </label>
          <select
            id="guests"
            {...register("guests")}
            className={`mt-1 p-2 text-black border ${
              errors.guests ? "error-border" : "border-primary"
            } rounded w-full`}
          >
            {currentVenue &&
              Array.from({ length: currentVenue?.maxGuests }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
          </select>
          <p className="text-red">{errors.guests?.message}</p>
        </div>

        <div className="mt-4 text-center">
<PrimaryButton label='Submit' />       </div>
      </form>
    </div>
  );
}

