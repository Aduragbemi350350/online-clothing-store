import Layout from "../Layout";

interface Error {
  name: string;
  message: string;
  status: number;
}
export const ErrorPage = ({ error: { message, status } }: { error: Error }) => {
  return (
    <Layout>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
              {status}
            </h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
              {message}
            </p>
            {/* <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              We are already working to solve the problem.{" "}
            </p> */}
          </div>
        </div>
      </section>
    </Layout>
  );
};
