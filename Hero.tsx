import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1593439322308-d4228395c445?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-wedding-dark-green/20 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-wedding-off-white/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-8xl mb-4 tracking-tight text-wedding-dark-green drop-shadow-sm">
            Anna & Simon <span className="italic font-normal">heiraten</span>
          </h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="w-32 h-[2px] bg-wedding-brown mx-auto mb-6 origin-center"
          />
          <p className="text-lg md:text-2xl font-light tracking-[0.2em] uppercase text-wedding-dark-green/80">
            29. Mai 2026 · Schliersee
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">Scrollen</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/70 to-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
}
