import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/customer/Home";
import ConcertDetail from "./pages/customer/ConcertDetail";
import SeatBooking from "./pages/customer/SeatBooking"; // Import halaman SeatBooking yang baru

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedArtist, setSelectedArtist] = useState("lady-gaga");

  return (
    <div className="min-h-screen bg-[#070A13] text-white overflow-x-hidden">
      <Navbar onNavigate={(view) => setCurrentView(view)} />

      <div className="pt-[90px]">
        {/* Tampilan Halaman Utama (Home) */}
        {currentView === "home" && (
          <Home
            onSelectArtist={(artistKey) => {
              setSelectedArtist(artistKey);
              setCurrentView("detail-konser");
            }}
          />
        )}

        {/* Tampilan Halaman Detail Konser */}
        {currentView === "detail-konser" && (
          <ConcertDetail 
            selectedArtist={selectedArtist}
            onBack={() => setCurrentView("home")}
            onBuyTicket={() => setCurrentView("beli-tiket")}
          />
        )}

        {/* Tampilan Halaman Pembelian Tiket & Seat Booking */}
        {currentView === "beli-tiket" && (
          <SeatBooking
            selectedArtist={selectedArtist}
            onBack={() => setCurrentView("detail-konser")}
          />
        )}

        {/* Tampilan Halaman Login */}
        {currentView === "login" && (
          <Login onSwitchToRegister={() => setCurrentView("register")} />
        )}

        {/* Tampilan Halaman Register */}
        {currentView === "register" && (
          <Register onSwitchToLogin={() => setCurrentView("login")} />
        )}
      </div>
    </div>
  );
}

export default App;