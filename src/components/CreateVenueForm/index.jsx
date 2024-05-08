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
    media: yup
      .string()
      .url("media must be a valid URL")
      .test(
        "is-url",
        "Venue image must be a valid and accessible URL",
        (value) => {
          if (!value) return true;
          const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
          return urlRegex.test(value);
        }
      ),
    price: yup
      .number()
      .required("Price is required")
      .min(0)
      .max(10000)
      .required("Please input the price"),
    maxGuests: yup
      .number()
      .required("Number of Guests is required")
      .min(1, "Max Guests must be at least 1")
      .max(100, "Max number of Guests is 100")
      .required("Please input the max number of guests"),
  })
  .required();
export function CreateVenueForm({ onClose }) {
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
  const [isWifi, setIsWifi] = useState(false);
  const [isParking, setIsParking] = useState(false);
  const [isBreakfast, setIsBreakfast] = useState(false);
  const [isPets, setIsPets] = useState(false);

  async function onSubmit(data) {
    reset();

    try {
      const requestData = {
        ...data,
        meta: {
          wifi: isWifi,
          parking: isParking,
          breakfast: isBreakfast,
          pets: isPets,
        },
      };
      if (data.media) {
        requestData.media = {
          url: data.media,
          alt: "",
        };
      }

      console.log(requestData);

      await fetchRegisterAccount(registerUrl, requestData);
    } catch (error) {
      console.error("Error registering account:", error);
      useAuthStore.setState({ isError: true });
    }
  }
  function handleWifiToggle() {
    setIsWifi(!isWifi);
  }
  function handleParkingToggle() {
    setIsParking(!isParking);
  }
  function handleBreakfastToggle() {
    setIsBreakfast(!isBreakfast);
  }
  function handlePetsToggle() {
    setIsPets(!isPets);
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
            placeholder="Your venue name"
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
              errors.description ? "error-border" : "border-primary"
            } rounded w-full`}
            placeholder="Tell something about your venue..."
          />
          <p className="text-red">{errors.description?.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="media" className="block font-semibold">
            Image URL
          </label>
          <input
            id="media"
            type="url"
            {...register("media")}
            className={`mt-1 p-2 text-black ${
              errors.media ? "error-border" : "border-primary"
            } rounded w-full`}
            placeholder="Image must be a valid and accessible URL"
          ></input>
          <p className="text-red">{errors.media?.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-semibold">
            Price (NOK)
          </label>
          <input
            id="price"
            type="number"
            {...register("price")}
            className={`mt-1 p-2 text-black ${
              errors.price ? "error-border" : "border-primary"
            } rounded w-full`}
            placeholder="NOK"
          ></input>
          <p className="text-red">{errors.price?.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="maxGuests" className="block font-semibold">
            Max Guests
          </label>
          <input
            id="maxGuests"
            type="number"
            {...register("maxGuests")}
            className={`mt-1 p-2 text-black ${
              errors.maxGuests ? "error-border" : "border-primary"
            } rounded w-full`}
            placeholder="1"
          ></input>
          <p className="text-red">{errors.maxGuests?.message}</p>
        </div>

        <div className="my-6 ">
          <p className="font-bold">Your Facilities </p>
          <div className="flex justify-around">
            <div className="flex items-center ">
              <label htmlFor="wifi" className="block mr-4">
                Wifi
              </label>
              <input
                type="checkbox"
                id="wifi"
                checked={isWifi}
                onChange={handleWifiToggle}
                className="text-2xl"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="parking" className="block mr-4">
                Parking
              </label>
              <input
                type="checkbox"
                id="parking"
                checked={isParking}
                onChange={handleParkingToggle}
                className="text-2xl"
              />
            </div>
          </div>
          <div className="flex justify-around">
            <div className="flex items-center">
              <label htmlFor="breakfast" className="block mr-4">
                Breakfast
              </label>
              <input
                type="checkbox"
                id="breakfast"
                checked={isBreakfast}
                onChange={handleBreakfastToggle}
                className="text-2xl"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="pets" className="block mr-4">
                Pets
              </label>
              <input
                type="checkbox"
                id="pets"
                checked={isPets}
                onChange={handlePetsToggle}
                className="text-2xl"
              />
            </div>
          </div>
        </div>
        <div className="my-6 ">
          <p className="font-bold">Location</p>

        </div>

        <div className="mt-4 text-center">
          <PrimaryButton label="Create" />
        </div>
      </form>
    </div>
  );
}
