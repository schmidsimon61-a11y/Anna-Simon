import React, { useState } from "react";
import { motion } from "motion/react";
import { MessageSquare, Send } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Contact submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-wedding-off-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <MessageSquare className="mx-auto mb-6 text-wedding-brown" size={32} />
          <h2 className="text-3xl mb-4">Noch Fragen?</h2>
          <p className="text-wedding-dark/70 font-light">
            Schreib uns einfach eine kurze Nachricht, wenn du noch etwas wissen möchtest.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center p-12 bg-white rounded-[40px] border border-wedding-beige shadow-sm">
            <p className="text-wedding-brown font-medium">Deine Nachricht wurde gesendet. Wir melden uns!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-wedding-brown font-medium ml-4">Dein Name</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-8 py-4 rounded-full bg-white border border-wedding-beige focus:outline-none focus:ring-2 focus:ring-wedding-brown/20 transition-all font-light"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-wedding-brown font-medium ml-4">Deine Nachricht</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-8 py-5 rounded-[32px] bg-white border border-wedding-beige focus:outline-none focus:ring-2 focus:ring-wedding-brown/20 transition-all font-light resize-none"
              />
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full py-4 rounded-full bg-wedding-dark text-white font-medium hover:bg-wedding-brown transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
              {!isSubmitting && <Send size={18} />}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
