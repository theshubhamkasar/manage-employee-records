import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Delete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteEmployee = async () => {
      const conf = window.confirm("Do you want to delete?");
      if (conf) {
        try {
          await axios.delete(
            `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`
          );
          alert("Employee deleted successfully!");
          navigate("/");
        } catch (err) {
          console.error("Failed to delete employee:", err);
        }
      } else {
        navigate("/");
      }
    };

    deleteEmployee();
  }, [id, navigate]);

  return null;
};
