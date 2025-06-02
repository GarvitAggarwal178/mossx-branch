import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          imagesrc: product.imagesrc,
          quantity,
        });
      }

      // Update total
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    addBundleToCart: (state, action) => {
      const { bundle } = action.payload;

      // Add the bundle as a single item with its discounted price
      const existingBundle = state.items.find(
        (item) => item.id === `bundle-${bundle.id}`
      );

      if (existingBundle) {
        existingBundle.quantity += 1;
      } else {
        state.items.push({
          id: `bundle-${bundle.id}`,
          title: bundle.title,
          price: bundle.discounrPrice,
          imagesrc: bundle.imgSrc,
          quantity: 1,
          isBundle: true,
          bundleId: bundle.id,
          description: bundle.discription,
          originalPrice: bundle.OrignalPrice,
        });
      }

      // Update total
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);

      // Update total
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === productId);

      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== productId);
        }
      }

      // Update total
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const {
  addToCart,
  addBundleToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
