import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { blogs } from "@/data/blogs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Flame, Sparkles, BookOpen, MapPin, Clock, User } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find(b => b.id === id);

  const [reactions, setReactions] = useState(blog?.reactions || { likes: 0, divine: 0, beautiful: 0, inspiring: 0 });
  const [userReactions, setUserReactions] = useState([]);

  if (!blog) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-heading text-gradient-gold mb-4">Blog Not Found</h2>
          <Button onClick={() => navigate('/blog')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Journals
          </Button>
        </div>
      </div>
    );
  }

  const handleReaction = (type) => {
    if (userReactions.includes(type)) {
      setReactions(prev => ({ ...prev, [type]: prev[type] - 1 }));
      setUserReactions(prev => prev.filter(r => r !== type));
    } else {
      setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));
      setUserReactions(prev => [...prev, type]);
    }
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
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient-gold mb-6 animate-divine-reveal">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-parchment/70 font-body mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime} read</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{blog.region}</span>
              </div>
              <div className="text-parchment/50">•</div>
              <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content - Ancient Letter Style */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <article className="relative bg-gradient-to-br from-sandstone/20 via-card/80 to-parchment/10 border-4 border-temple-gold/30 rounded-lg p-8 md:p-12 shadow-temple">
            <div className="absolute inset-0 opacity-5 pointer-events-none rounded-lg"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-radial from-deep-bronze/30 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-radial from-deep-bronze/30 to-transparent rounded-tr-full" />

            <div className="relative mb-8 rounded-lg overflow-hidden border-2 border-temple-gold/40 shadow-divine">
              <img src={blog.image} alt={blog.title} className="w-full h-[400px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-bronze/50 to-transparent" />
            </div>

            <div className="relative z-10 prose prose-lg max-w-none">
              <p className="first-letter:text-7xl first-letter:font-heading first-letter:text-temple-gold first-letter:float-left first-letter:mr-3 first-letter:leading-none text-parchment/90 font-body leading-relaxed whitespace-pre-line">
                {blog.content}
              </p>
            </div>

            <div className="my-12 flex items-center justify-center gap-4">
              <div className="h-px bg-gradient-to-r from-transparent via-temple-gold/50 to-transparent flex-1" />
              <div className="text-temple-gold text-2xl glow-pulse">✦</div>
              <div className="h-px bg-gradient-to-r from-transparent via-temple-gold/50 to-transparent flex-1" />
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-temple-gold/10 border border-temple-gold/30 rounded-full text-sm text-soft-gold font-body">
                  {tag}
                </span>
              ))}
            </div>

            <div className="border-t-2 border-temple-gold/30 pt-8">
              <h3 className="text-xl font-heading text-gradient-gold mb-4">Sacred Reactions</h3>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => handleReaction('likes')}
                  variant="outline"
                  className={`${userReactions.includes('likes') ? 'bg-temple-gold/20 border-temple-gold' : ''}`}
                >
                  <Heart className={`mr-2 h-5 w-5 ${userReactions.includes('likes') ? 'fill-current' : ''}`} />
                  <span className="font-body">{reactions.likes}</span>
                </Button>
                <Button
                  onClick={() => handleReaction('divine')}
                  variant="outline"
                  className={`${userReactions.includes('divine') ? 'bg-temple-gold/20 border-temple-gold' : ''}`}
                >
                  <Flame className={`mr-2 h-5 w-5 ${userReactions.includes('divine') ? 'fill-current' : ''}`} />
                  <span className="font-body">{reactions.divine} Divine</span>
                </Button>
                <Button
                  onClick={() => handleReaction('beautiful')}
                  variant="outline"
                  className={`${userReactions.includes('beautiful') ? 'bg-temple-gold/20 border-temple-gold' : ''}`}
                >
                  <Sparkles className={`mr-2 h-5 w-5 ${userReactions.includes('beautiful') ? 'fill-current' : ''}`} />
                  <span className="font-body">{reactions.beautiful} Beautiful</span>
                </Button>
                <Button
                  onClick={() => handleReaction('inspiring')}
                  variant="outline"
                  className={`${userReactions.includes('inspiring') ? 'bg-temple-gold/20 border-temple-gold' : ''}`}
                >
                  <BookOpen className={`mr-2 h-5 w-5 ${userReactions.includes('inspiring') ? 'fill-current' : ''}`} />
                  <span className="font-body">{reactions.inspiring} Inspiring</span>
                </Button>
              </div>
            </div>
          </article>

          {blog.temples.length > 0 && (
            <div className="mt-12 bg-card/50 border-2 border-temple-gold/30 rounded-lg p-6">
              <h3 className="text-2xl font-heading text-gradient-gold mb-4">Temples Mentioned</h3>
              <div className="flex flex-wrap gap-2">
                {blog.temples.map(temple => (
                  <Link 
                    key={temple}
                    to={`/trail/${temple}`}
                    className="px-4 py-2 bg-temple-gold/10 border border-temple-gold/40 rounded-md hover:bg-temple-gold/20 transition-all duration-300 text-soft-gold font-body hover:shadow-divine"
                  >
                    🛕 {temple.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
