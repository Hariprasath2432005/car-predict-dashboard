import heroImage from "@/assets/hero-car.jpg";

const Hero = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <img 
        src={heroImage} 
        alt="Luxury car in showroom" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          CarPrice AI
        </h1>
        <p className="text-xl md:text-2xl text-foreground/90 mb-8 font-light">
          Advanced Machine Learning for Accurate Car Price Predictions
        </p>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Get instant, data-driven car valuations powered by sophisticated algorithms 
          and comprehensive market analysis
        </p>
      </div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 z-15"></div>
    </div>
  );
};

export default Hero;