import React from "react";
import { Link } from "react-router";
import axios from "axios";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import fetchUserThunk from "../../redux/store/thunks/user";

export default function Signin() {
  const dispatch = useDispatch<AppDispatch>();
  // const [user, setuser] = useState<any>();

  async function signin(user: any) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        user,
        { withCredentials: true },
      );

      console.log({ "fetch user": response.data });

      //update user state
      dispatch(fetchUserThunk());
      console.log("Fetching user...")
      
    } catch (error: any) {
      console.log({ "fetch user error": error.message });
    }
  }

  const handleSignin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = e.currentTarget.elements.namedItem(
      "email",
    ) as HTMLInputElement;
    const password = e.currentTarget.elements.namedItem(
      "password",
    ) as HTMLInputElement;
    const user = {
      email: email.value,
      password: password.value,
    };

    signin(user);

    // setuser(user);
    console.log({ user: user });
  };
  return (
    <Layout>
      <section className="mt-10 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <h3 className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
            Sign In
          </h3>
          <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSignin}>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="confirm-password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 focus:outline-none"
                >
                  Sign In
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link to="/signup">
                    <span className="text-primary-600 dark:text-primary-500 font-medium hover:underline">
                      Sign Up
                    </span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
