import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: "1",
      name: "Product 1",
      price: 29.99,
      image: "https://picsum.photos/200",
      description: "This is a sample product description.",
    },
    {
      id: "2",
      name: "Product 2",
      price: 39.99,
      image: "https://picsum.photos/201",
      description: "This is another sample product description.",
    },
    {
      id: "3",
      name: "Product 3",
      price: 49.99,
      image: "https://picsum.photos/202",
      description: "This is yet another sample product description.",
    },
  ],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
  },
});

export const { addProduct, removeProduct, updateProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
