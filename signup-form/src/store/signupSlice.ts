import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

interface SignupState {
    formData: {
        user_type: string;
        first_name: string;
        last_name: string;
        username: string;
        email: string;
        password: string;
        country: string;
    };
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: SignupState = {
    formData: {
        user_type: "",
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        country: "",
    },
    loading: false,
    success: false,
    error: null,
};