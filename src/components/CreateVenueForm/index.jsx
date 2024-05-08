import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { registerUrl } from "../../api";
import useAuthStore from "../../store/auth";
import Alert from "../Alert";
import { HomeNav } from "../HomeNav";
import { useState } from "react";

const schema = yup
  .object({
    name: yup
      .string()
      
      .min(5, "Venue name must be at least 5 characters.")

      .required("Please enter your venue name."),
      description: yup
      .string()
      
      .min(10, "Description must be at least 10 characters.")

      .required("Describe your Venue"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters.")
      .required("Please enter correct password."),
  })
  .required();
export function CreateVenueForm({onClose}) {
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
      <h1 className="text-center">Create New Venue</h1>
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
       <div className="text-end">
        <SecondaryButton label="X Close" onClick={onClose} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col md:w-3/4 lg:w-1/2 content-center mx-auto items-center p-3 "
      >
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold">
            Venue Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={`mt-1 p-2 text-black ${
              errors.name ? "error-border" : "border-primary"
            } rounded w-full`}
            placeholder="Your Venue Name"
          />
          <p className="text-red">{errors.name?.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold">
            Description
          </label>
          <input
            type="text"
            id="description"
            {...register("description")}
            className={`mt-1 p-2 text-black ${
              errors.email ? "error-border" : "border-primary"
            } rounded w-full`}
            placeholder="abc@stud.noroff.no"
          />
          <p className="text-red">{errors.description?.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className={`mt-1 p-2 text-black ${
              errors.password ? "error-border" : "border-primary"
            } rounded w-full`}
            placeholder="Your password"
          ></input>
          <p className="text-red">{errors.password?.message}</p>
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
          <PrimaryButton label="Register" />
        </div>
      </form>
      <div className="text-center">
        <p className="mb-4">Already have an account?</p>
        <a href="/signin">
          <SecondaryButton label="Sign In" />
        </a>
      </div>
    </div>
  );
}
