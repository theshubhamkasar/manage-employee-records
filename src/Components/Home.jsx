import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee"
        );
        setRecords(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setCurrentPage(1);
  };

  const uniqueCountries = [...new Set(records.map((record) => record.country))];

  // Filter records based on query
  const filteredItems = records.filter(
    (record) =>
      (query === "" ||
        record.name.toLowerCase().includes(query.toLowerCase()) ||
        record.emailId.toLowerCase().includes(query.toLowerCase()) ||
        record.mobile.toLowerCase().includes(query.toLowerCase()) ||
        record.country.toLowerCase().includes(query.toLowerCase()) ||
        record.state.toLowerCase().includes(query.toLowerCase()) ||
        record.district.toLowerCase().includes(query.toLowerCase())) &&
      (selectedCountry === "" || record.country === selectedCountry)
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <div className="text-end mb-4">
        <Link to="/add" className="btn btn-primary mb-3">
          Add +
        </Link>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search Employee"
          value={query}
          onChange={handleInputChange}
        />

        <select
          className="form-select"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">Select Country</option>
          {uniqueCountries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="row">
        {currentItems.map((d) => (
          <div key={d.id} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={d.avatar}
                    className="rounded-circle"
                    alt={`${d.name}'s avatar`}
                    style={{ width: "50px", height: "50px" }}
                  />
                  <h5 className="card-title ms-3">
                    <Link to={`/details/${d.id}`}>{d.name}</Link>
                  </h5>
                </div>
                <p className="card-text">
                  <strong>Email: </strong>
                  {d.emailId}
                </p>
                <p className="card-text">
                  <strong>Mobile: </strong>
                  {d.mobile}
                </p>
                <p className="card-text">
                  <strong>Country: </strong>
                  {d.country}
                </p>
                <p className="card-text">
                  <strong>State: </strong>
                  {d.state}
                </p>
                <p className="card-text">
                  <strong>District: </strong>
                  {d.district}
                </p>
                <div className="d-flex justify-content-between">
                  <Link to={`/edit/${d.id}`} className="btn btn-sm btn-success">
                    <i className="bi bi-pencil-square"></i> Update
                  </Link>
                  <Link
                    to={`/delete/${d.id}`}
                    className="btn btn-sm btn-danger"
                  >
                    <i className="bi bi-trash"></i> Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
