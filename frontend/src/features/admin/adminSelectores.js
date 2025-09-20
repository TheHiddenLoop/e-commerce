export const selectAllProducts = (state) => state.adminProduct.sellingProducts;

export const selectProductById = (state, id) =>
  state.adminProduct.sellingProducts.find((product) => product._id === id);

export const selectLastAddedProduct = (state) => state.adminProduct.singleProduct;

export const selectAdminProductStatus = (state) => state.adminProduct.status;

export const selectAdminProductError = (state) => state.adminProduct.error;