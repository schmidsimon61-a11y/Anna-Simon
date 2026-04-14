import { motion } from "motion/react";
import { Check } from "lucide-react";

const hotels = [
  {
    id: "hotel-am-see",
    name: "Hotel am See",
    distance: "500m von der Kapelle",
    description: "Direkt am Wasser gelegen, perfekt für einen morgendlichen Sprung in den See.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "alpenhof",
    name: "Alpenhof Schliersee",
    distance: "1.2km von der Kapelle",
    description: "Traditionelles bayerisches Hotel mit Wellnessbereich.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "gaestehaus-bergblick",
    name: "Gästehaus Bergblick",
    distance: "2.0km von der Kapelle",
    description: "Gemütliche Pension mit familiärer Atmosphäre.",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2070&auto=format&fit=crop",
  },
];

interface Props {
  selectedId: string;
  onSelect: (id: string, name: string) => void;
}

export default function Accommodation({ selectedId, onSelect }: Props) {
  return (
    <section className="py-24 px-6 bg-alpine-gradient">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-wedding-brown mb-4 block">Übernachtung</span>
          <h2 className="text-4xl md:text-5xl mb-6">Schlafen in Schliersee</h2>
          <p className="text-wedding-dark/70 max-w-2xl mx-auto font-light leading-relaxed">
            Damit ihr den Abend entspannt ausklingen lassen könnt, haben wir hier ein paar Empfehlungen für euch zusammengestellt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {hotels.map((hotel) => (
            <motion.div
              key={hotel.id}
              whileHover={{ y: -12 }}
              className={`group bg-white rounded-[40px] overflow-hidden shadow-sm border transition-all duration-500 ${
                selectedId === hotel.id ? "border-wedding-dark-green ring-2 ring-wedding-dark-green/20" : "border-wedding-beige"
              }`}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold text-wedding-dark-green">
                  {hotel.distance}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl mb-3 text-wedding-dark-green">{hotel.name}</h3>
                <p className="text-wedding-dark/70 text-sm font-light mb-8 leading-relaxed">
                  {hotel.description}
                </p>
                <button
                  onClick={() => onSelect(hotel.id, hotel.name)}
                  className={`w-full py-4 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    selectedId === hotel.id
                      ? "bg-wedding-dark-green text-white shadow-lg shadow-wedding-dark-green/20"
                      : "bg-wedding-beige/20 text-wedding-dark hover:bg-wedding-dark-green hover:text-white"
                  }`}
                >
                  {selectedId === hotel.id ? (
                    <>
                      <Check size={18} /> Ausgewählt
                    </>
                  ) : (
                    "Hier übernachte ich"
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
