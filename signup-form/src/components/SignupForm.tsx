import React, {HTMLInputTypeAttribute, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { RootState, AppDispatch } from "../store";
import './SignUp.css'
import {resetState, signupUser, updateFormData} from "../store/signupSlice";


const SignupForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        formData, loading, success, error } = useSelector(
        (state: RootState) => state.signup
    );

    const [errors, setErrors] = useState({
        user_type: "",
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        country: '',
    })

    const validate = () => {
        const newErrors = {
            user_type: !formData.user_type ? "User Type is required" : "",
            first_name: !formData.first_name ? "First Name is required" : "",
            last_name: !formData.last_name ? "Last Name is required" : "",
            username: !formData.username ? "Username is required" : "",
            email: !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formData.email) ? "Enter a valid email" : "",
            password: formData.password.length < 6 ? "Password must be at least 6 characters long" : "",
            country: !formData.country ? "Country is required" : "",
        };

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === "");
    };

    const [localFormData, setLocalFormData] = useState(formData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLocalFormData({ ...localFormData, [name]: value });
        dispatch(updateFormData({ [name]: value }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(signupUser(formData));
    };

    const resetForm = () => {
        dispatch(resetState());
    };

    return (
        <div>
            <h2 className="center">Sign Up Form</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
            <div>
                <label>
                    User Type:
                    <select name="user_type" value={formData.user_type} onChange={handleChange} required>
                        <option value="">Select User Type</option>
                        <option value="researcher">Researcher</option>
                        <option value="investor">Investor</option>
                        <option value="institution_staff">Institution Staff</option>
                        <option value="service_provider">Service Provider</option>
                    </select>
                </label>
            </div>

            <div className="form-group">
                <div>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="first_name"
                        placeholder="Enter your first name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                </div>
            <div>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Enter your last name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
                </div>

                <div className="form-group">
                    <div>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                </div>
                <div>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                </div>
                </div>
                <div className="form-group">
                <div>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                </div>
                <div>
                <label>
                    Country:
                    <input
                        type="text"
                        name="country"
                        placeholder="Enter your Country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                </label>
                </div>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Request sent" : "Sign Up"}
                </button>

                {success && (
                    <p className="succes-message">
                        Signup Successful!{""}
                        <button onClick={resetForm}>
                            Reset Form
                        </button>
                    </p>
                )}
                {error && (<p className="error-message">Error: {error}</p>)}
            </form>
        </div>
);
};
export default SignupForm;