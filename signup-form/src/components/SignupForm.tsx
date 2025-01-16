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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
        <div>
            <h2 className="center">Sign Up Form</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
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

                <button type="submit">Sign Up</button>
            </form>
        </div>
);
};
export default SignupForm;