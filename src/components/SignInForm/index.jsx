import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimaryButton } from "../Buttons";
import { useState } from "react";
const schema = yup
  .object({
    fullName: yup
      .string()
      .min(3, "Your full name should be at least 3 characters.")
      .required("Please enter your first name."),
    subject: yup
      .string()
      .min(3, "Subject should be at least 3 characters.")
      .required("Please enter subject"),
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .required("Please enter your email."),
    body: yup
      .string()
      .min(3, "Your message should be at least 3 characters.")
      .required("Please enter your message."),
  })
  .required();
export function ContactForm() {
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
      <h1 className="text-center">Sign In</h1>
      {submitSuccess && (
        <p className="text-black bg-lightGreen p-1">
          Your message was sent successfully!
        </p>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col md:w-3/4 lg:w-1/2 content-center mx-auto items-center p-3 border-2 border-darkGreen rounded"
      >
        <div className="mb-4">
          <label htmlFor="fullName" className="font-semibold">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName")}
            className={`mt-1 p-2 text-black ${
              errors.fullName ? "error-border" : "border-red"
            } rounded w-full`}
            placeholder="John Smith"
          />
          <p className="text-primary">{errors.fullName?.message}</p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-gray-600 font-semibold"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            {...register("subject")}
            className={`mt-1 p-2 text-black ${
              errors.subject ? "error-border" : "border-gray-300"
            } rounded w-full`}
            placeholder="Your subject"
          />
          <p className="text-primary">{errors.subject?.message}</p>
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
              errors.email ? "error-border" : "border-gray-300"
            } rounded w-full`}
            placeholder="abc@mail.com"
          />
          <p className="text-primary">{errors.email?.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block font-semibold">
            Body
          </label>
          <textarea
            id="body"
            {...register("body")}
            className={`mt-1 p-2 text-black ${
              errors.body ? "error-border" : "border-gray-300"
            } rounded w-full`}
            placeholder="Your message goes here..."
          ></textarea>
          <p className="text-primary">{errors.body?.message}</p>
        </div>
        <div className="mt-4 text-center">
          <PrimaryButton label="Submit" />
        </div>
      </form>
    </div>
  );
}
