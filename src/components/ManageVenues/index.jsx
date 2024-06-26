import { PrimaryButton } from "../Buttons";
import useProfileStore from "../../store/profile";
import { HomeNav } from "../HomeNav";
import { useState } from "react";
import { CreateVenueForm } from "../CreateVenueForm";
import VenuesListingCard from "./VenuesListing";
import ErrorHandling from "../ErrorHandle";
import Loader from "../Loader";

/**
 * Represents a component for managing venues.
 *
 * @returns {JSX.Element} - A component for venue management to show on admin page
 */
function ManageVenues() {
  const { currentProfile, isError, isLoading } = useProfileStore();
  const [isCreateVenueFormOpen, setIsCreateVenueFormOpen] = useState(false);

  const handleOpenCreateVenueForm = () => {
    setIsCreateVenueFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsCreateVenueFormOpen(false);
  };
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
  return (
    <div className="p-5">
      <HomeNav />
      <h1 className="text-center my-5">VENUE MANAGEMENT</h1>

      <div className="bg-lightGreen content-center flex items-center">
        <div className="w-12 ">
          <img
            src={currentProfile?.avatar?.url}
            alt={currentProfile?.name}
            className="border-2 rounded-full border-primary h-12 "
          />
        </div>
        <p className="ml-3">
          Hi! <span className="text-lg font-bold">{currentProfile?.name} </span>
          as Venue Manager
        </p>
      </div>
      <div className="text-right my-5">
        <PrimaryButton
          label="+ New Venue"
          onClick={handleOpenCreateVenueForm}
          stylingCss="primaryButton"
        />
      </div>
      {isCreateVenueFormOpen && (
        <div className="fixed inset-0 z-50 items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full md:w-3/4 xl:w-1/2 m-auto">
            <CreateVenueForm onClose={handleCloseForm} />
          </div>
        </div>
      )}
      <h2 className="my-5">
        My Venues{" "}
        <span className="font-normal">
          ( Total: {currentProfile?._count?.venues} )
        </span>
      </h2>
      {currentProfile?.venues?.map((venue) => (
        <VenuesListingCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
}

export default ManageVenues;
