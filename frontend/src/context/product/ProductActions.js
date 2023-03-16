import axios from "axios";

const API_URL = "/api/product/";

// Create Product
export const addProduct = async (productData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(API_URL, productData, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all products
export const getProdct = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};
// Get product details
export const getProdctDetails = async (productId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(API_URL + productId, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user product
// export const getProduct = async (productId, token) => {
//   try {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const response = await axios.get(API_URL + productId, config);

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// Update product
export const updateProdct = async (productId, productData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(API_URL + productId, productData, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete user product
export const deleteProdct = async (productId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(API_URL + productId, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};
