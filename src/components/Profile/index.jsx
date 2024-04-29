import { useEffect, useState } from "react";
import useProfileStore from "../../store/profile"
import ErrorHandling from "../ErrorHandle";
import Loader from "../Loader";
import { apiKeyUrl } from "../../api";

function CurrentProfile() {
    const { currentProfile, fetchSingleProfile, isError, isLoading } = useProfileStore();
    const currentUser = JSON.parse(localStorage.getItem('currentUserName'));
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    const [apiKey, setApiKey] = useState(null);

    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const postOption = {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                };
                const response = await fetch(apiKeyUrl, postOption);
                const json = await response.json();
                setApiKey(json.data.key); 
            } catch (error) {
                console.error("Error fetching API key:", error);
            }
        };

        fetchApiKey();
    }, [accessToken, setApiKey]);
    useEffect(() => {
        if (apiKey) {
            fetchSingleProfile(currentUser, apiKey, accessToken);
        }
    }, [fetchSingleProfile, currentUser, apiKey, accessToken]);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <ErrorHandling error='Sorry! Cannot load data now.' />;
    }

    return (
        <div>
            <h1 className="text-center">MY PROFILE</h1>
            {/* Render profile data here */}
        </div>
    );
}

export default CurrentProfile;
