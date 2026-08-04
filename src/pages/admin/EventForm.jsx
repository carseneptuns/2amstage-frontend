import { useState } from "react";
import api from "../../api/axios";

export default function EventForm({ existingEvent, onSaved, onCancel }) {
    const isEdit = !!existingEvent;

    const [form, setForm] = useState({
        nama: existingEvent?.nama || "",
        deskripsi: existingEvent?.deskripsi || "",
        artis: existingEvent?.artis || "",
        tanggal: existingEvent?.tanggal || "",
        waktu: existingEvent?.waktu?.slice(0, 5) || "", // format HH:MM
        lokasi: existingEvent?.lokasi || "",
        status: existingEvent?.status || "draft",
        layout_type: existingEvent?.layout_type || "",
    });
    const [posterFile, setPosterFile] = useState(null);
    const [preview, setPreview] = useState(
        existingEvent?.poster_url ? `http://localhost:5000${existingEvent.poster_url}` : null
    );
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPosterFile(file);
            setPreview(URL.createObjectURL(file)); // preview lokal sebelum upload
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        // wajib pakai FormData karena ada file
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => formData.append(key, value));
        if (posterFile) formData.append("poster", posterFile);

        try {
            if (isEdit) {
                await api.put(`/events/${existingEvent.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await api.post("/events", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }
            onSaved();
        } catch (err) {
            setError(err.response?.data?.message || "Gagal menyimpan event");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0C10] text-white p-10">
            <h1 className="text-2xl font-bold mb-8">{isEdit ? "Edit Event" : "Tambah Event"}</h1>

            <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
                <div>
                    <label className="block text-xs uppercase text-gray-400 mb-2">Poster</label>
                    {preview && <img src={preview} alt="preview" className="w-40 h-40 object-cover rounded-xl mb-3" />}
                    <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
                </div>

                <div>
                    <label className="block text-xs uppercase text-gray-400 mb-2">Nama Event</label>
                    <input
                        name="nama"
                        value={form.nama}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#151B24] border border-gray-800 rounded-xl px-4 py-3 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-xs uppercase text-gray-400 mb-2">Artis</label>
                    <input
                        name="artis"
                        value={form.artis}
                        onChange={handleChange}
                        className="w-full bg-[#151B24] border border-gray-800 rounded-xl px-4 py-3 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-xs uppercase text-gray-400 mb-2">Deskripsi</label>
                    <textarea
                        name="deskripsi"
                        value={form.deskripsi}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-[#151B24] border border-gray-800 rounded-xl px-4 py-3 text-sm"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs uppercase text-gray-400 mb-2">Tanggal</label>
                        <input
                            type="date"
                            name="tanggal"
                            value={form.tanggal}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#151B24] border border-gray-800 rounded-xl px-4 py-3 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase text-gray-400 mb-2">Waktu</label>
                        <input
                            type="time"
                            name="waktu"
                            value={form.waktu}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#151B24] border border-gray-800 rounded-xl px-4 py-3 text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs uppercase text-gray-400 mb-2">Lokasi</label>
                    <input
                        name="lokasi"
                        value={form.lokasi}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#151B24] border border-gray-800 rounded-xl px-4 py-3 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-xs uppercase text-gray-400 mb-2">Status</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full bg-[#151B24] border border-gray-800 rounded-xl px-4 py-3 text-sm"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="sold_out">Sold Out</option>
                        <option value="selesai">Selesai</option>
                        <option value="dibatalkan">Dibatalkan</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs uppercase text-gray-400 mb-2">Tipe Layout Panggung</label>
                    <select
                        name="layout_type"
                        value={form.layout_type}
                        onChange={handleChange}
                        className="w-full bg-[#151B24] border border-gray-800 rounded-xl px-4 py-3 text-sm"
                    >
                        <option value="">Belum dipilih</option>
                        <option value="arena">Arena (Festival + Ring Tiers)</option>
                        <option value="arena_x">Arena X (Stage Tengah 4 Sisi)</option>
                    </select>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-xl font-semibold"
                    >
                        {isSubmitting ? "Menyimpan..." : isEdit ? "Update Event" : "Simpan Event"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="border border-gray-700 px-6 py-3 rounded-xl font-semibold"
                    >
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
}