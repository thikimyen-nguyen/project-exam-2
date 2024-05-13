import { Link } from "react-router-dom";
import { PrimaryButton } from "../Buttons";
import useProfileStore from "../../store/profile";
import { HomeNav } from "../HomeNav";
import { useState } from "react";
import { CreateVenueForm } from "../CreateVenueForm";
import VenuesListingCard from "./VenuesListing";

function ManageVenues() {
  const { currentProfile, isError, isLoading } = useProfileStore();
  const [isCreateVenueFormOpen, setIsCreateVenueFormOpen] = useState(false);
  const handleOpenCreateVenueForm = () => {
    setIsCreateVenueFormOpen(true);
  };

  
  const handleCloseForm = () => {
    setIsCreateVenueFormOpen(false);
  };
  return (
    <div className="p-5">
      <HomeNav />
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
      <h1 className="text-center my-5">VENUE MANAGEMENT</h1>
      <div className="text-center">
        <PrimaryButton
          label="+ New Venue"
          onClick={handleOpenCreateVenueForm}
          stylingCss='primaryButton'
        />
      </div>
      {isCreateVenueFormOpen && (
        <div className="fixed inset-0 z-50 items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full md:w-3/4 xl:w-1/2 m-auto">
            <CreateVenueForm onClose={handleCloseForm} />
          </div>
        </div>
      )}
      <h2>Your Venues</h2>
      {currentProfile?.venues?.map((venue) => (
              <VenuesListingCard key={venue.id} venue={venue} />
            ))}
    </div>
  );
}

export default ManageVenues;
