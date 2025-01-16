import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer:{
        signup: signupReducer,
    }
});
export default store;