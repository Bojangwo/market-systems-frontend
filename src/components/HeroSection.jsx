function HeroSection() {
  return (
    <section
      className="relative h-[80vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1542838132-92c53300491e')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Fresh Organic Products
        </h1>

        <p className="text-white text-xl max-w-2xl mb-8">
          Healthy food delivered fresh from trusted farmers
          and suppliers.
        </p>

        <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
          Shop Now
        </button>
      </div>
    </section>
  );
}

export default HeroSection;