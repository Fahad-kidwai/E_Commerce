import React from "react";
import { FaStore, FaUserAlt, FaElementor } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminSlider = () => {
  return (
    <aside
      id="cta-button-sidebar"
      class="fixed top-[4rem] left-0 z-40 w-64 h-[15rem] transition-transform -translate-x-full sm:translate-x-0 "
      aria-label="Sidebar"
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul class="space-y-2">
          <li>
            <Link
              to="/admin/"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaStore />
              <span class="ml-3">Inventory</span>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/users"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaUserAlt />
              <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/purchases"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaElementor />
              <span class="flex-1 ml-3 whitespace-nowrap">Purchases</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/report"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaElementor />
              <span class="flex-1 ml-3 whitespace-nowrap">Reports</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSlider;
