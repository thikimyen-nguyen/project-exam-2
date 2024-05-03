import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorHandling from "../../ErrorHandle";
import Loader from "../../Loader";
import { PrimaryButton } from "../../Buttons";
import useVenuesStore from "../../../store/venues";
import VenueCalendar from "../../BookingCalendar";
import { HomeNav } from "../../HomeNav";
import { BookingVenueForm } from "../../BookingForm";
import { accessToken } from "../../../store/profile";
import Alert from "../../Alert";

function SingleVenue() {
  const { singleVenue, isError, isLoading, fetchVenueById, bookings } =
    useVenuesStore();
  const [mapsUrl, setMapsUrl] = useState("");
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignInAlert, setShowSignInAlert] = useState(false);

  let { id } = useParams();
  useEffect(() => {
    fetchVenueById(id);
  }, [fetchVenueById, id]);
  useEffect(() => {
    if (singleVenue && singleVenue.location) {
      const { city, country, zip, address } = singleVenue?.location;
      const encodedAddress = encodeURIComponent(
        `${address}, ${city}, ${country} ${zip}`
      );
      setMapsUrl(
        `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
      );
    }
  }, [singleVenue]);
  useEffect(() => {
    if (accessToken) {
      setIsSignedIn(true);
    }
  }, [accessToken]);
  useEffect(() => {
    console.log("isSignedIn:", isSignedIn);
  }, [isSignedIn]);

  if (isError) {
    return (
      <div>
        <ErrorHandling />
      </div>
    );
  }
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  const handleOpenBookingForm = () => {
    if (isSignedIn) {
      setIsBookingFormOpen(true);
    } else {
      setShowSignInAlert(true); // Show sign-in alert
    }
  };

  const handleCloseBookingForm = () => {
    setIsBookingFormOpen(false);
  };
  return (
    <section className="overflow-hidden ">
      <HomeNav />
      <div className="container mx-auto">
        <div className="lg:w-4/5 mx-auto">
          <div className="w-3/4 mx-auto">
            {singleVenue.media && (
              <img
                src={singleVenue?.media[0].url}
                alt={singleVenue?.name}
                className="w-full"
              />
            )}
          </div>
          <div className="w-full px-6 md:flex-1 mt-5">
            <div className="flex items-center my-5">
              <h1 className="mr-5">{singleVenue?.name}</h1>

              <p className="bg-primary px-2 self-center rounded">
                {singleVenue?.rating}/5
              </p>
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
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {singleVenue?.location?.address}, {singleVenue?.location?.city},
                {singleVenue?.location?.zip}, {singleVenue?.location?.country}
              </a>
            </div>
            <p className="my-5">{singleVenue?.description}</p>

            <div>
              <h2>Our Facilities</h2>
              <div className="flex my-3">
                {singleVenue?.meta?.breakfast && (
                  <div className="text-sm bg-lightGreen self-center p-1 rounded mr-2 flex items-center">
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
                {singleVenue?.meta?.wifi && (
                  <div className="text-sm bg-lightGreen self-center p-1 rounded mr-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#325249"
                        d="M12 21q-1.05 0-1.775-.725T9.5 18.5t.725-1.775T12 16t1.775.725t.725 1.775t-.725 1.775T12 21m-5.65-5.65l-2.1-2.15q1.475-1.475 3.463-2.337T12 10t4.288.875t3.462 2.375l-2.1 2.1q-1.1-1.1-2.55-1.725T12 13t-3.1.625t-2.55 1.725M2.1 11.1L0 9q2.3-2.35 5.375-3.675T12 4t6.625 1.325T24 9l-2.1 2.1q-1.925-1.925-4.462-3.012T12 7T6.563 8.088T2.1 11.1"
                      />
                    </svg>
                    <p className="ml-1">Wifi</p>
                  </div>
                )}
                {singleVenue?.meta?.parking && (
                  <div className="text-sm bg-lightGreen self-center p-1 rounded mr-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#325249"
                        d="M11 14h1.5a3.5 3.5 0 1 0 0-7H9v10h2zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m7 6h1.5a1.5 1.5 0 0 1 0 3H11z"
                      />
                    </svg>
                    <p className="ml-1">Parking</p>
                  </div>
                )}
                {singleVenue?.meta?.pets && (
                  <div className="text-sm bg-lightGreen self-center p-1 rounded mr-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 14 14"
                    >
                      <path
                        fill="#325249"
                        fillRule="evenodd"
                        d="M8.171 3.108a2.169 2.169 0 0 1 1.94-1.2h.733a.25.25 0 0 1 .25.25v2.22l2.708.902a.25.25 0 0 1 .17.237v.96a2.169 2.169 0 0 1-2.168 2.168h-1.67v.002C9.11 8.43 8.35 7.853 7.8 7.173a5.662 5.662 0 0 1-.884-1.554zM5.637 5.747H4.035a3.588 3.588 0 0 1-2.242-.787L.446 3.882a.25.25 0 0 0-.406.196v8.155a1.69 1.69 0 1 0 3.378 0v-.48a.71.71 0 0 1 .71-.709h1.919a.71.71 0 0 1 .71.71v.48a1.69 1.69 0 1 0 3.378 0V9.917c-1.49-.239-2.57-1.05-3.307-1.958a6.913 6.913 0 0 1-1.19-2.213Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="ml-1">Pets</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 32 32"
              >
                <path
                  fill="#325249"
                  d="M12 8a4 4 0 1 1 8 0a4 4 0 0 1-8 0m-3.5 8c0-1.152.433-2.204 1.146-3H6a3 3 0 0 0-3 3v3.5a1 1 0 0 0 1 1h4.5zm15 0a4.48 4.48 0 0 0-1.146-3H26a3 3 0 0 1 3 3v3.5a1 1 0 0 1-1 1h-4.5zM3 23.5A1.5 1.5 0 0 1 4.5 22h23a1.5 1.5 0 0 1 1.5 1.5a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 23.5m1-15a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m17 0a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0M10 16a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4.5H10z"
                />
              </svg>
              <p className="ml-2">Max {singleVenue?.maxGuests} Guests</p>
            </div>

            <div className="m-auto my-5 flex items-center justify-center">
              <div className="text-xl text-darkGreen font-bold mr-5">
                PRICE:{" "}
                <span className="font-medium">NOK {singleVenue.price}</span>
              </div>
              <div>
                <PrimaryButton
                  label="Reserve"
                  onClick={handleOpenBookingForm}
                />
              </div>
            </div>
            <div>
              <h2>Our Availability</h2>
              <VenueCalendar bookings={bookings} />
            </div>
          </div>
        </div>
      </div>
      {isBookingFormOpen && (
        <div className="fixed inset-0 z-50 items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full md:w-1/2 m-auto">
            <BookingVenueForm onClose={handleCloseBookingForm} />
          </div>
        </div>
      )}

      {showSignInAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <Alert
            message="Please sign in to book your stay."
            textColor="text-red"
            onClose={() => setShowSignInAlert(false)} // Close alert when clicked
          />
        </div>
      )}
    </section>
  );
}

export default SingleVenue;
