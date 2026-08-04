import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/customer/Home";
import ConcertDetail from "./pages/customer/ConcertDetail";
import SeatBooking from "./pages/customer/SeatBooking";
import PaymentPage from "./components/PaymentPage";
import MyTickets from "./components/MyTickets"; // tambahkan ini
import { concertData } from "./components/DashboardCard"; // sesuaikan path kalau concertData-nya sudah dipindah

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedArtist, setSelectedArtist] = useState("lady-gaga");
  const [order, setOrder] = useState(null);
  const [tickets, setTickets] = useState([]); // tambahkan ini

  return (
    <div className="min-h-screen bg-[#070A13] text-white overflow-x-hidden font-midnights">
      <Navbar onNavigate={(view) => setCurrentView(view)} />

      <div className="pt-[90px]">
        {currentView === "home" && (
          <Home
            onSelectArtist={(artistKey) => {
              setSelectedArtist(artistKey);
              setCurrentView("detail-konser");
            }}
          />
        )}

        {currentView === "detail-konser" && (
          <ConcertDetail
            selectedArtist={selectedArtist}
            onBack={() => setCurrentView("home")}
            onBuyTicket={() => setCurrentView("beli-tiket")}
          />
        )}

        {currentView === "beli-tiket" && (
          <SeatBooking
            selectedArtist={selectedArtist}
            onBack={() => setCurrentView("detail-konser")}
            onProceedToPayment={(order) => {
              setOrder(order);
              setCurrentView("pembayaran");
            }}
          />
        )}

        {currentView === "pembayaran" && (
          <PaymentPage
            order={order}
            onBack={() => setCurrentView("beli-tiket")}
            onConfirm={(paymentInfo) => {
              const concert = concertData.find((c) => c.id === selectedArtist);
              setTickets((prev) => [
                {
                  id: Date.now(),
                  code: "2AMS-" + Date.now().toString(36).toUpperCase(),
                  artistName: concert?.name || order.category.label,
                  subtitle: concert?.subtitle,
                  venue: concert?.venue,
                  concertDate: concert?.date,
                  category: order.category,
                  qty: order.qty,
                  total: paymentInfo.total,
                  method: paymentInfo.method,
                  bank: paymentInfo.bank,
                  purchasedAt: new Date().toISOString(),
                  status: "lunas",
                },
                ...prev,
              ]);
              setCurrentView("tiket-saya");
            }}
          />
        )}

        {/* tambahkan blok ini */}
        {currentView === "tiket-saya" && (
          <MyTickets tickets={tickets} onBack={() => setCurrentView("home")} />
        )}

        {currentView === "login" && (
          <Login onSwitchToRegister={() => setCurrentView("register")} />
        )}

        {currentView === "register" && (
          <Register onSwitchToLogin={() => setCurrentView("login")} />
        )}
      </div>
    </div>
  );
}

export default App;