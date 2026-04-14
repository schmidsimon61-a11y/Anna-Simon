import { motion } from "motion/react";

export default function Story() {
  return (
    <section className="py-24 px-6 md:py-40 bg-wedding-off-white relative overflow-hidden">
      {/* Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-wedding-brown/40 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-xs uppercase tracking-[0.4em] text-wedding-brown mb-8 block font-semibold">Unsere Geschichte</span>
          <h2 className="text-4xl md:text-6xl mb-12 leading-[1.1] text-wedding-dark-green">
            Vom ersten Date am See <br />
            <span className="italic font-normal serif">bis zum Ja-Wort in den Bergen.</span>
          </h2>
          <div className="space-y-8 text-xl text-wedding-dark/70 leading-relaxed font-light max-w-2xl mx-auto">
            <p>
              Unser erstes Date am Schliersee war der Beginn einer Reise, die uns heute hierher führt. 
              Zwischen Berggipfeln und glitzerndem Wasser haben wir nicht nur die Natur, 
              sondern vor allem einander lieben gelernt.
            </p>
            <p>
              Als echte Bayern schlägt unser Herz für die Heimat. Deshalb gibt es für uns keinen 
              schöneren Ort, um unser gemeinsames Leben zu besiegeln, als dort, wo alles begann.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
