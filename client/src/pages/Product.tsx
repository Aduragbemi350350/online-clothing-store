import Layout from "../Layout";
import { useEffect } from "react";
import { useDispatch, useSelector, UseSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../../redux/store/store";

//local import
import {
  fetchProductController,
  productRatingController,
} from "../../../redux/controllers/product";
import Comments from "../components/Comments";

const Product = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  //Product state
  const { product, loading, error } = useSelector(
    (state: RootState) => state.product,
  );
  //Product Review State
  // const productReviews = product?.reviews.flatMap((review) => review.comments)
  // const productComments : string[] = []

  // productReviews?.forEach((Comment)=>{
  //   productComments.push(Comment)
  // })






  // console.log(productReviews)


  // const rateProductHandler = ()=>{
  //   productRatingController(dispatch, {
  //     product: "69095eb9c7852594b8f17ec2",
  //     user: "69094b43977779bf9ae8f600",
  //     rating: 10
  //   })
  // }


  useEffect(() => {
    fetchProductController(dispatch, slug!);
  }, [dispatch]);
  if (loading) return <p className="mt-24">Loading...</p>;
  if (error) return <p className="mt-24">Error: {error}</p>;
  return (
    <>
      <Layout>
        <section className="body-font overflow-hidden text-gray-600">
          <div className="container mx-auto px-5 py-24">
            <div className="mx-auto flex flex-wrap lg:w-4/5">
              <img
                alt="ecommerce"
                className="h-64 w-full rounded object-cover object-center lg:h-auto lg:w-1/2"
                src={product?.image}
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
                  <button className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-0 bg-gray-200 p-0 text-gray-500"
                  onClick={()=>{
                    productRatingController(dispatch, {
                      product: `${product?._id}`,
                      user: `${product?.createdBy}`,
                      rating: 4,
                    }, `${product?.slug}`)
                  }}>
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
          <Comments />
        </section>
      </Layout>
    </>
  );
};

export default Product;
