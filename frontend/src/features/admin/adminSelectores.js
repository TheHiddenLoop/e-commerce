export const selectAllProducts = (state) => state.adminProduct.sellingProducts;
export const selectOrders = (state) => state.adminProduct.orderedItems;


export const selectProductById = (state, id) =>
  state.adminProduct.sellingProducts.find((product) => product._id === id);

export const selectAnalysticalData = (state) => state.adminProduct.analysticalData;

export const selectAdminProductStatus = (state) => state.adminProduct.status;

export const selectAdminProductError = (state) => state.adminProduct.error;