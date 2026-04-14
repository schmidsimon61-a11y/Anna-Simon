import { motion } from "motion/react";
import { QrCode, Gift, Camera } from "lucide-react";

export default function PhotoGift() {
  return (
    <div className="bg-wedding-off-white">
      {/* Photo Section */}
      <section className="py-24 px-6 border-b border-wedding-beige bg-alpine-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Camera className="mx-auto mb-6 text-wedding-dark-green" size={48} />
            <h2 className="text-3xl md:text-5xl mb-6">Teilt eure Fotos mit uns</h2>
            <p className="text-wedding-dark/70 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Ein Bild sagt mehr als tausend Worte. Wir freuen uns riesig, wenn ihr eure schönsten Schnappschüsse des Tages mit uns teilt.
            </p>
            
            <div className="inline-block p-10 bg-white rounded-[48px] shadow-xl shadow-wedding-brown/10 border border-wedding-beige mb-8 card-hover">
              <div className="w-48 h-48 bg-wedding-beige/20 flex items-center justify-center rounded-3xl mb-6">
                <QrCode size={140} className="text-wedding-dark-green/30" />
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-wedding-brown font-bold">QR-Code Scannen</p>
            </div>
            
            <div className="mt-8">
              <a 
                href="#" 
                className="inline-flex items-center gap-2 text-wedding-dark-green font-medium hover:text-wedding-brown transition-colors group"
              >
                <span className="border-b-2 border-wedding-dark-green/20 group-hover:border-wedding-brown/40 pb-1 transition-all">Direkt zum OneDrive Upload</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-24 px-6 bg-wedding-beige/10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Gift className="mx-auto mb-6 text-wedding-brown" size={40} />
            <h2 className="text-3xl mb-6">Geschenke</h2>
            <p className="text-wedding-dark/70 font-light leading-relaxed">
              Eure Anwesenheit ist für uns das größte Geschenk. 
              Sollte uns dennoch jemand eine Freude machen wollen, 
              freuen wir uns über einen Beitrag zu unserer Hochzeitsreise.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
