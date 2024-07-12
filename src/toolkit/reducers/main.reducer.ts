import { PayloadAction, createSlice } from '@reduxjs/toolkit';
const initialstate = {
  alert: {
    visible: false,
    mode: 'Alert',
    message: '',
    // button1: {name: '', callback: () => {}},
    button2: { name: '', callback: () => { } },
  },
};
export const MainSlice = createSlice({
  name: 'main',
  initialState: initialstate,
  reducers: {
    setAlert: (state: typeof initialstate, action: PayloadAction<any>) => {
      state.alert = action.payload;
    },
  },
});
export const { setAlert } = MainSlice.actions;
export default MainSlice.reducer;
