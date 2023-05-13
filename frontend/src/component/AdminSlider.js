import React from "react";
import { FaStore, FaUserAlt, FaElementor } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminSlider = () => {
  return (
    <aside
      id="cta-button-sidebar"
      className="fixed top-[4rem] left-0 z-40 w-64 h-[18rem] transition-transform -translate-x-full sm:translate-x-0 "
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaStore />
              <span className="ml-3">Inventory</span>
            </Link>
          </li>

          {/* <li>
            <Link
              to="/admin/users"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaUserAlt />
              <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
            </Link>
          </li> */}
          <li>
            <Link
              to="/admin/suppliers"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaUserAlt />
              <span className="flex-1 ml-3 whitespace-nowrap">Suppliers</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/purchases"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaElementor />
              <span className="flex-1 ml-3 whitespace-nowrap">Purchases</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/report"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaElementor />
              <span className="flex-1 ml-3 whitespace-nowrap">Reports</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/delievery"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaElementor />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Delivery Management
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSlider;
