import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { useState } from "react";
import SuccessAlert from "../SuccessAlert";
import useVenuesStore from "../../store/venues";
import { registerUrl } from "../../api";

const schema = yup
  .object({
    name: yup
      .string()
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username must not contain punctuation symbols apart from underscore (_)."
      )
      .required("Please enter your username."),
    email: yup
      .string()
      .email("Please enter a valid email address.")

      .matches(
        /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
        "Please enter a valid email address with @stud.noroff.no domain."
      )
      .required("Please enter your email @stud.noroff.no."),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters.")
      .required("Please enter correct password."),
  })
  .required();
export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fetchRegisterAccount = useVenuesStore(state => state.fetchRegisterAccount); 

  async function onSubmit(data) {
    console.log(data);
    reset();

    try {
      await fetchRegisterAccount(registerUrl, data); 
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error registering account:", error);
    }
  }
  function closeAlert() {
    setSubmitSuccess(false);
    window.location.href = '/signin'; 
  }
  return (
    <div className="m-5">
      <h1 className="text-center">Register New Account</h1>
      {submitSuccess && (
        <SuccessAlert message="Your account was registered successfully! Please Sign In." onClose={closeAlert} />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col md:w-3/4 lg:w-1/2 content-center mx-auto items-center p-3 "
      >
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold">
            Username
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={`mt-1 p-2 text-black ${
              errors.name? "error-border" : "border-primary"
            } rounded w-full`}
            placeholder="Your username"
          />
          <p className="text-red">{errors.name?.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`mt-1 p-2 text-black ${
              errors.email ? "error-border" : "border-primary"
            } rounded w-full`}
            placeholder="abc@stud.noroff.no"
          />
          <p className="text-red">{errors.email?.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className={`mt-1 p-2 text-black ${
              errors.password ? "error-border" : "border-primary"
            } rounded w-full`}
            placeholder="Your password"
          ></input>
          <p className="text-red">{errors.password?.message}</p>
        </div>
        <div className="mt-4 text-center">
          <PrimaryButton label="Register" />
        </div>
      </form>
      <div className="text-center">
        <p className="mb-4">Already have an account?</p>
        <a href="/signin">
          <SecondaryButton label="Sign In" />
        </a>
      </div>
    </div>
  );
}
