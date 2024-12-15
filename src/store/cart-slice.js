import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  items: [],
  totalAmount: 0,
  isAdmin: true,
  stockButton: false,
  productButton: false,
  orderButton: true

};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalAmount += newItem.price * newItem.amount;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          amount: newItem.amount,
          price: newItem.price,
        });
      } else {
        existingItem.amount += newItem.amount;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      state.totalAmount -= existingItem.price;
      if (existingItem.amount === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.amount--;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
    loginAdmin(state, action) {
      state.isAdmin = action.payload;
    },

    setStockButton(state, action) {
      state.stockButton = action.payload;
    },

    setProductButton(state, action) {
      state.productButton = action.payload;
    },

    setOrderButton(state, action) {
      state.orderButton = action.payload;
    }
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;