import { Link } from "react-router-dom";
import React from "react";
import { FaRegEdit, FaTrash } from "react-icons/fa";

const Utable = ({ item }) => {
  let st = item.stock + " " + item.qp;
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{item.sku}</div>
          </div>
        </div>
      </td>
      <td>
        {item.price}
        <br />
      </td>
      <td>
        {st}
        {/* {item.stock}+" " +{item.qp} */}
      </td>
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
  );
};

export default Utable;
