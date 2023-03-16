import { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../src/context/user/UserContext";
import { ProductContext } from "../../src/context/product/ProductContext";
import {
  //   addProduct,
  getProdct,
  updateProdct,
} from "../../src/context/product/ProductActions";

const EditProduct = () => {
  const { state } = useContext(UserContext);
  const { productDispatch } = useContext(ProductContext);
  const [editFormData, setEditFormData] = useState({
    _id: "",
    name: "",
    sku: "",
    price: 0,
    Quantity: 0,
  });

  const handleEditChange = (e) => {
    setEditFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const { _id, eName, eSku, price, Quantity } = editFormData;
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      let editData = new FormData();
      // formData.append("name", name);
      // formData.append("sku", sku);
      editData.append("price", price);
      editData.append("Quantity", Quantity);
      // formData.append("image", image);

      const response = await updateProdct(
        _id,
        editData,
        state.user.token,
        state.user.role
      );
      console.log({ response });
      productDispatch({ type: "UPDATE_PRODUCT", payload: response });
      productDispatch({ type: "GET_PRODUCTS" });
      document.getElementById("my-modal-2").checked = false;
      toast.success("Product Updated Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Fragment>
      {/* modal for editing */}
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-2"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form className="mt-6" onSubmit={handleEditSubmit}>
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
                onChange={handleEditChange}
                value={editFormData.name}
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
                onChange={handleEditChange}
                value={editFormData.sku}
                required
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                for="price"
                className="block text-sm font-semibold text-gray-800"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                onChange={handleEditChange}
                required
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2">
              <label
                for="Quantity"
                className="block text-sm font-semibold text-gray-800"
              >
                Quantity
              </label>
              <input
                type="number"
                name="Quantity"
                id="Quantity"
                onChange={handleEditChange}
                required
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            {/* <div className="mb-2 mt">
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
            </div> */}

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                Edit Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProduct;
