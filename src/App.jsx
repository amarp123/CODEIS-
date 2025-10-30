import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroPage from "./components/HeroPage";
import AboutSection from "./components/AboutPage";
import HackathonPage from "./components/Hackathonespage";
import Clubjoinpage from "./components/Clubjoinpage";
import Gallery from "./components/Gallery";
import MeetOurTeam from "./components/Clubjoinpage";
import FooterSection from "./components/FooterSection";
import DashboardPage from "./components/DashboardPage";

import { Box } from "@mui/material";


function Home() {
  return (
    <>
      <HeroPage />
      <AboutSection />
      <HackathonPage />
      <Gallery />
      <Clubjoinpage />
      <FooterSection />

    </>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      {/* spacer so content doesn't hide under fixed navbar */}
      <Box sx={{ height: { xs: 72, md: 96 } }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/hackathons" element={<HackathonPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/team" element={<MeetOurTeam />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/footer" element={<FooterSection />} />
        
        {/* add other routes later */}
      </Routes>
    </>
  );
}
