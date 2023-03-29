import axios from "axios";

const API_URL = "/api/supplier/";

export const getSuppliers = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("response");

    const response = await axios.get(API_URL, config);
    // console.log("response", response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSupplier = async (sl_Id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(API_URL + sl_Id, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSupplier = async (slData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(API_URL, slData, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSupplier = async (sl_Id, slData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(API_URL + sl_Id, slData, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// exports = {
//   getSupplier,
//   getSuppliers,
//   createSupplier,
//   updateSupplier,
// };
