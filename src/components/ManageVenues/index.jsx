import { Link } from "react-router-dom"
import { PrimaryButton } from "../Buttons"


function ManageVenues() {
  return (
    <div className="text-center">
        <h1>CHECKOUT SUCCESSFULLY!</h1>
        <p className="my-8">Thank you for your purchase. We send a confirmation to your email.</p>
        <Link to='/'><PrimaryButton label='Shop More' /></Link>
    </div>
  )
}

export default ManageVenues
