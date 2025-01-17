import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import { Provider} from "react-redux";
import SignupForm from "../components/SignupForm";
import {configureStore, MockStoreEnhanced} from "redux-mock-store";


interface SignupState {
    signup: {
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
    };
}

const initialState: SignupState = {
    signup: {
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
    },
};

const mockStore = configureStore<SignupState>([]);

describe("SignupForm Component", () => {
    let store: MockStoreEnhanced<SignupState>;

    beforeEach(() => {
        store = mockStore(initialState);
        store.clearActions();
        });

test('renders form', () => {
    render(
        <Provider store={store}>
            <SignupForm/>
        </Provider>
    );

    expect(screen.getByLabelText(/User Type/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your first name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your username/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/)).toBeInTheDocument();
});

test("renders success message on successful signup", () =>{
    const successState: SignupState = {
        ...initialState,
        signup: {
            ...initialState.signup,
            success: true,
        },
    };

    store = mockStore(successState);

    render(
        <Provider store={store}>
            <SignupForm />
        </Provider>
    );

    expect(screen.getByText(/Signup Successful!/)).toBeInTheDocument();
});

    test("renders error message on failed signup", () =>{
        const errorState: SignupState = {
            ...initialState,
            signup: {
                ...initialState.signup,
                error: "Signup failed",
            },
        };

        store = mockStore(errorState);

        render(
            <Provider store={store}>
                <SignupForm />
            </Provider>
        );

        expect(screen.getByText(/Error: Signup failed/)).toBeInTheDocument();
    });
});

