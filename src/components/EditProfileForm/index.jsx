import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import  { accessToken, currentUserName } from "../../store/profile";
import Alert from "../SuccessAlert";
import {  useState } from "react";
import useProfileStore from "../../store/profile";

const schema = yup.object({
    bio: yup.string().max(160, "Your Bio must be less than 160 characters."),
    avatar: yup
      .string()
      .url("Avatar must be a valid URL") 
      .test("is-url", "Avatar must be a valid and accessible URL", (value) => {
        if (!value) return true; 
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(value);
      }),
    banner: yup
      .string()
      .url("Banner must be a valid URL") 
      .test("is-url", "Banner must be a valid and accessible URL", (value) => {
        if (!value) return true; 
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(value);
      }),
    venueManager: yup.boolean(), // Venue Manager field
  }).test(
    "at-least-one-filled",
    "At least one input field must be filled", // Error message if condition not met
    (value) => {
      const { bio, avatar, banner, venueManager } = value;
      // Check if at least one of the fields has a value
      return bio || avatar || banner || venueManager;
    }
  );
  
  
export function EditProfileForm({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const fetchUpdateProfile = useProfileStore(
    (state) => state.fetchUpdateProfile
  );
  const { isError, updateSuccess, currentProfile} = useProfileStore();
  const [isVenueManager, setIsVenueManager] = useState(false);
  const { apiKey } = useProfileStore();

  

  async function onSubmit(data) {
    reset();
    if (apiKey) {
        try {
            const requestData = isVenueManager
              ? { ...data, venueManager: true }
              : data;
              console.log(requestData);
            await fetchUpdateProfile(
              currentUserName,
              apiKey,
              accessToken,
              requestData
            );
      
          } catch (error) {
            console.error("Error updating profile", error);
            useProfileStore.setState({ isError: true });
          }
    }
   
  }
  function handleVenueManagerToggle() {
    setIsVenueManager(!isVenueManager);
  }
  function closeSuccessAlert() {
    window.location.href = "/profile";
  }
  function closeErrorAlert() {
    window.location.href = "/profile";
  }
  return (
    <div className="m-5">
      <h1 className="text-center">Edit Profile</h1>
      {updateSuccess && (
        <Alert
          message="Your Profile is now updated."
          onClose={closeSuccessAlert}
        />
      )}
      {isError && (
        <Alert
          textColor="text-red"
          message="Error Updating Profile. You can try again later."
          onClose={closeErrorAlert}
        />
      )}
      <div className="text-end">
        <SecondaryButton label="X Close" onClick={onClose} />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col md:w-3/4 lg:w-1/2 content-center mx-auto items-center p-3 "
      >
        <div className="mb-4">
          <label htmlFor="bio" className="block font-semibold">
            Your Bio
          </label>
          <input
            type="text"
            id="bio"
            {...register("bio")}
            className={`mt-1 p-2 text-black ${
              errors.name ? "error-border" : "border-primary"
            } rounded w-full`}
            placeholder="Bio Description"
          />
          <p className="text-red">{errors.bio?.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="avatar" className="block font-semibold">
            Avatar URL
          </label>
          <input
            type="url"
            id="avatar"
            {...register("avatar")}
            className={`mt-1 p-2 text-black ${
              errors.email ? "error-border" : "border-primary"
            } rounded w-full`}
            placeholder="It must be a valid and accessible URL"
          />
          <p className="text-red">{errors.avatar?.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="banner" className="block font-semibold">
            Banner URL
          </label>
          <input
            id="banner"
            type="url"
            {...register("banner")}
            className={`mt-1 p-2 text-black ${
              errors.password ? "error-border" : "border-primary"
            } rounded w-full`}
            placeholder="It must be a valid and accessible URL"
          ></input>
          <p className="text-red">{errors.banner?.message}</p>
        </div>
        <div className="my-6 ">
          <p>
            You can be our Partner to list and manage your Venues on Holidaze
          </p>
          <div className="flex items-center">
            <label htmlFor="venueManager" className="block font-semibold mr-4">
              Register as Venue Manager
            </label>
            <input
              type="checkbox"
              id="venueManager"
              checked={isVenueManager}
              onChange={handleVenueManagerToggle}
              className="text-2xl"
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          <PrimaryButton label="Submit" />
        </div>
      </form>
    </div>
  );
}
