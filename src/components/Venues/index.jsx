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

    const filteredProducts = venues.filter(
      (venue) =>
        venue.name.toLowerCase().includes(input.toLowerCase()) ||
        venue.description.toLowerCase().includes(input.toLowerCase()) ||
        (venue.location + "").toLowerCase().includes(input.toLowerCase()) // Convert to string before calling toLowerCase()
    );
    setSearchResults(filteredProducts);
  };

  return (
    <div>
      <div className="mb-5 mt-0 relative h-[300px]">
        <div  className="absolute inset-0 bg-cover bg-top bg-right" style={{backgroundImage: `url('${Banner}')`}}></div>
        {/* <img src={Banner} alt="Holidaze banner"  /> */}
      </div>
      <div className="mb-8 text-center">
        <input
          type="text"
          placeholder="Search venues..."
          value={searchInput}
          onChange={handleSearchChange}
          className="w-3/4 md:w-1/2 lg:w-1/3 p-3 border border-darkGreen text-black bg-lightGreen rounded-lg"
        />
      </div>
      {searchInput === "" ? (
        <h1 className="font-bold mb-4 text-center">All Venues</h1>
      ) : (
        <h1 className="font-bold mb-4">Search Results</h1>
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
