import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSlider from "./AdminSlider";
import Table from "./Table";
import { toast } from "react-toastify";
import { UserContext } from "../../src/context/user/UserContext";
import { ProductContext } from "../../src/context/product/ProductContext";
import {
  addProduct,
  getProdct,
  // updateProdct,
} from "../../src/context/product/ProductActions";

const Inventory = () => {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    qParam: "",
  });

  const [image, setImgFile] = useState(null);
  const { state } = useContext(UserContext);
  const { productDispatch } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImgFile(event.target.files[0]);
    }
  };

  const { name, sku, category, qParam } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("sku", sku);
      formData.append("category", category);
      formData.append("q_Param", qParam);
      formData.append("image", image);

      const response = await addProduct(formData, state.user.token);
      console.log({ response });
      productDispatch({ type: "CREATE_PRODUCT", payload: response });
      setProducts([...products, response.prodct]);
      // productDispatch({ type: "GET_PRODUCTS" });
      document.getElementById("my-modal-1").checked = false;
      if (response.success) {
        toast.success("Product Added Successfully");
      } else {
        toast.error(response.error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProdct(state.user.token);
      console.log("data", data);
      setProducts(data.products);

      productDispatch({ type: "GET_PRODUCTS", payload: data });
    };
    fetchProducts();
  }, [productDispatch, state.user.token]);

  return (
    <Fragment>
      <AdminSlider />

      <div class="p-2 sm:ml-64 ">
        <div className="mb-[10rem] p-1">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl mt-20">Inventory Panel</h1>
          </div>
          <div className="overflow-x-auto w-full mt-[1rem]">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((item) => (
                    <Table
                      item={item}
                      key={item._id}
                      // setEditFormData={setEditFormData}
                    />
                  ))}
              </tbody>
            </table>
          </div>
          <div>
            {/* The button to open modal */}
            <label htmlFor="my-modal-1" className="btn">
              Add Product
            </label>
          </div>
        </div>
      </div>

      {/* modal for adding the product */}
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-1" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-1"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                for="name"
                className="block text-sm font-semibold text-gray-800"
              >
                Product Name
              </label>
              <input
                type="name"
                name="name"
                id="name"
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                for="sku"
                className="block text-sm font-semibold text-gray-800"
              >
                Sku
              </label>
              <input
                type="text"
                name="sku"
                id="sku"
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                for="category"
                className="block text-sm font-semibold text-gray-800"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2">
              <label
                for="qParam"
                className="block text-sm font-semibold text-gray-800"
              >
                Quantity Parameter
              </label>
              <input
                type="text"
                name="qParam"
                id="qParam"
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2 mt">
              <label
                for="image"
                className="block text-sm font-semibold text-gray-800"
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={onImageChange}
                required
                className="file-input file-input-bordered w-full max-w-xs sm:max-w-[30rem] my-3"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-green-600"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Inventory;
