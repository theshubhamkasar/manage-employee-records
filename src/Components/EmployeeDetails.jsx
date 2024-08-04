import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../EmployeeDetails.css";

export const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const res = await axios.get(
          `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`
        );
        setEmployee(res.data);
        setError(null);
      } catch (error) {
        console.error(
          "There was an error fetching the employee details!",
          error
        );
        setError("There was an error fetching the employee details.");
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/edit/${id}`)}
        >
          Edit
        </button>
      </div>
      <div className="card shadow">
        <div className="card-header text-center bg-primary text-white">
          <h2 className="mb-0">{employee.name}</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={employee.avatar}
                alt={`${employee.name}'s avatar`}
                className="img-fluid rounded-circle mb-3"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            </div>
            <div className="col-md-8">
              <dl className="row">
                <dt className="col-sm-4">ID</dt>
                <dd className="col-sm-8">{employee.id}</dd>

                <dt className="col-sm-4">Name</dt>
                <dd className="col-sm-8">{employee.name}</dd>

                <dt className="col-sm-4">Email</dt>
                <dd className="col-sm-8">{employee.emailId}</dd>

                <dt className="col-sm-4">Mobile</dt>
                <dd className="col-sm-8">{employee.mobile}</dd>

                <dt className="col-sm-4">Country</dt>
                <dd className="col-sm-8">{employee.country}</dd>

                <dt className="col-sm-4">State</dt>
                <dd className="col-sm-8">{employee.state}</dd>

                <dt className="col-sm-4">District</dt>
                <dd className="col-sm-8">{employee.district}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
