import axios from "axios";
import { AppDispatch } from "../store/store";
import {
    fetchProductsFail,
  fetchProductsStart,
  fetchProductsSuccess,
} from "../store/slice/products";


const productsController = async (dispatch: AppDispatch) => {
  try {
    //start loading
    dispatch(fetchProductsStart());

    const response = await axios.get("http://localhost:3000/api/products");
    const products = response.data;
    
    //get data and dispatch
    if (products) {
      dispatch(fetchProductsSuccess(products));
    }
  } catch (error: any) {
    dispatch(fetchProductsFail(error.message));
    console.log(error);
  }
};

export { productsController };
