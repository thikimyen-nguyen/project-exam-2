import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { registerUrl } from "../../api";
import useAuthStore from "../../store/auth";
import Alert from "../SuccessAlert";
import { HomeNav } from "../HomeNav";
import { useState } from "react";

const schema = yup
  .object({
    bio: yup
      .string()
      .max(160, "Your Bio must be less than 160 characters."),
    avatar: yup
      .string(),
      
      
    banner: yup
      .string()
      
  })
  .required();
export function EditProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const fetchRegisterAccount = useAuthStore(
    (state) => state.fetchRegisterAccount
  );
  const { isError, registerSuccess } = useAuthStore();
  const [isVenueManager, setIsVenueManager] = useState(false);

  async function onSubmit(data) {
    reset();

    try {
        const requestData = isVenueManager
        ? { ...data, venueManager: true }
        : data;
        console.log(requestData);

      await fetchRegisterAccount(registerUrl, requestData);
    } catch (error) {
      console.error("Error registering account:", error);
      useAuthStore.setState({ isError: true });
    }
  }
  function handleVenueManagerToggle() {
    setIsVenueManager(!isVenueManager);
  }
  function closeSuccessAlert() {
    window.location.href = "/signin";
  }
  function closeErrorAlert() {
    window.location.href = "/register";
  }
  return (
    <div className="m-5">
      <h1 className="text-center">Edit Profile</h1>
      {registerSuccess && (
        <Alert
          message="Your account was registered successfully! Please Sign In."
          onClose={closeSuccessAlert}
        />
      )}
      {isError && (
        <Alert
          textColor="text-red"
          message="Error Registering Account. Your account may exist. Please try again or Sign In."
          onClose={closeErrorAlert}
        />
      )}
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
            <p>You can be our Partner to list and manage your Venues on Holidaze</p>
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
          
          <SecondaryButton label="Cancel" />
        
        <PrimaryButton label="Submit" />

        </div>
      </form>
     
    </div>
  );
}
