import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PrimaryButton } from "../Buttons";
import useAuthStore from "../../store/auth";
import { signInUrl } from "../../api";
import { HomeNav } from "../HomeNav";
import Alert from "../Alert";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address.")

      .matches(
        /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
        "Please enter a valid email address @stud.noroff.no"
      )
      .required("Please enter your email @stud.noroff.no."),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters.")
      .required("Please enter correct password."),
  })
  .required();
/**
 * SignInForm component handles user sign-in functionality.

 *
 * @export
 * @return {JSX.Element} The SignInForm component.
 */
export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const fetchSignIn = useAuthStore((state) => state.fetchSignIn);
  const { logInSuccess, isError } = useAuthStore();

  async function onSubmit(data) {
    reset();

    try {
      await fetchSignIn(signInUrl, data);
    } catch (error) {
      console.error("Error signing in:", error);
      useAuthStore.setState({ isError: true });
    }
  }
  function closeSuccessAlert() {
    window.location.href = "/profile";
  }
  function closeErrorAlert() {
    window.location.href = "/signin";
  }
  return (
    <div className="m-5">
      <HomeNav />
      <h1 className="text-center">Sign In</h1>
      {logInSuccess && (
        <Alert
          message="You are signed in successfully!"
          onClose={closeSuccessAlert}
        />
      )}
      {isError && (
        <Alert
          textColor="text-red"
          message="Wrong email or password. Please try again."
          onClose={closeErrorAlert}
        />
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
          <PrimaryButton label="Sign In" stylingCss="primaryButton" />
        </div>
      </form>
      <div className="text-center">
        <p className="mb-4">Don't have an account?</p>
        <a href="/register">
          <PrimaryButton label="Register" stylingCss="secondaryButton" />
        </a>
      </div>{" "}
    </div>
  );
}
