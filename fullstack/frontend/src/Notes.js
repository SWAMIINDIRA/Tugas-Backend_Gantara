import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getNotesData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}`);
        console.log(res);
        if (res.status === 200) {
          console.log("Data berhasil diperoleh");
          setNotes(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getNotesData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_PUBLIC_API_URL}/notes/${id}`);
      console.log(res, "delete data");
      if (res.status === 200) {
        setNotes(notes.filter((note) => note.id !== id));
        alert("berhasil menghapus data");
        window.location.reload();
      } else {
        alert("gagal menghapus data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // kalo masih loading
  if (isLoading) {
    return <p>Getting data....</p>;
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-fit-content bg-white rounded">
        <Link to="/create" className="btn btn-success">
          Tambah +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Datetime</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item?.title}</td>
                  <td>{item?.datetime}</td>
                  <td>{item?.note}</td>
                  <td>
                    <Link to={`/update/${item.id}`} className="btn btn-primary">
                      Perbarui
                    </Link>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Notes;