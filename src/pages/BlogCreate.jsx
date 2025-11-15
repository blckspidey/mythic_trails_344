import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Feather, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BlogCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    region: "",
    temples: "",
    tags: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would save to a database
    toast({
      title: "Journey Recorded ✨",
      description: "Your sacred tale has been inscribed in the pilgrim's journal.",
    });
    
    setTimeout(() => {
      navigate('/blog');
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-12 bg-gradient-to-b from-deep-bronze via-background to-card">
        <div className="container mx-auto px-4">
          <Button onClick={() => navigate('/blog')} variant="ghost" className="mb-6 text-soft-gold hover:text-temple-gold">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Journals
          </Button>
          
          <div className="max-w-4xl mx-auto text-center">
            <Feather className="w-16 h-16 text-temple-gold mx-auto mb-6 glow-pulse" />
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient-gold mb-4 animate-divine-reveal">
              Write Your Journey
            </h1>
            <p className="text-xl text-parchment/70 font-body italic">
              Share your sacred experiences with fellow pilgrims
            </p>
          </div>
        </div>
      </section>

      {/* Form - Ancient Writing Desk */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <form onSubmit={handleSubmit} className="relative bg-gradient-to-br from-sandstone/20 via-card/80 to-parchment/10 border-4 border-temple-gold/30 rounded-lg p-8 md:p-12 shadow-temple">
            {/* Parchment texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none rounded-lg"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Lamp glow effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-temple-gold/20 rounded-full blur-3xl animate-breathe pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-soft-gold font-heading mb-2">Title of Your Tale</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Dawn at Angkor Wat..."
                  className="bg-card/50 border-temple-gold/40 text-parchment focus:border-temple-gold"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-soft-gold font-heading mb-2">Your Name</label>
                <Input
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Pilgrim's name..."
                  className="bg-card/50 border-temple-gold/40 text-parchment focus:border-temple-gold"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-soft-gold font-heading mb-2">Opening Words</label>
                <Textarea
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="A brief glimpse into your journey..."
                  rows={3}
                  className="bg-card/50 border-temple-gold/40 text-parchment focus:border-temple-gold"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-soft-gold font-heading mb-2">Your Sacred Story</label>
                <Textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Let your words flow like a sacred river..."
                  rows={12}
                  className="bg-card/50 border-temple-gold/40 text-parchment focus:border-temple-gold font-body leading-relaxed"
                />
              </div>

              {/* Region */}
              <div>
                <label className="block text-soft-gold font-heading mb-2">Region</label>
                <Input
                  required
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder="Uttar Pradesh, Cambodia, etc."
                  className="bg-card/50 border-temple-gold/40 text-parchment focus:border-temple-gold"
                />
              </div>

              {/* Temples */}
              <div>
                <label className="block text-soft-gold font-heading mb-2">Temples Visited</label>
                <Input
                  value={formData.temples}
                  onChange={(e) => setFormData({ ...formData, temples: e.target.value })}
                  placeholder="Comma-separated: angkor-wat, kedarnath..."
                  className="bg-card/50 border-temple-gold/40 text-parchment focus:border-temple-gold"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-soft-gold font-heading mb-2">Tags</label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Comma-separated: Meditation, Pilgrimage, Dawn..."
                  className="bg-card/50 border-temple-gold/40 text-parchment focus:border-temple-gold"
                />
              </div>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-4 py-4">
                <div className="h-px bg-gradient-to-r from-transparent via-temple-gold/50 to-transparent flex-1" />
                <div className="text-temple-gold text-xl glow-pulse">✦</div>
                <div className="h-px bg-gradient-to-r from-transparent via-temple-gold/50 to-transparent flex-1" />
              </div>

              {/* Submit */}
              <Button 
                type="submit" 
                className="w-full bg-temple-gold hover:bg-soft-gold text-deep-bronze font-heading text-lg py-6 shadow-divine"
              >
                <Save className="mr-2 h-5 w-5" />
                Inscribe Your Journey
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BlogCreate;
