import React from "react";
import Aboutgaga from "../../components/Aboutgaga";
import AboutJB from "../../components/AboutJB";
import Aboutswift from "../../components/aboutswift";
import AboutAriana from "../../components/aboutariana";
import AboutThenbhd from "../../components/aboutnbhd";

export default function ConcertDetail({ selectedArtist, onBack, onBuyTicket }) {
  const renderDetailContent = () => {
    switch (selectedArtist) {
      case "justin-bieber":
        return <AboutJB onBack={onBack} onBuyTicket={onBuyTicket} />;
      case "taylor-swift":
        return <Aboutswift artistId={selectedArtist} onBack={onBack} onBuyTicket={onBuyTicket} />;
      case "ariana-grande":
        return <AboutAriana onBack={onBack} onBuyTicket={onBuyTicket} />;
      case "the-neighbourhood":
        return <AboutThenbhd onBack={onBack} onBuyTicket={onBuyTicket} />;
      case "lady-gaga":
      default:
        return <Aboutgaga artistId={selectedArtist} onBack={onBack} onBuyTicket={onBuyTicket} />;
    }
  };

  return (
    <div className="w-full">
      {renderDetailContent()}
    </div>
  );
}
