import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const Edit = () => {
  const { id } = useParams();
  const [inputData, setInputData] = useState({});
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country"
      );
      setCountries(response.data);
    } catch (err) {
      console.error("Error fetching countries:", err);
    }
  };

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`
      );
      setInputData(response.data);
    } catch (err) {
      console.error("Error fetching employee data:", err);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchEmployeeData();
  }, [id]);

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!inputData.name) newErrors.name = "Name is required";
    if (!inputData.emailId) newErrors.emailId = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(inputData.emailId))
      newErrors.emailId = "Email is invalid";
    if (!inputData.mobile) newErrors.mobile = "Mobile is required";
    else if (!/^\d{10}$/.test(inputData.mobile))
      newErrors.mobile = "Mobile number must be 10 digits";
    if (!inputData.country) newErrors.country = "Country is required";
    if (!inputData.state) newErrors.state = "State is required";
    if (!inputData.district) newErrors.district = "District is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.put(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`,
        inputData
      );
      alert("Employee data updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error updating employee data:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleCountryChange = (e) => {
    setInputData({ ...inputData, country: e.target.value });
  };

  return (
    <div className="container my-5 add-container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="border p-4 rounded bg-light">
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-4">
                <h4>Update Employee</h4>
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={inputData.name || ""}
                  className="form-control"
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="emailId" className="form-label">
                  Email ID:
                </label>
                <input
                  type="email"
                  id="emailId"
                  name="emailId"
                  value={inputData.emailId || ""}
                  className="form-control"
                  onChange={handleInputChange}
                />
                {errors.emailId && (
                  <div className="text-danger">{errors.emailId}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile:
                </label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={inputData.mobile || ""}
                  className="form-control"
                  onChange={handleInputChange}
                />
                {errors.mobile && (
                  <div className="text-danger">{errors.mobile}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="country" className="form-label">
                  Country:
                </label>
                <select
                  id="country"
                  name="country"
                  className="form-select"
                  value={inputData.country || ""}
                  onChange={handleCountryChange}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.country}>
                      {country.country}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <div className="text-danger">{errors.country}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="state" className="form-label">
                  State:
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={inputData.state || ""}
                  className="form-control"
                  onChange={handleInputChange}
                />
                {errors.state && (
                  <div className="text-danger">{errors.state}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="district" className="form-label">
                  District:
                </label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={inputData.district || ""}
                  className="form-control"
                  onChange={handleInputChange}
                />
                {errors.district && (
                  <div className="text-danger">{errors.district}</div>
                )}
              </div>

              <div className="d-flex justify-content-center mt-4">
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
