import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/customer/Home";
import ConcertDetail from "./pages/customer/ConcertDetail";
import SeatBooking from "./pages/customer/SeatBooking";
import PaymentPage from "./components/PaymentPage";
import { AuthProvider } from "./context/AuthContext";

function AppContent() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedArtist, setSelectedArtist] = useState("lady-gaga");
  const [order, setOrder] = useState(null);

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

        {/* tambahkan blok ini */}
        {currentView === "pembayaran" && (
          <PaymentPage
            order={order}
            onBack={() => setCurrentView("beli-tiket")}
            onConfirm={() => setCurrentView("home")}
          />
        )}

        {currentView === "login" && (
          <Login
            onSwitchToRegister={() => setCurrentView("register")}
            onLoginSuccess={(user) => {
              if (user.role === "super_admin" || user.role === "organizer") {
                setCurrentView("dashboard");
              } else if (user.role === "petugas") {
                setCurrentView("scanner");
              } else {
                setCurrentView("home");
              }
            }}
          />
        )}

        {currentView === "register" && (
          <Register onSwitchToLogin={() => setCurrentView("login")} />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}