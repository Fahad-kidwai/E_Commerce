// import { Link } from "react-router-dom";
import { useContext } from "react";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { Buffer } from "buffer";
import { deleteProdct } from "../context/product/ProductActions";
import { UserContext } from "../context/user/UserContext";
import { toast } from "react-toastify";

const Table = ({ item, setEditFormData }) => {
  const { state } = useContext(UserContext);

  if (!item) {
    return;
  }
  let q = 0;
  if (item.Quantity) {
    q = item.Quantity;
  }
  let totalStock = q + " " + item.qParam;
  const openEditModal = async (element) => {
    document.getElementById("my-modal-2").checked = true;

    setEditFormData(element);
    console.log("e from edit button", element);
  };
  const deleteItem = async (id) => {
    const response = await deleteProdct(id, state.user.token);
    toast.success(response);
  };
  // setFormData(item) add it in afunction
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={item.image && item.image.secure_url}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{item.sku}</div>
          </div>
        </div>
      </td>
      <td>
        {item.costPrice}
        <br />
        {/* <span className="badge badge-ghost badge-sm">
                Desktop Support Technician
              </span> */}
      </td>
      <td>
        {item.price}
        <br />
        {/* <span className="badge badge-ghost badge-sm">
                Desktop Support Technician
              </span> */}
      </td>
      <td>{totalStock}</td>
      <th>
        <button
          className="btn btn-ghost btn-xs"
          data-te-toggle="tooltip"
          data-te-placement="bottom"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={() => openEditModal(item)}
          title="Edit"
        >
          <FaRegEdit className="h-[18px] w-[18px]" />
        </button>

        <button
          className="btn btn-ghost btn-xs ml-[0.5rem]"
          data-te-toggle="tooltip"
          data-te-placement="bottom"
          data-te-ripple-init
          data-te-ripple-color="light"
          title="Delete"
          onClick={() => deleteItem(item._id)}
        >
          <FaTrash className="h-[18px] w-[18px]" />
        </button>
      </th>
    </tr>
  );
};

export default Table;
