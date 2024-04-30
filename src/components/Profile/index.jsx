import { useEffect } from "react";
import useProfileStore from "../../store/profile";
import useAuthStore, { accessToken, currentUserName } from "../../store/auth";
import ErrorHandling from "../ErrorHandle";
import Loader from "../Loader";

function CurrentProfile() {
  const { currentProfile, fetchSingleProfile, isError, isLoading } =
    useProfileStore();
  const { fetchApiKey, apiKey } = useAuthStore();

  useEffect(() => {
    fetchApiKey();
  }, [fetchApiKey]);
  useEffect(() => {
    if (apiKey) {
      fetchSingleProfile(currentUserName, apiKey, accessToken);
    }
  }, [fetchSingleProfile, apiKey]);
console.log(currentProfile)
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorHandling error="Sorry! Cannot load data now." />;
  }

  return (
    <div>
      <h1 className="text-center">MY PROFILE</h1>
      {/* Render profile data here */}
    </div>
  );
}

export default CurrentProfile;
