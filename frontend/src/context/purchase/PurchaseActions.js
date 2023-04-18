import axios from "axios";

const API_URL = "/api/purchase/";

export const newPurchase = async (data, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log(data.sl_ID);
    const response = await axios.post(API_URL, data, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPurchases = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log(data.sl_ID);
    const response = await axios.get(API_URL, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};
