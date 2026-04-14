import { motion } from "motion/react";

export default function Dresscode() {
  return (
    <section className="py-24 px-6 bg-wedding-off-white">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-12 rounded-[40px] text-center shadow-sm border border-wedding-beige"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-wedding-brown mb-6 block">Kleidung</span>
          <h2 className="text-3xl mb-6">Dresscode</h2>
          <p className="text-2xl font-serif italic text-wedding-brown mb-6">
            “Bayrisch festlich, schick leger”
          </p>
          <p className="text-wedding-dark/70 font-light leading-relaxed">
            Wir freuen uns, wenn ihr in Tracht kommt, aber das ist natürlich kein Muss. 
            Hauptsache, ihr fühlt euch wohl und seid bereit für einen Tag in den Bergen.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
