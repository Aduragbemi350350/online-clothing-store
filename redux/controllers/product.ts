import axios from "axios";
import { AppDispatch } from "../store/store";
import {
  fetchProduct,
  fetchProductSuccess,
  fetchProductFailed,
  rateProduct,
  rateProductFailed,
} from "../store/slice/product";

const fetchProductController = async (dispatch: AppDispatch, slug: string) => {
  try {
    // console.log("Slug:", slug)
    //loading
    dispatch(fetchProduct());
    //send request to server
    const response = await axios.get(
      `http://localhost:3000/api/products/${slug}`
    );
    //receive data
    const data = response.data;

    // console.log("Data:", data)
    if (data) {
      dispatch(fetchProductSuccess(data));
    }

    if (!data) {
      return dispatch(
        fetchProductFailed(`The product with this slug:${slug} doesn't exist`)
      );
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    dispatch(fetchProductFailed(errorMessage));
  }
};

interface Rating {
  product: string;
  user: string;
  rating: number;
}

const productRatingController = async (
  dispatch: AppDispatch,
  review: Rating,
  slug: string
) => {
  try {
    //check if product has
    //update product review and fetch product
    await axios.post(
      `http://localhost:3000/api/reviews/`,
      review
    );

    const response = await axios.get(`http://localhost:3000/api/products/${slug}`);

    const data = response.data

    if (data) {
      dispatch(rateProduct(data));
    }

    if (!data) {
      return dispatch(rateProductFailed("Unknown error!"));
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "unknown error!";
    dispatch(rateProductFailed(errorMessage));
  }
};

export { fetchProductController, productRatingController };
