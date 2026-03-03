import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import fetchProductsThunk from "../../redux/store/thunks/products";
import { AppDispatch } from "../../redux/store/store";

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();

  // category
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState("");
  //price
  const [openPrice, setOpenPrice] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [query, setQuery] = useState("");

  //handle query search and filtering
  const makeQuery = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //create query params
    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (query) params.append("query", query);
    if (minPrice) params.append("minPrice", String(minPrice));
    if (maxPrice) params.append("maxPrice", String(maxPrice));

    const url = `http://localhost:3000/api/products?${params}`;

    //dispatch query
    dispatch(fetchProductsThunk(url));
  };

  if (minPrice || maxPrice || category) {
    console.log({
      mess: "A category has been provided",
      minPrice,
      maxPrice,
      query,
      category,
    });
  }

  // get elements
  const categoryRef = useRef<SVGSVGElement>(null);
  const priceRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleWindowClick = (e: Event) => {
      //close all opened tab
      if (
        categoryRef.current &&
        categoryRef.current !== e.target &&
        openCategory
      ) {
        setOpenCategory(false);
      } else if (
        priceRef.current &&
        priceRef.current !== e.target &&
        openPrice
      ) {
        setOpenPrice(false);
      }
    };

    window.addEventListener("click", handleWindowClick);

    return () => window.removeEventListener("click", handleWindowClick);
  }, [openCategory, openPrice]);

  return (
    <section>
      <form className="flex pt-26">
        <div className="mx-16 flex w-full flex-col justify-center gap-y-1 md:flex-row">
          {/* category */}
          <div className="jusify-center relative flex items-center gap-x-2 border border-gray-400 px-6 py-3 md:rounded-l-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
            <button
              type="button"
              className="flex items-center justify-center gap-2"
            >
              Category
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
                ref={categoryRef}
                onClick={() => setOpenCategory((state) => !state)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            {/* dropdown */}
            <ul
              className={
                openCategory
                  ? "absolute z-1 mt-42 rounded-xl border border-gray-400 bg-white px-8 py-2"
                  : "absolute z-1 mt-38 hidden rounded-xl border border-gray-400 bg-white px-8 py-2"
              }
            >
              <li onClick={() => setCategory("ankara")}>Ankara</li>
              <li onClick={() => setCategory("tshirt")} className="py-2">
                Tshirt
              </li>
              <li onClick={() => setCategory("jeans")}>Jeans</li>
            </ul>
          </div>

          {/* price */}
          <div className="jusify-center relative flex items-center gap-x-2 border border-gray-400 px-6 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <button
              type="button"
              className="flex items-center justify-center gap-2"
            >
              Price
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
                ref={priceRef}
                onClick={() => setOpenPrice((state) => !state)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            {/* dropdown */}
            <div
              className={
                openPrice
                  ? "absolute z-1 mt-30 flex justify-center rounded-lg border border-gray-400 bg-white p-4"
                  : "absolute z-1 mt-30 flex hidden justify-center rounded-lg border border-gray-400 bg-white p-4"
              }
            >
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <input
                  type="number"
                  placeholder="min"
                  className="max-w-20 ps-2 focus:outline-none"
                  onChange={(e) => setMinPrice(Number(e.currentTarget.value))}
                />
              </div>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <input
                  type="number"
                  placeholder="max"
                  className="max-w-20 ps-2 focus:outline-none"
                  onChange={(e) => setMaxPrice(Number(e.currentTarget.value))}
                />
              </div>
            </div>
          </div>

          <input
            className="border border-gray-400 py-3 ps-4 pe-8 focus:outline-none"
            type="search"
            placeholder="Product name, description ..."
            onChange={(e) => setQuery(e.currentTarget.value)}
          />

          <div className="jusify-center flex items-center gap-x-2 border border-gray-400 px-6 py-3 md:rounded-e-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <button type="submit" onClick={makeQuery}>
              Search
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
