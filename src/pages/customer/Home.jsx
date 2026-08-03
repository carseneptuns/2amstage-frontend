import React from "react";
import HeroSection from "../../components/Hero";
import UpcomingConcertsSection from "../../components/DashboardCard";
import EventStage from "../../components/EventStage";
import Footer from "../../components/Footer";

export default function Home({ onSelectArtist }) {
  return (
    <>
      <HeroSection />
      <UpcomingConcertsSection onSelectArtist={onSelectArtist} />
      <EventStage />
      <Footer />
    </>
  );
}