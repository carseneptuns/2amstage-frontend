import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function EventList({ onNavigate, onEdit }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = () => {
    setLoading(true);
    api.get("/events").then((res) => setEvents(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus event ini?")) return;
    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus event");
    }
  };

  if (loading) return <p className="text-white p-10">Memuat...</p>;

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Kelola Event</h1>
        <button
          onClick={() => onNavigate("event-create")}
          className="bg-orange-600 hover:bg-orange-700 px-5 py-2.5 rounded-xl font-semibold"
        >
          + Tambah Event
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400 text-sm">
            <th className="pb-3">Poster</th>
            <th className="pb-3">Nama</th>
            <th className="pb-3">Tanggal</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id} className="border-b border-gray-800">
              <td className="py-3">
                {e.poster_url ? (
                  <img src={`http://localhost:5000${e.poster_url}`} alt={e.nama} className="w-16 h-16 object-cover rounded-lg" />
                ) : (
                  <div className="w-16 h-16 bg-gray-800 rounded-lg" />
                )}
              </td>
              <td className="py-3 font-semibold">{e.nama}</td>
              <td className="py-3 text-gray-400">{e.tanggal}</td>
              <td className="py-3">
                <span className="px-3 py-1 rounded-full text-xs bg-white/10">{e.status}</span>
              </td>
              <td className="py-3 space-x-3">
                <button onClick={() => onEdit(e)} className="text-blue-400 hover:underline">
                  Edit
                </button>
                <button onClick={() => handleDelete(e.id)} className="text-red-400 hover:underline">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}