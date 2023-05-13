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
import { getSuppliers } from "../context/supplier/SupplierActions";
import { newPurchase } from "../context/purchase/PurchaseActions";

const Purchases = () => {
  const [products, setProducts] = useState(null);
  const [id, setID] = useState(null);
  const [prevQuantity, setPrevQuantity] = useState(null);
  const [formData, setFormData] = useState({
    // supplier: "",
    name: "",
    sku: "",
    price: null,
    Quantity: null,
  });
  const [suppliers, setSuppliers] = useState(null);

  const { state } = useContext(UserContext);
  // const { productDispatch } = useContext(ProductContext);

  const handleSkuChange = async () => {
    let sku = document.getElementById("sku");
    var selectedOption = sku.options[sku.selectedIndex];
    var productID = selectedOption.value;
    setID(productID);
    const item = products.filter((item) => item._id === productID);
    console.log("item =", item);
    console.log("item quantity", item[0].Quantity);
    setPrevQuantity(item[0].Quantity);
    setFormData(item[0]);
  };
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const totalAmnt = formData.Quantity * formData.price;

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProdct(state.user.token);
      console.log("data", data);
      setProducts(data.products);
      // productDispatch({ type: "GET_PRODUCTS", payload: data });
    };
    const fetchSuppliers = async () => {
      const data = await getSuppliers(state.user.token);
      console.log("sData", data.message);
      setSuppliers(data.message);
    };
    console.log("Form", formData);
    fetchProducts();
    fetchSuppliers();
  }, []);

  const pName = formData.name;
  const pSku = formData.sku;
  const quantity = formData.Quantity;
  const costPrice = formData.price;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const x = document.getElementById("supplier");
      var sl_ID = x.options[x.selectedIndex].value;
      console.log(sl_ID);
      const data = { sl_ID, pName, pSku, quantity, costPrice, totalAmnt };
      console.log(data);
      const response = await newPurchase(data, state.user.token);
      console.log(response);
      toast.success("Product updated succesfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <AdminSlider />
      <div class="p-2 sm:ml-64 ">
        <div className="relative flex flex-col justify-center shadow-slate-500 overflow-hidden ">
          <div className="w-full mt-24  p-6 m-auto bg-white rounded-md shadow-lg lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-blue-900 ">
              Purchases
            </h1>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  for="supplier"
                  className="block text-sm font-semibold text-blue-900"
                >
                  Select Suplier
                </label>
                <select
                  type="text"
                  name="supplier"
                  id="supplier"
                  className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={handleChange}
                >
                  <option>Supplier</option>
                  {suppliers &&
                    suppliers.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-2">
                <label
                  for="sku"
                  className="block text-sm font-semibold text-blue-900"
                >
                  Select Sku
                </label>
                <select
                  type="string"
                  name="sku"
                  id="sku"
                  className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                  className="block text-sm font-semibold text-blue-900"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label
                  for="Quantity"
                  className="block text-sm font-semibold text-blue-900"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="Quantity"
                  id="Quantity"
                  value={formData.Quantity}
                  className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label
                  for="totalAmnt"
                  className="block text-sm font-semibold text-blue-900"
                >
                  Total
                </label>
                <input
                  type="number"
                  name="totalAmnt"
                  id="totalAmnt"
                  value={totalAmnt}
                  className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  // onChange={handleChange}
                />
              </div>

              <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600">
                  Purchase
                </button>
              </div>
            </form>

            <p className="mt-8 text-xs font-light text-center text-sky-700">
              {" "}
              New Product?{" "}
              <Link
                to="/admin/"
                className="font-medium text-sky-600 hover:underline"
              >
                Add Product
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Purchases;
