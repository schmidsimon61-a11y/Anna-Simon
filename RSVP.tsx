import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, Plus, Trash2, Send } from "lucide-react";

interface Props {
  prefilledAccommodation: string;
}

export default function RSVP({ prefilledAccommodation }: Props) {
  const [name, setName] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [arrival, setArrival] = useState<"day_before" | "wedding_day" | "">("");
  const [additionalGuests, setAdditionalGuests] = useState<string[]>([]);
  const [attendance, setAttendance] = useState<"yes" | "no" | "">("");
  const [food, setFood] = useState("");
  const [shuttle, setShuttle] = useState(false);
  const [accommodation, setAccommodation] = useState(prefilledAccommodation);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalGuests = adults + children;

  useEffect(() => {
    setAccommodation(prefilledAccommodation);
  }, [prefilledAccommodation]);

  const handleAddGuest = () => {
    setAdditionalGuests([...additionalGuests, ""]);
  };

  const handleRemoveGuest = (index: number) => {
    const newGuests = [...additionalGuests];
    newGuests.splice(index, 1);
    setAdditionalGuests(newGuests);
  };

  const handleGuestNameChange = (index: number, value: string) => {
    const newGuests = [...additionalGuests];
    newGuests[index] = value;
    setAdditionalGuests(newGuests);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      name,
      adults,
      children,
      totalGuests,
      arrival,
      additionalGuests,
      attendance,
      food,
      shuttle,
      accommodation,
      notes,
    };

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        localStorage.setItem("wedding_rsvp_name", name);
      }
    } catch (error) {
      console.error("RSVP submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="rsvp" className="py-24 px-6 bg-wedding-beige/20">
        <div className="max-w-2xl mx-auto text-center bg-white p-12 rounded-[40px] shadow-sm border border-wedding-beige">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send size={32} />
            </div>
            <h2 className="text-3xl mb-4">Vielen Dank!</h2>
            <p className="text-wedding-dark/70 font-light">
              Deine Antwort wurde erfolgreich übermittelt. Wir freuen uns auf dich!
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="relative py-24 px-6 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-wedding-off-white/90 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-wedding-brown mb-4 block">Zusage</span>
          <h2 className="text-4xl md:text-5xl mb-6">RSVP</h2>
          <p className="text-wedding-dark/70 font-light max-w-xl mx-auto">
            Bitte gib uns bis zum 1. März 2026 Bescheid, ob du dabei bist. Wir freuen uns auf jede Antwort!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Basic Info Card */}
          <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[40px] shadow-sm border border-wedding-beige space-y-8">
            <h3 className="text-xl font-serif text-wedding-dark-green border-b border-wedding-beige pb-4">Persönliche Angaben</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-wedding-brown uppercase tracking-widest ml-1">Dein Name</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Vor- und Nachname"
                  className="w-full px-6 py-4 rounded-2xl bg-wedding-off-white/50 border border-wedding-beige focus:outline-none focus:ring-2 focus:ring-wedding-dark-green/20 transition-all font-light"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-wedding-brown uppercase tracking-widest ml-1">Bist du dabei?</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setAttendance("yes")}
                    className={`flex-1 py-4 rounded-2xl border transition-all ${
                      attendance === "yes" 
                        ? "bg-wedding-dark-green text-white border-wedding-dark-green" 
                        : "bg-wedding-off-white/50 border-wedding-beige text-wedding-dark hover:bg-wedding-beige/30"
                    }`}
                  >
                    Ja!
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance("no")}
                    className={`flex-1 py-4 rounded-2xl border transition-all ${
                      attendance === "no" 
                        ? "bg-wedding-dark text-white border-wedding-dark" 
                        : "bg-wedding-off-white/50 border-wedding-beige text-wedding-dark hover:bg-wedding-beige/30"
                    }`}
                  >
                    Nein
                  </button>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {attendance === "yes" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="space-y-10"
              >
                {/* Guests & Arrival Card */}
                <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[40px] shadow-sm border border-wedding-beige space-y-8">
                  <h3 className="text-xl font-serif text-wedding-dark-green border-b border-wedding-beige pb-4">Gäste & Anreise</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-wedding-brown uppercase tracking-widest ml-1">Wie viele Erwachsene?</label>
                      <input
                        type="number"
                        min="1"
                        value={adults}
                        onChange={(e) => setAdults(parseInt(e.target.value))}
                        className="w-full px-6 py-4 rounded-2xl bg-wedding-off-white/50 border border-wedding-beige focus:outline-none focus:ring-2 focus:ring-wedding-dark-green/20 transition-all font-light"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-wedding-brown uppercase tracking-widest ml-1">Wie viele Kinder?</label>
                      <input
                        type="number"
                        min="0"
                        value={children}
                        onChange={(e) => setChildren(parseInt(e.target.value))}
                        className="w-full px-6 py-4 rounded-2xl bg-wedding-off-white/50 border border-wedding-beige focus:outline-none focus:ring-2 focus:ring-wedding-dark-green/20 transition-all font-light"
                      />
                    </div>
                    <div className="flex flex-col justify-end pb-4">
                      <p className="text-sm text-wedding-brown font-medium">
                        Gesamtzahl Gäste: <span className="text-wedding-dark-green text-xl">{totalGuests}</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-xs font-semibold text-wedding-brown uppercase tracking-widest ml-1">Wann reist du an?</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${arrival === "day_before" ? "bg-wedding-dark-green/5 border-wedding-dark-green" : "bg-wedding-off-white/50 border-wedding-beige hover:bg-wedding-beige/20"}`}>
                        <input
                          type="radio"
                          name="arrival"
                          value="day_before"
                          checked={arrival === "day_before"}
                          onChange={() => setArrival("day_before")}
                          className="w-5 h-5 text-wedding-dark-green focus:ring-wedding-dark-green"
                        />
                        <span className="text-sm font-light">Bereits am Vortag (28. Mai)</span>
                      </label>
                      <label className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${arrival === "wedding_day" ? "bg-wedding-dark-green/5 border-wedding-dark-green" : "bg-wedding-off-white/50 border-wedding-beige hover:bg-wedding-beige/20"}`}>
                        <input
                          type="radio"
                          name="arrival"
                          value="wedding_day"
                          checked={arrival === "wedding_day"}
                          onChange={() => setArrival("wedding_day")}
                          className="w-5 h-5 text-wedding-dark-green focus:ring-wedding-dark-green"
                        />
                        <span className="text-sm font-light">Am Hochzeitstag (29. Mai)</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Details Card */}
                <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[40px] shadow-sm border border-wedding-beige space-y-8">
                  <h3 className="text-xl font-serif text-wedding-dark-green border-b border-wedding-beige pb-4">Weitere Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-wedding-brown uppercase tracking-widest ml-1">Essen</label>
                      <select
                        value={food}
                        onChange={(e) => setFood(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl bg-wedding-off-white/50 border border-wedding-beige focus:outline-none focus:ring-2 focus:ring-wedding-dark-green/20 transition-all font-light appearance-none"
                      >
                        <option value="">Bitte wählen...</option>
                        <option value="classic">Klassisch Bayerisch</option>
                        <option value="vegetarian">Vegetarisch</option>
                        <option value="vegan">Vegan</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-wedding-brown uppercase tracking-widest ml-1">Unterkunft</label>
                      <input
                        type="text"
                        value={accommodation}
                        onChange={(e) => setAccommodation(e.target.value)}
                        placeholder="Hotel / Pension"
                        className="w-full px-6 py-4 rounded-2xl bg-wedding-off-white/50 border border-wedding-beige focus:outline-none focus:ring-2 focus:ring-wedding-dark-green/20 transition-all font-light"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-wedding-off-white/50 rounded-2xl border border-wedding-beige">
                    <input
                      type="checkbox"
                      id="shuttle"
                      checked={shuttle}
                      onChange={(e) => setShuttle(e.target.checked)}
                      className="w-6 h-6 rounded border-wedding-beige text-wedding-dark-green focus:ring-wedding-dark-green"
                    />
                    <label htmlFor="shuttle" className="text-sm font-light text-wedding-dark/80">
                      Ich benötige den Shuttle-Service von der Kapelle zum Restaurant.
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-wedding-brown uppercase tracking-widest ml-1">Nachricht an uns</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Besonderheiten, Allergien oder einfach ein lieber Gruß..."
                      className="w-full px-6 py-4 rounded-2xl bg-wedding-off-white/50 border border-wedding-beige focus:outline-none focus:ring-2 focus:ring-wedding-dark-green/20 transition-all font-light resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting || !attendance}
            type="submit"
            className="w-full py-6 rounded-full bg-wedding-dark-green text-white font-medium text-xl shadow-xl shadow-wedding-dark-green/20 hover:bg-wedding-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isSubmitting ? "Wird gesendet..." : "Antwort abschicken"}
            {!isSubmitting && <Send size={22} />}
          </motion.button>
        </form>
      </div>
    </section>
  );
}
