import { NavLink } from "react-router-dom";

export function HomeNav() {
  return (
    <div className="m-4 flex items-center text-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="#325249"
          d="M12 9.059V6.5a1.001 1.001 0 0 0-1.707-.708L4 12l6.293 6.207a.997.997 0 0 0 1.414 0A.999.999 0 0 0 12 17.5v-2.489c2.75.068 5.755.566 8 3.989v-1c0-4.633-3.5-8.443-8-8.941"
        />
      </svg>
      <div className="hover:bg-lightGreen px-1">
      <NavLink to="/" >Home</NavLink>

      </div>
    </div>
  );
}
