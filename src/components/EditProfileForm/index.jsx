import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ExtraButton, PrimaryButton } from "../Buttons";
import { accessToken, currentUserName } from "../../store/profile";
import Alert from "../Alert";
import { useEffect, useState } from "react";
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
  venueManager: yup.boolean(),
});

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
  const { currentProfile, updateSuccess } = useProfileStore();
  const [isVenueManager, setIsVenueManager] = useState(false);

  const { apiKey } = useProfileStore();
  useEffect(() => {
    const currentVenueManager = currentProfile?.venueManager;
    setIsVenueManager(currentVenueManager);
  }, [currentProfile]);
  function handleVenueManagerToggle() {
    setIsVenueManager(!isVenueManager);
  }


  async function onSubmit(data) {
    reset();

    if (apiKey) {
      try {
        const requestData = {
          venueManager: isVenueManager, // Include the current state value of venueManager
        };

        if (data.bio) {
          requestData.bio = data.bio;
        }

        if (data.avatar) {
          requestData.avatar = {
            url: data.avatar,
            alt: "",
          };
        }

        if (data.banner) {
          requestData.banner = {
            url: data.banner,
            alt: "",
          };
        }
        await fetchUpdateProfile(
          currentUserName,
          apiKey,
          accessToken,
          requestData
        );
      } catch (error) {
        console.error("Error updating profile", error);
        useProfileStore.setState({ updateSuccess: false });
      }
    }
  }

  function closeSuccessAlert() {
    window.location.href = "/profile";
  }
  function closeErrorAlert() {
    window.location.href = "/profile";
  }
  return (
    <div className="my-20 p-5">
      <h1 className="text-center">Edit Profile</h1>
      {updateSuccess === true && (
        <Alert
          message="Your Profile is now updated."
          onClose={closeSuccessAlert}
        />
      )}
      {updateSuccess === false && (
        <Alert
          textColor="text-red"
          message="Error Updating Profile. You can try again later."
          onClose={closeErrorAlert}
        />
      )}
      <div className="text-end">
        <ExtraButton label="X Close" onClick={onClose} />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col  content-center mx-auto items-center p-3 "
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
              errors.bio ? "error-border" : "border-primary"
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
              errors.avatar ? "error-border" : "border-primary"
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
              errors.banner ? "error-border" : "border-primary"
            } rounded w-full`}
            placeholder="It must be a valid and accessible URL"
          ></input>
          <p className="text-red">{errors.banner?.message}</p>
        </div>
        <div className="my-6 ">
          <div className="flex items-center">
            <label htmlFor="venueManager" className="block font-semibold mr-4">
              Want to be Venue Manager
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
          <PrimaryButton label="Submit" stylingCss="primaryButton" />
        </div>
      </form>
    </div>
  );
}
