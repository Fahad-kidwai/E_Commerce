import { Fragment, useState, useContext, useEffect } from "react";
import { UserContext } from "../context/user/UserContext";
import {
  getProdct,
  getProdctDetails,
  updateProdct,
} from "../context/product/ProductActions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminSlider from "./AdminSlider";
import { ProductContext } from "../context/product/ProductContext";

const Purchases = () => {
  const [products, setProducts] = useState(null);
  const [id, setID] = useState(null);
  const [prevQuantity, setPrevQuantity] = useState(null);
  const [formData, setFormData] = useState({
    price: null,
    Quantity: null,
  });

  const { state } = useContext(UserContext);
  const { productDispatch } = useContext(ProductContext);

  const handleSkuChange = async () => {
    let sku = document.getElementById("sku");
    var selectedOption = sku.options[sku.selectedIndex];
    var productID = selectedOption.value;
    setID(productID);
    const data = await getProdctDetails(productID, state.user.token);
    console.log("data", data);
    setPrevQuantity(data.products.Quantity);
    setFormData(data.products);

    productDispatch({ type: "GET_PRODUCT", payload: data });
  };
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProdct(state.user.token);
      console.log("data", data);
      setProducts(data.products);

      productDispatch({ type: "GET_PRODUCTS", payload: data });
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.Quantity = parseInt(formData.Quantity) + parseInt(prevQuantity);
      console.log(formData);
      const response = await updateProdct(id, formData, state.user.token);
      console.log("response", response);
      productDispatch({ type: "UPDATE_PRODUCT", payload: response });

      // navigate("/");
      toast.success("Product updated succesfully");
      //   document.getElementById("price").innerHTML = null;
      //   document.getElementById("Quantity").innerHTML = null;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <AdminSlider />
      <div className="relative flex flex-col justify-center overflow-hidden sm:ml-36">
        <div className="w-full mt-24  p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-green-700 ">
            Purchases
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                for="sku"
                className="block text-sm font-semibold text-gray-800"
              >
                Select Sku
              </label>
              <select
                type="string"
                name="sku"
                id="sku"
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleSkuChange}
              >
                <option>Sku</option>
                {products &&
                  products.map((item) => (
                    <option key={item.sku} value={item._id}>
                      {item.sku}
                    </option>
                  ))}
              </select>
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
                value={formData.price}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleChange}
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
                value={formData.Quantity}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleChange}
              />
            </div>

            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
                Purchase
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            New Product?{" "}
            <Link
              to="/admin/"
              className="font-medium text-green-600 hover:underline"
            >
              Add Product
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Purchases;
