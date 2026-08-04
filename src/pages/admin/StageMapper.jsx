// src/pages/admin/StageMapper.jsx
import { useState, useEffect } from "react";
import api from "../../api/axios";
import SeatMap from "../../components/SeatMap";
import SeatMapArenaX from "../../components/SeatMapArenaX";

// data-id zona yang ada di tiap layout, dipakai buat generate dropdown
const ZONES_BY_LAYOUT = {
  arena: ["festival", "cat1", "cat2", "cat3", "cat4", "cat5", "cat6"],
  arena_x: ["category2", "platinum_tribune", "platinum_floor", "vip_package"],
};

const ZONE_LABELS = {
  festival: "Festival", cat1: "CAT 1", cat2: "CAT 2", cat3: "CAT 3",
  cat4: "CAT 4", cat5: "CAT 5", cat6: "CAT 6",
  category2: "Category 2", platinum_tribune: "Platinum Tribune",
  platinum_floor: "Platinum Floor", vip_package: "VIP Package",
};

export default function StageMapper({ event, onBack, onSaved }) {
  const [categories, setCategories] = useState([]);
  const [mapping, setMapping] = useState(event.zone_mapping || {});
  const [hoveredZone, setHoveredZone] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/events/${event.id}/categories`).then((res) => setCategories(res.data));
  }, []);

  const layout = event.layout_type;
  const zones = ZONES_BY_LAYOUT[layout] || [];

  if (!layout) {
    return (
      <div className="min-h-screen bg-[#0B0C10] text-white p-10">
        <button onClick={onBack} className="text-gray-400 hover:text-white mb-4 text-sm">← Kembali</button>
        <p className="text-amber-400">
          Event ini belum punya "Tipe Layout Panggung". Set dulu di halaman Edit Event.
        </p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0C10] text-white p-10">
        <button onClick={onBack} className="text-gray-400 hover:text-white mb-4 text-sm">← Kembali</button>
        <p className="text-amber-400">
          Belum ada kategori tiket untuk event ini. Tambahkan dulu lewat "Kelola Tiket".
        </p>
      </div>
    );
  }

  const handleMap = (zoneId, categoryId) => {
    setMapping({ ...mapping, [zoneId]: categoryId ? Number(categoryId) : null });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("zone_mapping", JSON.stringify(mapping));
      await api.put(`/events/${event.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan mapping");
    } finally {
      setSaving(false);
    }
  };

  const MapComponent = layout === "arena" ? SeatMap : SeatMapArenaX;

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white p-10">
      <button onClick={onBack} className="text-gray-400 hover:text-white mb-4 text-sm">← Kembali</button>
      <h1 className="text-2xl font-bold mb-1">Atur Denah — {event.nama}</h1>
      <p className="text-gray-400 text-sm mb-8">
        Pasangkan tiap zona panggung dengan kategori tiket yang sudah dibuat.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#111520] rounded-2xl p-4 border border-gray-800">
          <MapComponent
            selectedId={hoveredZone}
            onSelect={() => {}}
            onHover={setHoveredZone}
          />
        </div>

        <div className="space-y-4">
          {zones.map((zoneId) => (
            <div
              key={zoneId}
              onMouseEnter={() => setHoveredZone(zoneId)}
              onMouseLeave={() => setHoveredZone(null)}
              className={`flex items-center justify-between gap-4 p-3 rounded-xl border transition-all ${
                hoveredZone === zoneId ? "border-amber-400 bg-white/5" : "border-gray-800"
              }`}
            >
              <span className="font-medium text-sm">{ZONE_LABELS[zoneId] || zoneId}</span>
              <select
                value={mapping[zoneId] || ""}
                onChange={(e) => handleMap(zoneId, e.target.value)}
                className="bg-[#151B24] border border-gray-700 rounded-lg px-3 py-2 text-sm w-56"
              >
                <option value="">— Belum dipasangkan —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nama_kategori} (Rp{Number(c.harga).toLocaleString("id-ID")})
                  </option>
                ))}
              </select>
            </div>
          ))}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-orange-600 hover:bg-orange-700 py-3 rounded-xl font-semibold mt-4"
          >
            {saving ? "Menyimpan..." : "Simpan Mapping"}
          </button>
        </div>
      </div>
    </div>
  );
}