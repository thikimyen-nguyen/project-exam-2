import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ExtraButton, PrimaryButton } from "../Buttons";
import useAuthStore from "../../store/auth";
import Alert from "../Alert";
import useVenuesStore from "../../store/venues";
import useProfileStore, { accessToken } from "../../store/profile";

export function DeleteVenueForm({ venue, onClose }) {
 

  const { apiKey } = useProfileStore();

  const { deleteVenueSuccess, errorVenueMessage, fetchDeleteVenue } =
    useVenuesStore();

  async function handleDeleteVenue() {

    try {
      console.log("delete");

        await fetchDeleteVenue(apiKey, accessToken, venue.id);
    } catch (error) {
      console.log(errorVenueMessage);
    }
  }

  function closeSuccessAlert() {
    window.location.reload();
  }
  function closeErrorAlert() {
    window.location.reload();
  }

  return (
    <div className="my-20 py-5">
      <h1 className="text-center">Delete Venue</h1>
      {deleteVenueSuccess === true && (
        <Alert
          message="Your Venue was deleted successfully! "
          onClose={closeSuccessAlert}
        />
      )}
      {deleteVenueSuccess === false && (
        <Alert
          textColor="text-red"
          message="Error deleting Venue. Please try again later."
          onClose={closeErrorAlert}
        />
      )}

      <div className="text-center my-5">
        <p>
          Venue Name: <span className="font-bold">{venue?.name}</span>
        </p >
        <p className="mt-10 text-xl">Are you sure to delete this venue?</p>

        <div className="my-5">
          <PrimaryButton
            label="Cancel"
            stylingCss="secondaryButton"
            onClick={onClose}
          />

          <PrimaryButton label="Delete" stylingCss="primaryButton"  onClick={handleDeleteVenue}/>
        </div>
      </div>
    </div>
  );
}
