import React, { Fragment, useState, useContext, useEffect } from "react";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Utable from "./Utable";
import AdminSlider from "./AdminSlider";
import { UserContext } from "../context/user/UserContext";
import {
  createSupplier,
  getSuppliers,
} from "../context/supplier/SupplierActions";
import { toast } from "react-toastify";

const Suppliers = () => {
  const { state } = useContext(UserContext);
  const [suppliers, setSuppliers] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    p_No: null,
    address: "",
  });
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const { name, p_No, address } = formData;
  useEffect(() => {
    const fetchSuppliers = async () => {
      console.log("fetch");
      const data = await getSuppliers(state.user.token);
      console.log(data);
      setSuppliers(data);
    };
    fetchSuppliers();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const slData = { name, p_No, address };

      const data = await createSupplier(slData, state.user.token);
      console.log(data);
      setSuppliers([...suppliers, data]);

      toast.success("Registered Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  // const product = [
  //   {
  //     sku: "Desi Potato",
  //     price: 20,
  //     qp: "kg",
  //     stock: 100,
  //     pic: "https://i.ibb.co/bJ6tKqh/stretched-1920-1080-888979.jpg",
  //   },
  //   {
  //     sku: "Orange Carrot",
  //     price: 20,
  //     qp: "kg",
  //     stock: 100,
  //     pic: "https://i.ibb.co/bJ6tKqh/stretched-1920-1080-888979.jpg",
  //   },
  //   {
  //     sku: "Fresh Pea",
  //     price: 20,
  //     qp: "kg",
  //     stock: 100,
  //     pic: "https://i.ibb.co/bJ6tKqh/stretched-1920-1080-888979.jpg",
  //   },
  //   {
  //     sku: "Pahadi Chilli",
  //     price: 20,
  //     qp: "kg",
  //     stock: 100,
  //     pic: "https://i.ibb.co/bJ6tKqh/stretched-1920-1080-888979.jpg",
  //   },
  // ];
  return (
    <Fragment>
      <AdminSlider />
      <div class="p-2 sm:ml-64 ">
        <div className="mb-[10rem] p-1">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl mt-20">Suppliers</h1>
          </div>
          <div className="overflow-x-auto w-full mt-[1rem]">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Supplier ID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {suppliers &&
                  suppliers?.map((item) => (
                    <tr>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-bold">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {item.p_No}
                        <br />
                      </td>
                      <td>{address}</td>
                      <th>
                        <Link to="/edit-product/:productId">
                          <button
                            className="btn btn-ghost btn-xs"
                            data-te-toggle="tooltip"
                            data-te-placement="bottom"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            title="Edit"
                          >
                            <FaRegEdit className="h-[18px] w-[18px]" />
                          </button>
                        </Link>
                        <button
                          className="btn btn-ghost btn-xs ml-[0.5rem]"
                          data-te-toggle="tooltip"
                          data-te-placement="bottom"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          title="Delete"
                        >
                          <FaTrash className="h-[18px] w-[18px]" />
                        </button>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div>
            {/* The button to open modal */}
            <label htmlFor="my-modal-4" className="btn">
              Add new supplier
            </label>
          </div>
        </div>
      </div>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-4"
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
                Name
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
                for="p_No"
                className="block text-sm font-semibold text-gray-800"
              >
                Contact
              </label>
              <input
                type="number"
                name="p_No"
                id="p_No"
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2">
              <label
                for="address"
                className="block text-sm font-semibold text-gray-800"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-sky-900 rounded-md hover:bg-sky-700 focus:outline-none focus:bg-sky-100"
              >
                Add Supplier
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Suppliers;
