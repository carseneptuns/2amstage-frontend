// Seat categories for the venue map.
// `hex` drives the fill/stroke of each zone in <SeatMap />.
// `left` is a fictional "tickets remaining" count used to compute availability.
export const categories = [
  { id: "festival", label: "Festival", desc: "Berdiri, dekat panggung", price: 2450000, left: 14, hex: "#ff2f7e" },
  { id: "cat1", label: "Category 1", desc: "Kursi bernomor, pandangan terbaik", price: 3150000, left: 5, hex: "#c9bdff" },
  { id: "cat2", label: "Category 2", desc: "Kursi bernomor, pandangan jelas", price: 2350000, left: 22, hex: "#a996f7" },
  { id: "cat3", label: "Category 3", desc: "Kursi bernomor", price: 1650000, left: 38, hex: "#8a76e8" },
  { id: "cat4", label: "Category 4", desc: "Sisi panggung, pandangan menyamping", price: 1350000, left: 9, hex: "#f2b807" },
  { id: "cat5", label: "Category 5", desc: "Tribun atas", price: 950000, left: 64, hex: "#6a58c9" },
  { id: "cat6", label: "Category 6", desc: "Tribun atas, sisi terluar", price: 650000, left: 31, hex: "#c98f1f" },
];

export const setlist = [
  { title: "Neon Skyline", tag: "Opener" },
  { title: "Glass Heart", tag: "" },
  { title: "Echo Chamber", tag: "" },
  { title: "Wildfire (Interlude)", tag: "Interlude" },
  { title: "Paper Moon", tag: "" },
  { title: "Static & Stars", tag: "" },
  { title: "Afterglow", tag: "Akustik" },
  { title: "Neon Skyline (Reprise)", tag: "Encore" },
];

export function rupiah(n) {
  return "Rp" + n.toLocaleString("id-ID");
}

export function ticketsLeft(left) {
  if (left <= 6) return { label: `${left} tersisa`, tone: "low" };
  return { label: `${left} tersedia`, tone: "plenty" };
}
