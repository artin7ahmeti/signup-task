import React, {HTMLInputTypeAttribute, useState} from "react";
import './SignUp.css'

const SignupForm: React.FC = () => {
    const [formData, setFormData] = useState({
        user_type: '',
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        country: '',
    });

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=> {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form submitted:", formData);
        } else {
            console.log("Validation failed");
        }
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
                    {errors.user_type && <p className="error-message">{errors.user_type}</p>}
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
                    {errors.first_name && <p className="error-message">{errors.first_name}</p>}
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
                    {errors.last_name && <p className="error-message">{errors.last_name}</p>}
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
                    {errors.username && <p className="error-message">{errors.username}</p>}
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
                    {errors.email && <p className="error-message">{errors.email}</p>}
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
                    {errors.password && <p className="error-message">{errors.password}</p>}
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
                    {errors.country && <p className="error-message">{errors.country}</p>}
                </label>
                </div>
                </div>

                <button type="submit">Sign Up</button>
            </form>
        </div>
);
};
export default SignupForm;