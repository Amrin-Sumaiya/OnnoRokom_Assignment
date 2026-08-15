import  { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateTeacher = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    subject: "",
    classes: "",
  });

  const [loading, setLoading] = useState(false);

  // Get teacher by ID
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/getTeacherById/${id}`
        );

        const data = response.data;

        setTeacher({
          name: data.name || "",
          email: data.email || "",
          subject: data.subject || "",
          classes: data.classes?.join(", ") || "",
        });
      } catch (error) {
        console.error("Error fetching teacher:", error);
        toast.error("Failed to fetch teacher");
      }
    };

    fetchTeacher();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTeacher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update teacher
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !teacher.name ||
      !teacher.email ||
      !teacher.subject ||
      !teacher.classes
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const classesArray = teacher.classes
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      const response = await axios.put(
        `http://localhost:8000/api/updateTeacher/${id}`,
        {
          name: teacher.name,
          email: teacher.email,
          subject: teacher.subject,
          classes: classesArray,
        }
      );

      toast.success(
        response.data.message || "Teacher updated successfully!"
      );

      navigate("/teacherdata");
    } catch (error) {
      console.error("Error updating teacher:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update teacher"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between">

        <h2 className="text-3xl font-semibold">
          Update Teacher
        </h2>

        <button
          onClick={() => navigate("/teacherdata")}
          className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          <FaArrowLeft />
          Back
        </button>

      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">

        <div className="flex items-center gap-3 mb-6">

          <FaEdit className="text-blue-600 text-2xl" />

          <h3 className="text-xl font-semibold">
            Update Teacher Information
          </h3>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="mb-5">

            <label className="block text-gray-700 font-medium mb-2">
              Teacher Name
            </label>

            <input
              type="text"
              name="name"
              value={teacher.name}
              onChange={handleChange}
              placeholder="Enter teacher name"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Email */}
          <div className="mb-5">

            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={teacher.email}
              onChange={handleChange}
              placeholder="Enter teacher email"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Subject */}
          <div className="mb-5">

            <label className="block text-gray-700 font-medium mb-2">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={teacher.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Classes */}
          <div className="mb-6">

            <label className="block text-gray-700 font-medium mb-2">
              Classes
            </label>

            <input
              type="text"
              name="classes"
              value={teacher.classes}
              onChange={handleChange}
              placeholder="Example: 6, 7, 8"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-sm text-gray-500 mt-2">
              Enter multiple classes separated by commas.
            </p>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition disabled:bg-gray-400"
          >
            {loading ? "Updating Teacher..." : "Update Teacher"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default UpdateTeacher;