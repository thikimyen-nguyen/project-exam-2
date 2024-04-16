import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ErrorHandling from "../../ErrorHandle";
import Loader from "../../Loader";
import { PrimaryButton } from "../../Buttons";
import useVenuesStore from "../../../store/venues";

function SingleVenue() {
  const { singleVenue, isError, isLoading, fetchVenueById } = useVenuesStore();

  let { id } = useParams();
  useEffect(() => {
    fetchVenueById(id);
  }, [fetchVenueById, id]);

  if (isError) {
    return (
      <div>
        <ErrorHandling />
      </div>
    );
  }
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <section className="overflow-hidden ">
      <div className="container mx-auto">
        <div className="lg:w-4/5 mx-auto md:flex ">
          <div className="w-80 mx-auto">
            {singleVenue.media && (
              <img
                src={singleVenue?.media[0].url}
                alt={singleVenue?.name}
                className="w-full"
              />
            )}
          </div>
          <div className="w-full px-6 md:flex-1 mt-5">
            <h1 className=" mb-5">{singleVenue?.name}</h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                Rating:
                <span className="text-primary ml-3">
                  {singleVenue?.rating}/5
                </span>
              </span>
            </div>
            <p>{singleVenue.description}</p>

            <div className="my-3 flex items-center">
              <span className="ml-5 line-through text-white text-sm">
                Nok {singleVenue.price}
              </span>
            </div>

            <div className="m-auto my-5 flex items-center justify-between">
              <div className="text-primary text-sm">
                Nok <span className="text-xl">{singleVenue.price}</span>
              </div>

              <div className="self-right">
                <PrimaryButton label="Book" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleVenue;
