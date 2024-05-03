import { Link } from "react-router-dom";
import { PrimaryButton } from "../Buttons";

export function BookingCard({ booking: { id, venue, dateFrom, dateTo, guests } }) {
  return (
    <div key={id} className="border border-primary rounded p-3">
      <div className="p-3 w-1/3 m-auto">
        <img src={venue.media[0].url} alt={venue.name} />
      </div>
      <div>
        <h3 >Location: <Link  key={id}
      to={`/${venue.id}`} className="font-bold">{venue.name}</Link></h3>
        <p>Address: {venue.location.city}, {venue.location.country}</p>
        <p>Check-in: <span className="font-bold">{new Date(dateFrom).toLocaleDateString()}</span></p>
        <p>Check-out: <span className="font-bold">{new Date(dateTo).toLocaleDateString()}</span></p>
        <p>Number of Guests: <span className="font-bold">{guests}</span></p>
      </div>
     
    </div>
  );
}
