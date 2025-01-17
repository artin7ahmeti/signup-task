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

    describe("signupUser async thunk", () => {
        test("should handle pending state", () => {
            const action = { type: signupUser.pending.type};
            const state = signupReducer(initialState, action);

            expect(state.loading).toBe(true);
            expect(state.success).toBe(false);
            expect(state.error).toBe(null);
        });
        test("should handle fulfilled state", () => {
            const action = { type: signupUser.fulfilled.type};
            const state = signupReducer(initialState, action);

            expect(state.loading).toBe(false);
            expect(state.success).toBe(true);
        });

        test("should handle rejected state", () => {
            const action = { type: signupUser.rejected.type, payload: "Error occurred"};
            const state = signupReducer(initialState, action);

            expect(state.loading).toBe(false);
            expect(state.success).toBe(false);
            expect(state.error).toBe("Error occurred");
        });

        test("should call the API and handle fulfilled response", async() => {
            fetchMock.mockResponseOnce(JSON.stringify({message: "Success"}), {status: 200});

            const store = configureStore({
                reducer: signupReducer,
            });
            const result = await store.dispatch(
                signupUser({
                    user_type: "researcher",
                    first_name: "Artin",
                    last_name: "Ahmeti",
                    username: "ahmetiartin143",
                    email: "artini13@hotmail.com",
                    password: "strongpass123",
                    country: "Albania",
                }) as any
            );

            const state = store.getState();
            expect(fetchMock).toHaveBeenCalledWith("https://django-dev.aakscience.com/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_type: "researcher",
                    first_name: "Artin",
                    last_name: "Ahmeti",
                    username: "ahmetiartin143",
                    email: "artini13@hotmail.com",
                    password: "strongpass123",
                    country: "Albania",
                }),
            });

            expect(state.loading).toBe(false);
            expect(state.success).toBe(true);
            expect(result.type).toBe("signup/signupUser/fulfilled");
        });

        test("should call the API and handle rejected response", async() => {
            fetchMock.mockResponseOnce(JSON.stringify({message: "Unexpected error"}), {status: 400});

            const store = configureStore({
                reducer: signupReducer,
            });
            const result = await store.dispatch(
                signupUser({
                    user_type: "researcher",
                    first_name: "Artin",
                    last_name: "Ahmeti",
                    username: "ahmetiartin143",
                    email: "artini13@hotmail.com",
                    password: "strongpass123",
                    country: "Albania",
                }) as any
            );

            const state = store.getState();
            expect(fetchMock).toHaveBeenCalledWith("https://django-dev.aakscience.com/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_type: "researcher",
                    first_name: "Artin",
                    last_name: "Ahmeti",
                    username: "ahmetiartin143",
                    email: "artini13@hotmail.com",
                    password: "strongpass123",
                    country: "Albania",
                }),
            });

            expect(state.loading).toBe(false);
            expect(state.success).toBe(false);
            expect(state.error).toBe("Unexpected error");
            expect(result.type).toBe("signup/signupUser/rejected");
        });
    })
});