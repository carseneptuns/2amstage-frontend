import { useState, useEffect } from "react";
import api from "../../api/axios";
import TicketPage from "../../components/TicketPage";
import SeatMap from "../../components/SeatMap";
import SeatMapArenaX from "../../components/SeatMapArenaX";
import VenueMapCatwalkStage from "../../components/VenueMapCatwalkStage";
import VenueMapFanStage from "../../components/VenueMapFanStage";
import VenueMapDomeStage from "../../components/VenueMapDomeStage";

// map layout_type dari database ke komponen SVG-nya
const LAYOUT_COMPONENTS = {
  arena: SeatMap,
  arena_x: SeatMapArenaX,
  catwalk: VenueMapCatwalkStage,
  fan_stage: VenueMapFanStage,
  dome_stage: VenueMapDomeStage,
};

const FALLBACK_COLORS = ["#f2b807", "#6a58c9", "#8a76e8", "#a996f7", "#ff6b9d", "#3ddc84"];

function ticketsLeftInfo(sisa, total) {
  const percent = total > 0 ? (sisa / total) * 100 : 0;
  if (sisa === 0) return { label: "Habis", tone: "low" };
  if (percent <= 20) return { label: `Sisa ${sisa} tiket`, tone: "low" };
  return { label: `Sisa ${sisa} tiket`, tone: "ok" };
}

export default function SeatBooking({ eventId, onBack, onProceedToPayment }) {
  const [event, setEvent] = useState(null);
  const [ticketCategories, setTicketCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    Promise.all([
      api.get(`/events/${eventId}`),
      api.get(`/events/${eventId}/categories`),
    ])
      .then(([eventRes, catRes]) => {
        setEvent(eventRes.data);
        setTicketCategories(catRes.data);
      })
      .catch((err) => setError(err.response?.data?.message || "Gagal memuat data event"))
      .finally(() => setLoading(false));
  }, [eventId]);

  if (loading) return <p className="text-white text-center py-20">Memuat...</p>;
  if (error) return <p className="text-red-400 text-center py-20">{error}</p>;
  if (!event) return null;

  if (!event.layout_type || !event.zone_mapping) {
    return (
      <p className="text-amber-400 text-center py-20">
        Denah tempat duduk untuk event ini belum diatur oleh admin.
      </p>
    );
  }

  const SeatMapComponent = LAYOUT_COMPONENTS[event.layout_type] || SeatMap;

  // gabungkan zone_mapping (data-id SVG -> ticket_category_id) dengan data kategori asli
  const categories = Object.entries(event.zone_mapping)
    .filter(([, categoryId]) => categoryId) // skip zona yang belum di-mapping
    .map(([zoneId, categoryId], index) => {
      const cat = ticketCategories.find((c) => c.id === categoryId);
      if (!cat) return null;
      return {
        id: zoneId, // WAJIB sama dengan data-id di SVG, biar PricePanel nyambung
        ticket_category_id: cat.id, // dipakai nanti pas submit order asli
        label: cat.nama_kategori,
        desc: `Kuota tersedia`,
        price: Number(cat.harga),
        left: cat.sisa_kuota, // dipakai PricePanel buat batas max qty & label sisa tiket
        hex: FALLBACK_COLORS[index % FALLBACK_COLORS.length],
      };
    })
    .filter(Boolean);

  return (
    <div className="w-full">
      <TicketPage
        onBack={onBack}
        seatMap={{ Component: SeatMapComponent, categories }}
        onProceedToPayment={onProceedToPayment}
        event={event}
      />
    </div>
  );
}