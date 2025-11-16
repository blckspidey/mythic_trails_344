import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, Users, ExternalLink } from "lucide-react";
import trail1 from "@/assets/trail-1.jpg";
import { trails } from "@/data/trails";

const TrailDetail = () => {
  const { id } = useParams();
  const trail = trails.find((t) => t.id === Number(id));
 
 if (!trail) {
    return (
      <div className="min-h-screen pt-20 pb-16 text-center text-parchment">
        <h1 className="text-4xl font-bold mb-4">Trail Not Found</h1>
        <Link to="/trails">
          <Button className="bg-card border-temple-gold text-parchment">
            <ArrowLeft className="mr-2" /> Back to Trails
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/trails">
          <Button
            variant="ghost"
            className="text-temple-gold hover:text-soft-gold hover:bg-soft-gold/10"
          >
            <ArrowLeft className="mr-2" />
            Back to Temple Trails
          </Button>
        </Link>
      </div>

      {/* Hero Title Section */}
      <section className="relative py-16 bg-gradient-to-b from-deep-bronze via-card to-background border-y border-temple-gold/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-temple-gold/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-soft-gold/30 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-heading font-black text-gradient-gold mb-4 uppercase tracking-wider animate-divine-reveal">
            {trail.title}
          </h1>
          <p className="text-2xl text-parchment/80 font-heading italic animate-divine-reveal" style={{ animationDelay: "0.2s" }}>
            {trail.subtitle}
          </p>
        </div>

        {/* Decorative Borders */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-temple-gold to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-temple-gold to-transparent" />
      </section>

      {/* Temple Cutout - Large Featured Image */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="relative group">
            <img
              src={trail.image}
              alt={trail.title}
              className="w-full h-[600px] object-cover rounded-lg shadow-temple border-4 border-temple-gold/30 group-hover:border-temple-gold transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-bronze/60 to-transparent rounded-lg" />
            
            {/* Floating Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-soft-gold/60 rounded-full animate-[float-up_6s_ease-in-out_infinite]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    bottom: `${Math.random() * 20}%`,
                    animationDelay: `${Math.random() * 6}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 px-4 bg-card">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-heading font-bold text-gradient-gold mb-8 text-center uppercase tracking-wide">
            Overview of This Sacred Trail
          </h2>

          <div className="grid md:grid-cols-2 gap-8 bg-background/50 border-2 border-temple-gold/20 rounded-lg p-8">
            {[
              { label: "Civilization", value: trail.civilization, icon: Users },
              { label: "Built In", value: trail.builtIn, icon: Calendar },
              { label: "Primary Deity", value: trail.deity, icon: MapPin },
              { label: "Architectural Style", value: trail.architectureStyle, icon: Users },
              { label: "Trail Difficulty", value: trail.difficulty, icon: Users },
              { label: "Best Time to Visit", value: trail.bestTime, icon: Calendar },
              { label: "Region", value: trail.region, icon: MapPin },
              { label: "Trail Length", value: trail.trailLength, icon: MapPin },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 animate-divine-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <item.icon className="text-temple-gold mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-temple-gold/80 font-nav text-sm tracking-wide mb-1">
                    {item.label}
                  </p>
                  <p className="text-parchment font-body text-lg">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-heading font-bold text-gradient-gold mb-8 text-center uppercase tracking-wide">
            Temple Gallery
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {trail.images.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border-2 border-temple-gold/30 hover:border-temple-gold transition-all duration-500 shadow-temple hover:shadow-divine animate-divine-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-bronze/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sacred Story Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto max-w-4xl">
          <div className="relative bg-[#f4e4c1] text-[#3a2817] rounded-lg p-12 shadow-temple border-4 border-temple-gold/40">
            {/* Parchment Effect */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-30 pointer-events-none rounded-lg" />

            <div className="relative space-y-8">
              <div>
                <h3 className="text-3xl font-heading font-bold text-[#8b6914] mb-4 uppercase tracking-wide">
                  Origin Story
                </h3>
                <p className="font-body text-lg leading-relaxed whitespace-pre-line">
                  {trail.story}
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-heading font-bold text-[#8b6914] mb-4 uppercase tracking-wide">
                  History Timeline
                </h3>
                <div className="font-body text-lg leading-relaxed whitespace-pre-line">
                  {trail.history}
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-heading font-bold text-[#8b6914] mb-4 uppercase tracking-wide">
                  Mythological Background
                </h3>
                <p className="font-body text-lg leading-relaxed whitespace-pre-line">
                  {trail.mythology}
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-heading font-bold text-[#8b6914] mb-4 uppercase tracking-wide">
                  Architectural Notes
                </h3>
                <div className="font-body text-lg leading-relaxed whitespace-pre-line">
                  {trail.architecture}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-heading font-bold text-gradient-gold mb-8 text-center uppercase tracking-wide">
            Temple Location
          </h2>

          <div className="relative h-96 rounded-lg overflow-hidden border-4 border-temple-gold/40 shadow-temple">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.0${trail.location.lat}!2d${trail.location.lng}!3d${trail.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ5JzU0LjUiTiA3OcKwNTUnMTEuNiJF!5e0!3m2!1sen!2sin!4v1234567890`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Temple Location"
            />
          </div>

          <div className="text-center mt-6">
            <Button
              className="bg-gradient-to-r from-temple-gold to-soft-gold text-deep-bronze hover:shadow-divine transition-all"
            >
              <ExternalLink className="mr-2" size={18} />
              Open in Google Maps
            </Button>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <div className="container mx-auto px-4 text-center">
        <Link to="/trails">
          <Button
            size="lg"
            className="bg-card border-2 border-temple-gold/40 text-parchment shadow-temple hover:shadow-divine hover:border-temple-gold transition-all duration-500 font-nav tracking-wide"
          >
            <ArrowLeft className="mr-2" />
            BACK TO TEMPLE TRAILS
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TrailDetail;
