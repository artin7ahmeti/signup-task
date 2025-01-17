import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider} from "react-redux";
import SignupForm from "./components/SignupForm";
import {configureStore} from "redux-mock-store";

const mockStore = configureStore([]);

describe("SignupForm Component", () => {
    let store: ReturnType<typeof mockStore>

    beforeEach(() => {
        store = mockStore ({
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
        });
});
test('renders form', () => {
    render(
        <Provider store={store}>
            <SignupForm/>
        </Provider>
    );

    expect(screen.getByLabelText(/User Type/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter your first name/)).toBeInTheDocument();
});
});
