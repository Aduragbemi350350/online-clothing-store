import axios from "axios";
import { useState } from "react";
import Layout from "../Layout";

//product details that can be uploaded
interface ProductDetails {
  name: string;
  price: string;
  description: string;
  category: string;
}

export default function AddProduct() {
  const [files, setFiles] = useState<File[]>();

  const [productDetails, setProductDetails] = useState<ProductDetails>();

  const sendProduct = async () => {
    try {
      const form = new FormData();

      form.append("name", productDetails?.name!);
      form.append("price", productDetails?.price!);
      form.append("description", productDetails?.description!);
      form.append("category", productDetails?.category!);

      files?.map((file) => {
        return form.append("images", file);
      });

      const response = await axios.post(
        "http://localhost:3000/api/products",
        form,
        { withCredentials: true },
      );

      console.log({ "Create product response": response });
    } catch (error: any) {
      console.log({ "add product error": error.message });
    }
  };

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filesElement = e.currentTarget.elements.namedItem(
      "images",
    ) as HTMLInputElement;
    const files = filesElement.files;

    const nameElement = e.currentTarget.elements.namedItem(
      "name",
    ) as HTMLInputElement;
    const name = nameElement.value;

    const priceElement = e.currentTarget.elements.namedItem(
      "price",
    ) as HTMLInputElement;
    const price = priceElement.value;

    const descElement = e.currentTarget.elements.namedItem(
      "description",
    ) as HTMLTextAreaElement;
    const description = descElement.value;

    const categoryElement = e.currentTarget.elements.namedItem(
      "category",
    ) as HTMLSelectElement;
    const category = categoryElement.value;

    const product = {
      name,
      price,
      description,
      category,
    };

    setFiles(Array.from(files!));

    setProductDetails(product);

    console.log({ "product details": product });
    sendProduct();
  };
  return (
    <Layout>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-2xl px-4 py-8 lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new product
          </h2>
          <form onSubmit={handleAddProduct} encType="multipart/form-data">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="Type product name"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="$2999"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                >
                  <option defaultValue={""}>Select category</option>
                  <option value="ankara">Ankara</option>
                  <option value="tshirt">Tshirt</option>
                  <option value="jeans">Jeans</option>
                  <option value="hoodie">Hoodie</option>
                  <option value="jacket">Jacket</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={8}
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="Your description here"
                  name="description"
                ></textarea>
              </div>
              <div>
                <label
                  className="text-heading mb-2.5 block text-sm font-medium"
                  htmlFor="file_input"
                >
                  Upload Image
                </label>
                <input
                  className="bg-neutral-secondary-medium border-default-medium text-heading rounded-base focus:ring-brand focus:border-brand placeholder:text-body block w-full cursor-pointer border text-sm shadow-xs"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary-700 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mt-4 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 sm:mt-6"
            >
              Add product
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
