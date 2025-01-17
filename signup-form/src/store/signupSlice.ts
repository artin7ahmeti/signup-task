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

export const signupUser = createAsyncThunk(
    "signup/signupUser",
    async (formData: SignupState["formData"], thunkAPI) => {
        try {
            const response = await fetch("https://django-dev.aakscience.com/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData.message);
            }

            return  response.json();
        } catch (error: any) {
            return thunkAPI.rejectWithValue("Unexpected error.");
        }
    }
);

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        updateFormData(state, action) {
            state.formData = {
                ...state.formData,
                ...action.payload,
            };
        },
        resetState(state) {
            state.formData = initialState.formData;
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = false;
                state.success = false;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload as string;
            });
    },
});

export const { updateFormData, resetState } = signupSlice.actions;
export default signupSlice.reducer;