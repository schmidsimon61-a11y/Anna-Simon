import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Timeline from "./components/Timeline";
import Dresscode from "./components/Dresscode";
import Accommodation from "./components/Accommodation";
import PhotoGift from "./components/PhotoGift";
import RSVP from "./components/RSVP";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [selectedHotel, setSelectedHotel] = useState({ id: "", name: "" });

  // Load from localStorage on mount
  useEffect(() => {
    const savedHotelId = localStorage.getItem("wedding_hotel_id");
    const savedHotelName = localStorage.getItem("wedding_hotel_name");
    if (savedHotelId && savedHotelName) {
      setSelectedHotel({ id: savedHotelId, name: savedHotelName });
    }
  }, []);

  const handleHotelSelect = (id: string, name: string) => {
    setSelectedHotel({ id, name });
    localStorage.setItem("wedding_hotel_id", id);
    localStorage.setItem("wedding_hotel_name", name);
    
    // Smooth scroll to RSVP after selection
    const rsvpSection = document.getElementById("rsvp");
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen selection:bg-wedding-beige selection:text-wedding-dark">
      <Hero />
      <Story />
      <Timeline />
      <Dresscode />
      <Accommodation 
        selectedId={selectedHotel.id} 
        onSelect={handleHotelSelect} 
      />
      <PhotoGift />
      <RSVP prefilledAccommodation={selectedHotel.name} />
      <Contact />
      <Footer />
    </main>
  );
}
