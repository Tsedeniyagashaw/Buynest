import { useState } from "react";
import API from "../../services/api";
import { X } from "lucide-react";

function AddAdminModal({ open, onClose }) {
  const [formData, setFormData] = useState({ firstName: "", middleName: "", lastName: "", email: "", phoneNumber: "", password: "",});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAdmin = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/admin/create-admin",
        {
          ...formData,
          role: "admin",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Admin created successfully!");

      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
      });

      onClose();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  if (!open) return null;

  return (
    <div  className="fixed inset-0  z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm px-4" onClick={onClose} >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg  rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add New Admin</h2>
            <p className="text-sm text-gray-500 mt-1">Create an administrator account for your platform.</p>
          </div>

          <button onClick={onClose}  className=" p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>

              <input name="firstName" value={formData.firstName} onChange={handleChange}  placeholder="Enter first name"
                className=" w-full  px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Middle Name</label>

              <input name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Enter middle name"
                className=" w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all "/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>

              <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name"
                className="w-full px-3.5 py-2.5  text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all "/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>

              <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter phone number"
                className=" w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-gray-900  focus:ring-2  focus:ring-gray-900/10  transition-all" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="admin@example.com"
                className="w-full px-3.5  py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none  placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Create a secure password"
                className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg  outline-none placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all" />
              <p className="text-xs text-gray-400 mt-1.5">Use a strong password for the administrator account.</p>
            </div>
          </div>
        </div>

        <div
          className="  flex  items-center justify-end gap-3  px-6 py-4  bg-gray-50 border-t border-gray-100">
          <button onClick={onClose}
            className="px-4  py-2.5 rounded-lg text-sm font-medium text-gray-700  bg-white border  border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors " >
            Cancel
          </button>

          <button
            onClick={handleCreateAdmin}
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 shadow-sm transition-colors">
            Create Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAdminModal;
