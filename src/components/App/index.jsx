import "./index.css";
import { Layout } from "../Layout";
import { Routes, Route } from "react-router-dom";
import { ContactForm } from "../SignInForm";
import { CartDetail } from "../CartDetail";
import CheckoutSuccess from "../CheckoutMessage";
import { VenuesList } from "../Venues";
import SingleVenue from "../Venues/Venue";

function HomePage() {
  return <VenuesList />;
}
function ContactPage() {
  return <ContactForm />;
}
function CheckoutPage() {
  return <CartDetail />;
}
function CheckoutSuccessPage() {
  return <CheckoutSuccess />;
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
          <Route path="contact" element={<ContactPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkoutSuccess" element={<CheckoutSuccessPage />} />
          <Route path=":id" element={<VenuePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
