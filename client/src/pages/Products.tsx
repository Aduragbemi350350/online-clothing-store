import React, { useEffect } from "react";
import { productsController } from "../../../redux/controllers/products";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { Link } from "react-router";

const Products = () => {
  const dispatch = useDispatch();

  const skeletonLoop = [1, 2, 3, 4, 5, 6, 7, 8];

  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    productsController(dispatch);
  }, [dispatch]);
  if (loading)
    return (
      <>
        {skeletonLoop.map(() => {
          <div className="bg-neutral-quaternary rounded-base flex h-48 w-full items-center justify-center sm:w-96">
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
              />
            </svg>
          </div>;
        })}
      </>
    );
  if (error) return <p className="mt-24">Error: {error}</p>;

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div className="group relative" key={product.name}>
                <Link to={`/${product.slug}`}>
                  <img
                    src={product.image}
                    alt="Front of men&#039;s Basic Tee in black."
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0"
                        ></span>
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.description}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
