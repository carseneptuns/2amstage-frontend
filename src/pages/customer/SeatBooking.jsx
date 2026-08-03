import React from "react";
import TicketPage from "../../components/TicketPage";
import SeatMap from "../../components/SeatMap";
import SeatMapArenaX, { categories as arenaXCategories } from "../../components/SeatMapArenaX";
import VenueMapCatwalkStage, { categories as catwalkCategories } from "../../components/VenueMapCatwalkStage";
import VenueMapFanStage, { categories as fanStageCategories } from "../../components/VenueMapFanStage";

export default function SeatBooking({ selectedArtist, onBack }) {
  const getSeatMapConfig = () => {
    if (selectedArtist === "justin-bieber") {
      return { Component: SeatMapArenaX, categories: arenaXCategories };
    }
    if (selectedArtist === "ariana-grande") {
      return { Component: VenueMapCatwalkStage, categories: catwalkCategories };
    }
    if (selectedArtist === "taylor-swift") {
      return { Component: VenueMapFanStage, categories: fanStageCategories };
    }
    return { Component: SeatMap };
  };

  const seatMapConfig = getSeatMapConfig();

  return (
    <div className="w-full">
      <TicketPage
        onBack={onBack}
        seatMap={seatMapConfig}
      />
    </div>
  );
}