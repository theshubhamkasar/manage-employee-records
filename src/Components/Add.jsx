import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Add.css'; // Import custom CSS

export const Add = () => {
  const [inputData, setInputData] = useState({
    name: "",
    emailId: "",
    mobile: "",
    country: "",
    state: "",
    district: "",
  });

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country"
        );
        setCountries(response.data);
      } catch (error) {
        console.log("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!inputData.name) newErrors.name = "Name is required";
    if (!inputData.emailId) newErrors.emailId = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(inputData.emailId))
      newErrors.emailId = "Email is invalid";
    if (!inputData.mobile) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(inputData.mobile))
      newErrors.mobile = "Mobile number must be 10 digits";
    if (!inputData.country) newErrors.country = "Country is required";
    if (!inputData.state) newErrors.state = "State is required";
    if (!inputData.district) newErrors.district = "District is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post(
          "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee",
          inputData
        );
        alert("Employee added successfully!");
        navigate("/");
      } catch (error) {
        console.log("Error adding employee:", error);
      }
    }
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setInputData({ ...inputData, country });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 p-3 add-container">
      <div className="container border rounded bg-light p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-center">
            <h4>Add Employee</h4>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={inputData.name}
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="emailId" className="form-label">
              Email ID:
            </label>
            <input
              type="email"
              id="emailId"
              className="form-control"
              value={inputData.emailId}
              onChange={(e) =>
                setInputData({ ...inputData, emailId: e.target.value })
              }
            />
            {errors.emailId && (
              <div className="text-danger">{errors.emailId}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile:
            </label>
            <input
              type="text"
              id="mobile"
              className="form-control"
              value={inputData.mobile}
              onChange={(e) =>
                setInputData({ ...inputData, mobile: e.target.value })
              }
            />
            {errors.mobile && (
              <div className="text-danger">{errors.mobile}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="country" className="form-label">
              Country:
            </label>
            <select
              id="country"
              className="form-select"
              value={selectedCountry}
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

          <div className="form-group mb-3">
            <label htmlFor="state" className="form-label">
              State:
            </label>
            <input
              type="text"
              id="state"
              className="form-control"
              value={inputData.state}
              onChange={(e) =>
                setInputData({ ...inputData, state: e.target.value })
              }
            />
            {errors.state && <div className="text-danger">{errors.state}</div>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="district" className="form-label">
              District:
            </label>
            <input
              type="text"
              id="district"
              className="form-control"
              value={inputData.district}
              onChange={(e) =>
                setInputData({ ...inputData, district: e.target.value })
              }
            />
            {errors.district && (
              <div className="text-danger">{errors.district}</div>
            )}
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
