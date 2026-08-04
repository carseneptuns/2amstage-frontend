import React from "react";
import AboutEvent from "../../components/AboutEvent";
import { concertData } from "../../components/DashboardCard";

export default function ConcertDetail({ selectedArtist, onBack, onBuyTicket }) {
  const concert = concertData.find((c) => c.id === selectedArtist);

  return (
    <div className="w-full">
      <AboutEvent concert={concert} onBack={onBack} onBuyTicket={onBuyTicket} />
    </div>
  );
}
