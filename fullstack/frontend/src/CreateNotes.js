import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateNotes() {
  const [title, setTitle] = useState("");
  const [catatan, setCatatan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (title === "" || catatan === "") {
      return alert("Title dan Notes tidak boleh kosong");
    }
    try {
      setIsLoading(true);
      const post = await axios.post(`${process.env.REACT_APP_PUBLIC_API_URL}/create`, {
        title,
        catatan,
      });
      console.log(post);
      if (post.status === 200) {
        alert("Berhasil menambahkan data");
        navigate("/");
      } else {
        alert("Gagal menambahkan data");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Tambah Notes</h2>
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
            {isLoading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNotes;
