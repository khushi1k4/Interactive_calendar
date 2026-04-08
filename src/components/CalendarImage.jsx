export default function CalendarImage({ imageUrl, monthName }) {
  return (
    // Reduced height: h-32 on mobile, h-40 on desktop
    <div className="relative h-32 md:h-40 w-full overflow-hidden transition-all duration-700 bg-stone-200">
      
      {/* 🛠️ Compact Detail: The "Hanging Hole" */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30">
        <div className="w-2 h-2 bg-stone-900/40 rounded-full shadow-inner border border-white/10" />
      </div>

      <img 
        key={imageUrl} 
        src={imageUrl} 
        className="w-full h-full object-cover transition-opacity duration-1000"
        alt={monthName}
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb";
        }}
      />
      
      {/* Tighter Gradient for better contrast on a smaller area */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      
      {/* Scaled Down Typography */}
      <div className="absolute bottom-4 left-6 md:left-8">
        <h1 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter drop-shadow-xl">
          {monthName}
        </h1>
      </div>
    </div>
  );
}