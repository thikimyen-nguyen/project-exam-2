import { useEffect, useState } from "react";
import logo from "./Holidaze-logo-ver.png";
import { Link, NavLink } from "react-router-dom";
import "./index.css";
import Alert from "../Alert";
import useProfileStore, {
  accessToken,
  currentUserName,
} from "../../store/profile";


export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignOut, setIsSignOut] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const { currentProfile, fetchSingleProfile, apiKey, fetchApiKey } =
    useProfileStore();
    useEffect(() => {
        if (accessToken) {
         fetchApiKey();

        }
      }, []);
  useEffect(() => {
    if (apiKey) {
      fetchSingleProfile(currentUserName, apiKey, accessToken);
    }
  }, [fetchSingleProfile, apiKey]);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  function signOutHandle() {
    localStorage.clear();
    setIsSignOut(true);
    handleVenueManagerClick(); 
  }
  
  function returnHome() {
    window.location.href = "/";
  }

  if (isSignOut) {
    return (
      <Alert message="You are signed out sucessfully!" onClose={returnHome} />
    );
  }
  
  
  const handleVenueManagerClick = () => {
    if (currentProfile?.venueManager === true) {
      setShowErrorAlert(false);
      window.location.href = "/admin";
    } else if (currentProfile?.venueManager === false) {
      setShowErrorAlert(true);
    } else if (!accessToken) {
      window.location.href = "/signin";
    }
  };
  
  function closeErrorAlert() {
    setShowErrorAlert(false);
    window.location.href = "/profile";
  }
  return (
    <header className="text-black sticky top-0 z-20 bg-white">
      <div className="flex justify-between items-center">
        <Link to="/" className="self-center">
          <img src={logo} alt="Holidaze Logo" className="size-24" />
        </Link>
        <div className="flex">
          <nav className="mr-4 text-darkGreen font-semibold">
            <ul className=" flex items-center">
            <li className="text-lg hover:bg-lightGreen border border-primary px-2">
                    <NavLink onClick={handleVenueManagerClick}>
                      Manage Venues
                    </NavLink>
                  </li>
             
              {showErrorAlert && (
                <Alert
                  textColor="text-red"
                  message="Please update your profile as Venue Manager!"
                  onClose={closeErrorAlert}
                />
              )}
              <li className="text-xl hover:bg-lightGreen ml-5 flex items-center">
                <NavLink onClick={toggleMenu}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 28 28"
                  >
                    <path
                      fill="#325249"
                      d="M23.83 18A3 3 0 0 0 21 16H7a3 3 0 0 0-3 3v.715C4 23.433 8.21 26 14 26c3.062 0 5.682-.757 7.471-2H14v-1h8.634c.427-.461.763-.964.995-1.5H14v-1h9.93a4.5 4.5 0 0 0 .07-.785V19H14v-1zM20 8q0-.381-.046-.75H14v-1h5.74a6 6 0 0 0-.696-1.5H14v-1h4.235a6 6 0 1 0 0 8.5H14v-1h5.044c.298-.46.534-.964.697-1.5H14v-1h5.954Q20 8.381 20 8"
                    />
                  </svg>
                </NavLink>
                {currentUserName && <p>{currentUserName}</p>}
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {isOpen && (
        <nav className="bg-white border-2 rounded border-darkGreen p-4 w-fit fixed right-4 text-end">
          <div
            className="flex items-center cursor-pointer hover:bg-lightGreen"
            onClick={closeMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="#325249"
                d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496"
              />
            </svg>
            <p className="text-sm">Close</p>
          </div>
          {!currentUserName ? (
            <ul id="navbar">
              <li className="p-4 text-xl hover:bg-lightGreen">
                <NavLink to="/signin" onClick={closeMenu}>
                  Sign In
                </NavLink>
              </li>
              <li className="p-4 text-xl hover:bg-lightGreen">
                <NavLink to="/register" onClick={closeMenu}>
                  Register
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul id="navbar">
              <li className="p-4 text-xl hover:bg-lightGreen">
                <NavLink to="/profile" onClick={closeMenu}>
                  Profile
                </NavLink>
              </li>
              <li
                className="p-4 text-xl hover:bg-lightGreen cursor-pointer"
                onClick={signOutHandle}
              >
                Sign Out
              </li>
            </ul>
          )}
        </nav>
      )}
    </header>
  );
}
