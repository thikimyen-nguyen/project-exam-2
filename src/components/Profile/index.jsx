import { useEffect, useState } from "react";
import useProfileStore from "../../store/profile";
import  { accessToken, currentUserName } from "../../store/profile";
import ErrorHandling from "../ErrorHandle";
import Loader from "../Loader";
import {  SecondaryButton } from "../Buttons";
import { EditProfileForm } from "../EditProfileForm";

function CurrentProfile() {
  const { currentProfile, fetchSingleProfile, isError, isLoading, apiKey, fetchApiKey } =
    useProfileStore();
    useEffect(() => {
        if (accessToken) {
         fetchApiKey();
        }
      }, []);
  useEffect(() => {
    if (apiKey) {
      fetchSingleProfile(currentUserName, apiKey, accessToken);
    }
  }, [fetchSingleProfile, apiKey]);
  
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
  };
  console.log(currentProfile);
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorHandling error="Sorry! Cannot load data now." />;
  }

  return (
    <div>
      <h1 className="text-center">MY PROFILE</h1>
      <div className="mb-5 mt-0 relative h-[200px]">
        <div
          className="absolute inset-0 bg-cover bg-bottom bg-right "
          style={{ backgroundImage: `url('${currentProfile?.banner?.url}')` }}
          alt={currentProfile?.name}
        >
          <div className="absolute w-44 left-5 top-1/4 z-10">
            <img
              src={currentProfile?.avatar?.url}
              alt={currentProfile?.name}
              className="border-2 rounded-full border-primary"
            />
            <p className="text-center text-lg font-bold">
              {currentProfile?.name}
            </p>
          </div>
          {currentProfile?.bio ? (
            <div className="text-darkGreen content-center text-center text-lg bg-lightGreen bg-opacity-65 absolute h-1/4 right-0 top-1/2 w-1/2">
              {currentProfile?.bio}
            </div>
          ) : (
            <div className="text-darkGreen content-center text-right pr-2 lg:text-center text-lg bg-lightGreen bg-opacity-65 absolute h-1/4 right-0 top-1/2 w-full">
              My Bio goes here.
            </div>
          )}
        </div>
      </div>
      <div className=" text-end">
        <SecondaryButton
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#325249"
                  d="M7.243 17.997H3v-4.243L14.435 2.319a1 1 0 0 1 1.414 0l2.829 2.828a1 1 0 0 1 0 1.415zm-4.243 2h18v2H3z"
                />
              </svg>
              <span style={{ marginLeft: "5px" }}>Edit Profile</span>
            </div>
          }
          onClick={handleEditProfile}
        />
      </div>
      <div className="mx-2">
        <h2>My Bookings</h2>
      </div>
      {isEditFormOpen && <div className="overlay"><EditProfileForm onClose={handleCloseEditForm} /></div>}

    </div>
  );
}

export default CurrentProfile;
