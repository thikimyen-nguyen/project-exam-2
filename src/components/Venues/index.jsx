import { useEffect, useState } from "react";
import { allVenuesUrl } from "../../api";
import useVenuesStore from "../../store/venues";
import ErrorHandling from "../ErrorHandle";
import Loader from "../Loader";
import VenueCard from "./venueCard";
import Banner from "./holidaze-banner-4.jpg";

export function VenuesList() {
  const { venues, isError, isLoading, fetchVenues } = useVenuesStore();
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchVenues(allVenuesUrl);
  }, [fetchVenues]);

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

  // Search

  const handleSearchChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);

    const filteredVenues = venues.filter(
      (venue) =>
        venue.name?.toLowerCase().includes(input.toLowerCase()) ||
        venue.description?.toLowerCase().includes(input.toLowerCase()) ||
        venue.location?.address?.toLowerCase().includes(input.toLowerCase()) ||
        venue.location?.city?.toLowerCase().includes(input.toLowerCase()) ||
        venue.location?.country?.toLowerCase().includes(input.toLowerCase()) ||
        venue.location?.continent?.toLowerCase().includes(input.toLowerCase())
    );
    setSearchResults(filteredVenues);
  };

  return (
    <div>
      <div className="mb-5 mt-0 relative h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-bottom bg-right "
          style={{ backgroundImage: `url('${Banner}')` }}
        >
          <div className="text-darkGreen content-center text-center text-xl bg-lightGreen bg-opacity-65 font-bold absolute h-1/3 right-0 top-1/2 w-1/2">
            YOUR STAY, OUR PLEASURE!
          </div>
        </div>
      </div>
      <div className="mb-8 text-center">
        <input
          type="text"
          placeholder="Search venues..."
          value={searchInput}
          onChange={handleSearchChange}
          className="w-3/4 md:w-1/2 lg:w-1/3 p-3 border-2 border-primary text-black  rounded-lg"
        />
      </div>
      {searchInput === "" ? (
        <h1 className="font-bold mb-4 text-center">All Venues</h1>
      ) : (
        <h1 className="font-bold mb-4 text-center">Search Results</h1>
      )}

      <div className="flex flex-wrap">
        {searchInput === ""
          ? venues?.map((product) => (
              <VenueCard key={product.id} product={product} />
            ))
          : searchResults?.map((product) => (
              <VenueCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
