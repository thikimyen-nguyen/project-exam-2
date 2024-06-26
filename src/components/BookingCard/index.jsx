import { Link } from "react-router-dom";

/**
 * Renders a booking card for a venue.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.booking - The booking details (with properties: id, venue, dateFrom, dateTo, guests).
 * @param {string} props.booking.id - The unique identifier for the booking.
 * @param {Object} props.booking.venue - The venue details (with properties: name, media).
 * @param {string} props.booking.venue.name - The name of the venue.
 * @param {Array} props.booking.venue.media - An array of media objects (e.g., images) for the venue.
 * @param {string} props.booking.venue.media[0].url - The URL of the first media item (image) for the venue.
 * @param {Date} props.booking.dateFrom - The start date of the booking.
 * @param {Date} props.booking.dateTo - The end date of the booking.
 * @param {number} props.booking.guests - The number of guests for the booking.
 * @returns {JSX.Element} - The rendered booking card.
 */
export function BookingCard({
  booking: { id, venue, dateFrom, dateTo, guests },
}) {
  return (
    <div
      key={id}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4 relative flex"
    >
      <div
        id={id}
        className="p-3 group flex flex-col flex-grow rounded-lg overflow-hidden bg-white border-2 border-primary hover:shadow-md transition duration-300"
      >
        <img
          src={venue.media[0].url}
          alt={venue.name}
          className="w-full h-48 object-cover object-center group-hover:opacity-75 flex-shrink-0"
        />

        <div className="flex justify-between content-center mt-3">
          <Link
            key={id}
            to={`/${venue.id}`}
            className="font-bold text-lg hover:underline-offset-1"
          >
            {venue.name}
          </Link>{" "}
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
          {venue.location.city}, {venue.location.country}
        </div>
        <div>
          <p>
            From:{" "}
            <span className="font-bold">
              {new Date(dateFrom).toLocaleDateString()}
            </span>
          </p>
          <p>
            To:{" "}
            <span className="font-bold">
              {new Date(dateTo).toLocaleDateString()}
            </span>
          </p>
          <p>
            Number of Guests: <span className="font-bold">{guests}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
