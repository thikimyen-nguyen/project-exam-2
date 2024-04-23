import "./index.css";
import { Layout } from "../Layout";
import { Routes, Route } from "react-router-dom";
import {  SignInForm } from "../SignInForm";
import {  RegisterForm } from "../RegisterForm";
import { VenuesList } from "../Venues";
import SingleVenue from "../Venues/Venue";
import ManageVenues from "../ManageVenues";

function HomePage() {
  return <VenuesList />;
}
function SignInPage() {
  return <SignInForm />;
}
function RegisterPage() {
  return <RegisterForm />;
}
function AdminPage() {
  return <ManageVenues />;
}
function VenuePage() {
  return <SingleVenue />;
}

function App() {
  return (
    <div className="bg-gray">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path=":id" element={<VenuePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
