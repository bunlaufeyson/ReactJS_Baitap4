import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudent,
  deleteStudent,
  updateStudent,
  selectStudent,
  clearSelectedStudent,
  setSearchKeyword,
} from "./studentSlice";

export default function StudentForm() {
  const dispatch = useDispatch();
  const { students, selectedStudent, searchKeyword } = useSelector((state) => state.student);

  const [formData, setFormData] = useState({
    maSV: "",
    hoTen: "",
    sdt: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedStudent) {
      setFormData(selectedStudent);
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.maSV.trim()) newErrors.maSV = "Mã SV không được để trống";
    if (!formData.hoTen.trim()) newErrors.hoTen = "Họ tên không được để trống";
    if (!/^\d{10,11}$/.test(formData.sdt)) newErrors.sdt = "SĐT không hợp lệ";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email không đúng định dạng";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (selectedStudent) {
      dispatch(updateStudent(formData));
      dispatch(clearSelectedStudent());
    } else {
      dispatch(addStudent(formData));
    }
    setFormData({ maSV: "", hoTen: "", sdt: "", email: "" });
  };

  const handleSearch = (e) => {
    dispatch(setSearchKeyword(e.target.value));
  };

  const filteredStudents = students.filter(
    (sv) =>
      sv.maSV.includes(searchKeyword) ||
      sv.hoTen.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      sv.email.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Thông tin sinh viên</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {["maSV", "hoTen", "sdt", "email"].map((field) => (
          <div key={field}>
            <input
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.toUpperCase()}
              className="w-full border px-2 py-1"
            />
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {selectedStudent ? "Cập nhật" : "Thêm sinh viên"}
      </button>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Tìm kiếm sinh viên..."
          onChange={handleSearch}
          className="w-full border px-2 py-1 mb-4"
        />
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Mã SV</th>
              <th className="border px-2 py-1">Họ tên</th>
              <th className="border px-2 py-1">SĐT</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((sv) => (
              <tr key={sv.maSV}>
                <td className="border px-2 py-1">{sv.maSV}</td>
                <td className="border px-2 py-1">{sv.hoTen}</td>
                <td className="border px-2 py-1">{sv.sdt}</td>
                <td className="border px-2 py-1">{sv.email}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button
                    onClick={() => dispatch(selectStudent(sv))}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => dispatch(deleteStudent(sv.maSV))}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Không tìm thấy sinh viên nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
