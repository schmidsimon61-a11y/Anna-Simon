export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-wedding-off-white border-t border-wedding-beige text-center">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-serif mb-4">Anna & Simon</h3>
        <p className="text-xs uppercase tracking-[0.4em] text-wedding-brown/60 mb-8">29. Mai 2026 · Schliersee</p>
        <div className="w-12 h-[1px] bg-wedding-brown/20 mx-auto mb-8"></div>
        <p className="text-[10px] uppercase tracking-widest text-wedding-dark/40">
          © {new Date().getFullYear()} — Mit Liebe gemacht für unseren großen Tag
        </p>
      </div>
    </footer>
  );
}
