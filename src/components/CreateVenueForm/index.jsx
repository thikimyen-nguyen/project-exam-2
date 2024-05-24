import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ExtraButton, PrimaryButton } from "../Buttons";
import Alert from "../Alert";
import useVenuesStore from "../../store/venues";
import useProfileStore, { accessToken } from "../../store/profile";

const schema = yup
  .object({
    name: yup
      .string()

      .min(3, "Venue name must be at least 3 characters.")

      .required("Please enter your venue name."),
    description: yup
      .string()

      .min(10, "Description must be at least 10 characters.")

      .required("Describe your Venue"),
    media: yup
      .string()
      .url("media must be a valid URL")
      .notRequired()
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
      .typeError("Price must be a number")
      .required("Please input the price"),
    maxGuests: yup
      .number()
      .required("Number of Guests is required")
      .min(1, "Max Guests must be at least 1")
      .max(100, "Max number of Guests is 100")
      .typeError("Max Guests must be a number")
      .required("Please input the max number of guests"),
    isWifi: yup.boolean().notRequired().default(false),
    isParking: yup.boolean().notRequired().default(false),
    isBreakfast: yup.boolean().notRequired().default(false),
    isPets: yup.boolean().notRequired().default(false),
    address: yup.string().notRequired().default(null),
    city: yup.string().notRequired().default(null),
    zip: yup.string().notRequired().default(null),
    country: yup.string().notRequired().default(null),
    continent: yup.string().notRequired().default(null),
  })
  .required();
/**
 * Represents a form for creating a new venue.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onClose - The callback function to close the form.
 * @returns {JSX.Element} - A form element for creating a new venue.
 */
export function CreateVenueForm({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { apiKey } = useProfileStore();

  const { createVenueSuccess, errorVenueMessage, fetchCreateVenue } =
    useVenuesStore();

  async function onSubmit(data) {
    reset();

    try {
      const requestData = {
        name: data.name,
        description: data.description,
        ...(data.media && { media: [{ url: data.media, alt: "" }] }),
        price: data.price,
        maxGuests: data.maxGuests,
        meta: {
          wifi: data.isWifi,
          parking: data.isParking,
          breakfast: data.isBreakfast,
          pets: data.isPets,
        },
        location: {
          address: data.address,
          city: data.city,
          zip: data.zip,
          country: data.country,
          continent: data.continent,
          lat: 0,
          lng: 0,
        },
      };


      await fetchCreateVenue(apiKey, accessToken, requestData);
    } catch (error) {
      console.log(errorVenueMessage);
    }
  }

  function closeSuccessAlert() {
    window.location.href = "/admin";
  }
  function closeErrorAlert() {
    window.location.reload();
  }
  return (
    <div className="my-20 p-5">
      <h1 className="text-center">Create New Venue</h1>
      {createVenueSuccess === true && (
        <Alert
          message="Your Venue was registered successfully! "
          onClose={closeSuccessAlert}
        />
      )}
      {createVenueSuccess === false && (
        <Alert
          textColor="text-red"
          message="Error Registering Venue. Please try again later."
          onClose={closeErrorAlert}
        />
      )}
      <div className="text-end">
        <ExtraButton label="X Close" onClick={onClose} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col content-center mx-auto items-center p-3 "
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
            Image URL <span className="font-normal">(optional)</span>
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

        <div className="my-6">
          <p className="font-bold">
            Your Facilities <span className="font-normal">(optional)</span>
          </p>
          <div className="flex justify-evenly">
            <div className="flex-col">
              <div className="flex items-center justify-between">
                <label htmlFor="wifi" className="block mr-4">
                  Wifi
                </label>
                <input
                  type="checkbox"
                  id="wifi"
                  {...register("isWifi")}
                  className="text-2xl"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="parking" className="block mr-4">
                  Parking
                </label>
                <input
                  type="checkbox"
                  id="parking"
                  {...register("isParking")}
                  className="text-2xl"
                />
              </div>
            </div>
            <div className="flex-col">
              <div className="flex items-center justify-between">
                <label htmlFor="breakfast" className="block mr-4">
                  Breakfast
                </label>
                <input
                  type="checkbox"
                  id="breakfast"
                  {...register("isBreakfast")}
                  className="text-2xl"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="pets" className="block mr-4">
                  Pets
                </label>
                <input
                  type="checkbox"
                  id="pets"
                  {...register("isPets")}
                  className="text-2xl"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="my-6 ">
          <p className="font-bold">
            Location <span className="font-normal">(optional)</span>
          </p>
          <div className="mb-4">
            <label htmlFor="address" className="block">
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address")}
              className={`mt-1 p-2 text-black ${
                errors.address ? "error-border" : "border-primary"
              } rounded w-full`}
              placeholder="Street 01"
            />
            <p className="text-red">{errors.address?.message}</p>
          </div>

          <div className="mb-4 flex justify-between">
            <div>
              <label htmlFor="city" className="block">
                City
              </label>
              <input
                type="text"
                id="city"
                {...register("city")}
                className={`mt-1 p-2 text-black ${
                  errors.city ? "error-border" : "border-primary"
                } rounded w-full`}
                placeholder="City"
              />
              <p className="text-red">{errors.city?.message}</p>
            </div>
            <div>
              <label htmlFor="zip" className="block">
                Zip
              </label>
              <input
                type="text"
                id="zip"
                {...register("zip")}
                className={`mt-1 p-2 text-black ${
                  errors.zip ? "error-border" : "border-primary"
                } rounded w-full`}
                placeholder="Zip Code"
              />
              <p className="text-red">{errors.zip?.message}</p>
            </div>
          </div>
          <div className="mb-4 flex justify-between">
            <div>
              <label htmlFor="country" className="block">
                Country
              </label>
              <input
                type="text"
                id="country"
                {...register("country")}
                className={`mt-1 p-2 text-black ${
                  errors.country ? "error-border" : "border-primary"
                } rounded w-full`}
                placeholder="Country"
              />
              <p className="text-red">{errors.country?.message}</p>
            </div>
            <div>
              <label htmlFor="continent" className="block">
                Continent
              </label>
              <input
                type="text"
                id="continent"
                {...register("continent")}
                className={`mt-1 p-2 text-black ${
                  errors.continent ? "error-border" : "border-primary"
                } rounded w-full`}
                placeholder="Continent"
              />
              <p className="text-red">{errors.continent?.message}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <PrimaryButton label="Create" stylingCss="primaryButton" />
        </div>
      </form>
    </div>
  );
}
