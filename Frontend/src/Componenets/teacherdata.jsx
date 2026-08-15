import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaUserPlus, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

const TeacherData = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // Fetch teacher data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getAllTeachers"
        );

        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
        toast.error("Failed to fetch teacher data");
      }
    };

    fetchData();
  }, []);

  // Delete teacher
  const deleteTeacher = async (teacherId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/deleteTeacher/${teacherId}`
      );

      setTeachers((prevTeachers) =>
        prevTeachers.filter((teacher) => teacher._id !== teacherId)
      );

      toast.success(
        response.data.message || "Teacher deleted successfully"
      );
    } catch (error) {
      console.error("Error deleting teacher:", error);
      toast.error("Failed to delete teacher");
    }
  };

  // Open modal
  const openModal = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedTeacher(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">

      {/* ================= TITLE + ADD TEACHER ================= */}
      <div className="relative mb-6">

        <h2 className="text-3xl font-semibold absolute left-1/2 transform -translate-x-1/2">
          Teacher's Records
        </h2>

        <div className="flex justify-end">
          <button
            onClick={() => navigate("/add_teacher")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-800 transition"
          >
            <FaUserPlus />
            Add Teacher
          </button>
        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto">

        <table className="min-w-full border-collapse border border-gray-800">

          <thead>
            <tr className="bg-gray-300">

              <th className="border p-4">
                SI.NO
              </th>

              <th className="border p-4">
                Name
              </th>

              <th className="border p-4">
                Email
              </th>

              <th className="border p-4">
                Subject
              </th>

              <th className="border p-4">
                Classes
              </th>

              <th className="border p-4 text-center">
                View Details
              </th>

              <th className="border p-4 text-center">
                Update
              </th>

              <th className="border p-4 text-center">
                Delete
              </th>

            </tr>
          </thead>

          <tbody>

            {teachers.length > 0 ? (

              teachers.map((teacher, index) => (

                <tr
                  key={teacher._id || index}
                  className="text-center hover:bg-gray-100"
                >

                  {/* SI.NO */}
                  <td className="border p-4">
                    {index + 1}
                  </td>

                  {/* NAME */}
                  <td className="border p-4">
                    {teacher.name}
                  </td>

                  {/* EMAIL */}
                  <td className="border p-4">
                    {teacher.email}
                  </td>

                  {/* SUBJECT */}
                  <td className="border p-4">
                    {teacher.subject}
                  </td>

                  {/* CLASSES */}
                  <td className="border p-4">
                    {teacher.classes?.join(", ") || "N/A"}
                  </td>

                  {/* VIEW */}
                  <td className="border p-4">

                    <button
                      onClick={() => openModal(teacher)}
                      className="text-blue-600 hover:text-blue-800 hover:scale-110 transition"
                    >
                      <FaEye />
                    </button>

                  </td>

                  {/* UPDATE */}
                  <td className="border p-4">

                    <button
onClick={() =>
  navigate(`/update_teacher/${teacher._id}`)
}
                      className="text-blue-600 hover:scale-110 transition"
                    >
                      <FaEdit />
                    </button>

                  </td>

                  {/* DELETE */}
                  <td className="border p-4">

                    <button
                      onClick={() => deleteTeacher(teacher._id)}
                      className="text-red-600 hover:scale-110 transition"
                    >
                      <FaTrash />
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="8"
                  className="border p-6 text-center text-gray-500"
                >
                  No teachers found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* ================= TEACHER DETAILS MODAL ================= */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Teacher Details"
        className="bg-white rounded-md p-6 max-w-md w-full mx-auto shadow-xl border border-gray-300"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4"
      >

        {selectedTeacher && (

          <div className="space-y-3 text-gray-700">

            <h3 className="text-xl font-bold mb-4 text-indigo-700 text-center">
              Teacher Details
            </h3>

            <p>
              <strong>Name:</strong>{" "}
              {selectedTeacher.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {selectedTeacher.email}
            </p>

            <p>
              <strong>Subject:</strong>{" "}
              {selectedTeacher.subject}
            </p>

            <div>
              <strong>Classes:</strong>

              {selectedTeacher.classes?.length > 0 ? (

                <ul className="mt-2 ml-5 list-disc">

                  {selectedTeacher.classes.map((className, index) => (
                    <li key={index}>
                      {className}
                    </li>
                  ))}

                </ul>

              ) : (
                <p className="text-gray-500 mt-1">
                  No classes assigned.
                </p>
              )}

            </div>

          </div>

        )}

        {/* CLOSE BUTTON */}
        <div className="mt-6 text-center">

          <button
            onClick={closeModal}
            className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            Close
          </button>

        </div>

      </Modal>

    </div>
  );
};

export default TeacherData;