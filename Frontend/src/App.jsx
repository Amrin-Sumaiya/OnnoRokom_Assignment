import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Teacherdata from "./Componenets/teacherdata.jsx";
import AddTeacher from "./Componenets/AddTeacher.jsx";
import UpdateTeacher from "./Componenets/UpdateTeacher.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default page */}
        <Route
          path="/"
          element={<Navigate to="/teacherdata" replace />}
        />

        {/* Teacher list */}
        <Route
          path="/teacherdata"
          element={<Teacherdata />}
        />

        {/* Add teacher */}
        <Route
          path="/add_teacher"
          element={<AddTeacher />}
        />

        {/* Update teacher */}
        <Route
          path="/update_teacher/:id"
          element={<UpdateTeacher />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;