import { configureStore } from "@reduxjs/toolkit";
import signupReducer, { updateFormData, resetState, signupUser } from "../store/signupSlice";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe('signupSlice', () => {
    const initialState ={
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

    beforeEach(() => {
      fetchMock.resetMocks();
    })

    test("should handle updateFormData", () => {
        const newState = signupReducer(initialState, updateFormData({first_name: "Artin"}));
        expect(newState.formData.first_name).toBe("Artin")
    });

    test("should handle resetState", () => {
        const modifiedState = {
            ...initialState,
            formData: { ...initialState.formData, first_name: "Artin"},
            success: true,
        };

        const newState = signupReducer(modifiedState, resetState());
        expect(newState).toEqual(initialState);
    });

});