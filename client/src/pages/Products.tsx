import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { Link } from "react-router";
import fetchProductsThunk from "../../redux/store/thunks/products";
import { ErrorPage } from "./ErrorPages";
import Layout from "../Layout";

//import router, route, path

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  //default - products
  let availableProducts;
  console.log({ availProducts: products });
  if (products.length > 0) {
    availableProducts = products.map((product) => (
      <div key={product._id} className="group relative">
        <Link to={`/${product.slug}`}>
          <img
            src={product.image}
            alt="Front of men&#039;s Basic Tee in black."
            className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
          />
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <span aria-hidden="true" className="absolute inset-0"></span>
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {product.description}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-900">{product.price}</p>
          </div>
        </Link>
      </div>
    ));
  }
  //pre-loader
  let preloader = [];
  for (let i = 0; i < 8; i++) {
    preloader.push(
      <div
        className="flex h-60 animate-pulse items-center justify-center bg-neutral-200"
        key={i}
      >
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
      </div>,
    );
  }

  //RETURNS
  //RETURNS
  //RETURNS

  //loading
  if (loading)
    return (
      <Layout>
        <section className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {preloader}
            </div>
          </div>
        </section>
      </Layout>
    );

  //error
  console.log({ productsError: error });
  if (error) {
    return <ErrorPage error={error} />;
  }

  //products
  return (
    <Layout>
      <section className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {availableProducts}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
