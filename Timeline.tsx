import { motion } from "motion/react";
import { Church, GlassWater, Mountain, PartyPopper } from "lucide-react";

const events = [
  {
    time: "13:00",
    title: "Kirchliche Trauung",
    location: "Kapelle St. Georg, Schliersee",
    description: "Wir sagen Ja! Kommt gerne schon etwas früher an.",
    icon: Church,
  },
  {
    time: "14:30",
    title: "Sektempfang",
    location: "Vor der Kapelle",
    description: "Anstoßen auf das frisch vermählte Paar.",
    icon: GlassWater,
  },
  {
    time: "15:30",
    title: "Spaziergang zur Alm",
    location: "Weg zur Stögeralm",
    description: "Ein gemütlicher 20-minütiger Spaziergang mit Ausblick. Getränke für den Weg stehen bereit.",
    icon: Mountain,
  },
  {
    time: "16:30",
    title: "Feier & Abendessen",
    location: "Stögeralm Schliersee",
    description: "Bayerische Schmankerl, Musik und Tanz bis in die Nacht.",
    icon: PartyPopper,
  },
];

export default function Timeline() {
  return (
    <section className="py-24 px-6 bg-wedding-beige/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-wedding-brown mb-4 block">Der Ablauf</span>
          <h2 className="text-4xl">Unser Tag</h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-wedding-brown/10 via-wedding-brown/40 to-wedding-brown/10 hidden md:block"></div>

          <div className="space-y-12 md:space-y-24">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 w-full ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="bg-white p-8 rounded-[32px] shadow-sm border border-wedding-beige card-hover">
                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}>
                      <span className="text-wedding-brown font-serif text-3xl">{event.time}</span>
                      <div className="h-px flex-1 bg-wedding-beige/50"></div>
                    </div>
                    <h3 className="text-2xl mb-2 text-wedding-dark-green">{event.title}</h3>
                    <p className="text-sm text-wedding-brown font-medium mb-3 uppercase tracking-wider">{event.location}</p>
                    <p className="text-wedding-dark/70 font-light leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Icon Circle */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-wedding-dark-green text-white shadow-xl border-4 border-wedding-off-white">
                  <event.icon size={24} />
                </div>

                {/* Spacer for Desktop */}
                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
