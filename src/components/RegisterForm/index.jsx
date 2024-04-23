import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { useState } from "react";

function validateEmailDomain(email) {
  return email.endsWith("@stud.noroff.no");
}

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .test(
        "valid-domain",
        "Please enter your email @stud.noroff.no.",
        validateEmailDomain
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
  function onSubmit(data) {
    console.log(data);
    reset();

    setSubmitSuccess(true);
  }

  return (
    <div className="m-5">
      <h1 className="text-center">Register New Account</h1>
      {submitSuccess && (
        <p className="text-black bg-lightGreen p-1">
          Your message was sent successfully!
        </p>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col md:w-3/4 lg:w-1/2 content-center mx-auto items-center p-3 "
      >
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
