function Hero() {
  return (
    <section
      style={{
        height: "80vh",
        background:
          "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1500&q=80') center/cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
        Fresh & Organic Groceries
      </h1>

      <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
        Healthy food delivered fresh to your doorstep.
      </p>

      <button
        style={{
          padding: "12px 25px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Shop Now
      </button>
    </section>
  );
}

export default Hero;