import { useEffect, useState } from "react";
import { allVenuesUrl } from "../../api";
import useVenuesStore from "../../store/venues";
import ErrorHandling from "../ErrorHandle";
import Loader from "../Loader";
import VenueCard from "./VenueCard";
import Banner from "./holidaze-banner-4.jpg";
import { PrimaryButton } from "../Buttons";

export function VenuesList() {
  const {
    venues,
    isError,
    isLoading,
    fetchVenues,
    fetchSearchVenues,
    searchVenues,
  } = useVenuesStore();
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState(false);

  useEffect(() => {
    fetchVenues(allVenuesUrl);
  }, [fetchVenues]);

  if (isError) {
    return (
      <div>
        <ErrorHandling error="Sorry! There is an error loading data. Please refresh the site." />
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
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchSearchVenues(searchInput);
    setSearchResults(true);
  };

  return (
    <div>
      <div className="mb-5 mt-0 relative h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-bottom bg-right "
          style={{ backgroundImage: `url('${Banner}')` }}
        >
          <div className="text-darkGreen content-center text-center text-xl bg-lightGreen bg-opacity-65 font-bold absolute h-1/3 right-0 top-1/2  w-3/4 md:w-1/2">
            YOUR STAY, OUR PLEASURE!
          </div>
        </div>
      </div>
      <form
        className="mb-8 text-center w-full mx-auto"
        onSubmit={handleSearchSubmit}
      >
        <input
          type="text"
          placeholder="Search venues..."
          value={searchInput}
          onChange={handleSearchChange}
          className="p-3 border-2 border-primary text-black rounded-lg mx-1"
        />
        <PrimaryButton
          type="submit"
          label="Search"
          stylingCss="primaryButton"
        />
      </form>

      {!searchResults || searchInput === "" ? (
        <h1 className="mb-4 text-center">All Venues</h1>
      ) : (
        <h1 className="mb-4 text-center">Search Results</h1>
      )}

      <div className="flex flex-wrap">
        {!searchResults || searchInput === ""
          ? venues?.map((venue) => <VenueCard key={venue.id} venue={venue} />)
          : searchVenues?.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
      </div>
    </div>
  );
}
