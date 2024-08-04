import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Add } from "./Components/Add";
import { Edit } from "./Components/Edit";
import { Delete } from "./Components/Delete";
import { EmployeeDetails } from "./Components/EmployeeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="add" element={<Add />} />
        <Route path="edit/:id" element={<Edit />} />
        <Route path="delete/:id" element={<Delete />} />
        <Route path="/details/:id" element={<EmployeeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
