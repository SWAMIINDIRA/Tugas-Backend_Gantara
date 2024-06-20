import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateNotes() {
  const [title, setTitle] = useState("");
  const [catatan, setCatatan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (title === "" || catatan === "") {
      return alert("Title dan Notes tidak boleh kosong");
    }
    try {
      setIsLoading(true);
      const res = await axios.put(`${process.env.REACT_APP_PUBLIC_API_URL}/update/${id}`, {
        title,
        catatan,
      })
      console.log(res,'dataupdate');
      if (res.status === 200) {
        alert("Data berhasil di update");
        navigate("/");
      } else {
        alert("Terjadi kegagalan");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Perbarui Notes</h2>
          <div className="mb-2">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="Masukkan judul notes anda"
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Notes</label>
            <input
              type="text"
              placeholder="Masukkan notes anda"
              className="form-control"
              onChange={(e) => setCatatan(e.target.value)}
              value={catatan}
            />
          </div>
          <button className="btn btn-success">
            {isLoading ? "Memperbaharui data..." : "Perbaharui data"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateNotes;
