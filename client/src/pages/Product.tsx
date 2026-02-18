import Layout from "../Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppDispatch, RootState } from "../../redux/store/store";

//local import
import Comments from "../components/Comments";
import axios from "axios";
import fetchProductThunk from "../../redux/store/thunks/product";
import { fetchCommentsThunk } from "../../redux/store/thunks/comment";
import { ErrorPage } from "./ErrorPages";

const Product = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { slug } = useParams<string>();

  //Product state
  const { product, loading, error } = useSelector(
    (state: RootState) => state.product,
  );

  //Use effect
  useEffect(() => {
    dispatch(fetchProductThunk(slug!));
    dispatch(fetchCommentsThunk());
  }, [dispatch]);

  //send comment
  async function sendComment(comment: any) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/comments/",
        comment,
        { withCredentials: true },
      );
      console.log({ response: res });
    } catch (error: any) {
      console.log({ mess: error.message });
    }
  }

  //make comment
  const makeCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //get the comment
    const commentTextArea = e.currentTarget.elements.namedItem(
      "comment",
    ) as HTMLTextAreaElement;

    const comment = {
      product: product?._id,
      text: commentTextArea.value,
    };

    console.log("User comment obj", comment);

    //set comment
    // setComment(comment);

    //empty the text area
    commentTextArea.value = "";

    //send the post request
    sendComment(comment);
  };

  //RETURNS
  //RETURNS
  //RETURNS

  //Loading
  if (loading) {
    return (
      <Layout>
        <section className="body-font overflow-hidden text-gray-600">
          <div className="container mx-auto px-5 py-24">
            <div className="mx-auto flex flex-wrap lg:w-4/5">
              <div className="rounded-base flex h-48 w-full animate-pulse items-center justify-center bg-neutral-200 sm:w-96">
                <svg
                  className="text-fg-disabled h-11 w-11"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                  />
                </svg>
              </div>
              <div className="mt-6 w-full animate-pulse lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
                <div className="mb-4 h-2.5 w-48 rounded-full bg-neutral-200"></div>
                <div className="mb-2.5 h-2 max-w-[480px] rounded-full bg-neutral-200"></div>
                <div className="mb-2.5 h-2 rounded-full bg-neutral-200"></div>
                <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-neutral-200"></div>
                <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-neutral-200"></div>
                <div className="h-2 max-w-[360px] rounded-full bg-neutral-200"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  //Error
  console.log({ productError: error });
  if (error) {
    return <ErrorPage error={error} />;
  }

  //Product
  return (
    <Layout>
      <section className="body-font overflow-hidden text-gray-600">
        <div className="container mx-auto px-5 py-24">
          <div className="mx-auto flex flex-wrap lg:w-4/5">
            <img
              alt="ecommerce"
              className="h-64 w-full rounded object-cover object-center lg:h-auto lg:w-1/2"
              src={product?.image[0].secureURL}
            />
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h2 className="title-font text-sm tracking-widest text-gray-500">
                BRAND NAME
              </h2>
              <h1 className="title-font mb-1 text-3xl font-medium text-gray-900">
                {product?.name}
              </h1>
              <div className="mb-4 flex">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="ml-3 text-gray-600">4 Reviews</span>
                </span>
                <span className="space-x-2s ml-3 flex border-l-2 border-gray-200 py-2 pl-3">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product?.description}</p>
              <div className="mt-6 mb-5 flex items-center border-b-2 border-gray-100 pb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="h-6 w-6 rounded-full border-2 border-gray-300 focus:outline-none"></button>
                  <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-gray-700 focus:outline-none"></button>
                  <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-indigo-500 focus:outline-none"></button>
                </div>
                <div className="ml-6 flex items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="appearance-none rounded border border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="pointer-events-none absolute top-0 right-0 flex h-full w-10 items-center justify-center text-center text-gray-600">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font text-2xl font-medium text-gray-900">
                  {product?.price}
                </span>
                <button className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-0 bg-gray-200 p-0 text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Give comment */}
        <div className="bg-white py-8 antialiased lg:py-16 dark:bg-gray-900">
          <div className="mx-auto max-w-2xl px-4">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 lg:text-2xl dark:text-white">
                Discussion (20)
              </h2>
            </div>
            <form className="mb-6" onSubmit={makeCommentHandler}>
              <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={6}
                  className="w-full border-0 px-0 text-sm text-gray-900 focus:ring-0 focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write a comment..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-primary-700 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 inline-flex items-center rounded-lg px-4 py-2.5 text-center text-xs font-medium text-white focus:ring-4"
              >
                Post comment
              </button>
            </form>
          </div>
        </div>

        {/* See comments*/}
        <Comments product={product!} />
      </section>
    </Layout>
  );
};

export default Product;
