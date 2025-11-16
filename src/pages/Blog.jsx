import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { blogs } from "@/data/blogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Feather, Search, MapPin, Clock, User, Plus, Heart, Flame, Sparkles, BookOpen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");

  // Get unique regions and tags
  const regions = useMemo(() => {
    const allRegions = blogs.map(b => b.region);
    return ["all", ...Array.from(new Set(allRegions))];
  }, []);

  const tags = useMemo(() => {
    const allTags = blogs.flatMap(b => b.tags);
    return ["all", ...Array.from(new Set(allTags))];
  }, []);

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === "all" || blog.region === selectedRegion;
      const matchesTag = selectedTag === "all" || blog.tags.includes(selectedTag);
      
      return matchesSearch && matchesRegion && matchesTag;
    });
  }, [searchQuery, selectedRegion, selectedTag]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-deep-bronze via-background to-card overflow-hidden">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-soft-gold/30 rounded-full animate-[float-up_8s_ease-in-out_infinite]"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${-10 + Math.random() * 10}%`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <Feather className="w-20 h-20 text-temple-gold mx-auto mb-6 glow-pulse" />
          <h1 className="text-5xl md:text-7xl font-heading font-black text-gradient-gold mb-4 uppercase tracking-wider animate-divine-reveal">
            The Pilgrim's Journal
          </h1>
          <p className="text-xl text-parchment/80 font-body italic animate-divine-reveal mb-8" style={{ animationDelay: "0.2s" }}>
            Modern seekers sharing their sacred journeys
          </p>
          
          <Link to="/blog/create">
            <Button className="bg-temple-gold hover:bg-soft-gold text-deep-bronze font-heading shadow-divine animate-divine-reveal" style={{ animationDelay: "0.4s" }}>
              <Plus className="mr-2 h-5 w-5" />
              Share Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-20 z-30 bg-card/95 backdrop-blur-md border-b-2 border-temple-gold/30 shadow-temple">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-temple-gold/60" />
              <Input
                placeholder="Search pilgrim journals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-temple-gold/40 text-parchment focus:border-temple-gold"
              />
            </div>

            {/* Region Filter */}
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full md:w-[200px] bg-background/50 border-temple-gold/40 text-parchment">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent className="bg-card border-temple-gold/40">
                {regions.map(region => (
                  <SelectItem key={region} value={region} className="text-parchment">
                    {region === "all" ? "All Regions" : region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Tag Filter */}
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-full md:w-[200px] bg-background/50 border-temple-gold/40 text-parchment">
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent className="bg-card border-temple-gold/40 max-h-[300px]">
                {tags.map(tag => (
                  <SelectItem key={tag} value={tag} className="text-parchment">
                    {tag === "all" ? "All Tags" : tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div className="mt-4 text-center text-parchment/60 font-body text-sm">
            {filteredBlogs.length} {filteredBlogs.length === 1 ? 'journal' : 'journals'} found
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-parchment/60 font-body">No journals found matching your search</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <Link 
                  key={blog.id}
                  to={`/blog/${blog.id}`}
                  className="group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <article className="relative bg-gradient-to-br from-sandstone/20 via-card/80 to-parchment/10 border-2 border-temple-gold/30 rounded-lg overflow-hidden shadow-lg hover:shadow-divine transition-all duration-500 hover:-translate-y-2 animate-divine-reveal">
                    {/* Parchment texture */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
                      }}
                    />

                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-bronze via-deep-bronze/50 to-transparent" />
                      
                      {/* Region badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-temple-gold/90 backdrop-blur-sm rounded-full text-xs font-body text-deep-bronze flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {blog.region}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6">
                      <h3 className="text-2xl font-heading font-bold text-gradient-gold mb-3 line-clamp-2 group-hover:text-soft-gold transition-colors">
                        {blog.title}
                      </h3>
                      
                      <p className="text-parchment/70 font-body text-sm mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>

                      {/* Meta info */}
                      <div className="flex items-center gap-4 text-xs text-parchment/60 font-body mb-4">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {blog.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {blog.readTime}
                        </div>
                      </div>

                      {/* Reactions preview */}
                      <div className="flex items-center gap-3 text-xs border-t border-temple-gold/20 pt-4">
                        <div className="flex items-center gap-1 text-parchment/60">
                          <Heart className="w-3 h-3" />
                          {blog.reactions.likes}
                        </div>
                        <div className="flex items-center gap-1 text-parchment/60">
                          <Flame className="w-3 h-3" />
                          {blog.reactions.divine}
                        </div>
                        <div className="flex items-center gap-1 text-parchment/60">
                          <Sparkles className="w-3 h-3" />
                          {blog.reactions.beautiful}
                        </div>
                        <div className="flex items-center gap-1 text-parchment/60">
                          <BookOpen className="w-3 h-3" />
                          {blog.reactions.inspiring}
                        </div>
                      </div>

                      {/* Temple tags */}
                      {blog.temples.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {blog.temples.slice(0, 2).map(temple => (
                            <span key={temple} className="text-xs px-2 py-1 bg-temple-gold/10 border border-temple-gold/30 rounded text-soft-gold">
                              🛕 {temple.split('-')[0]}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-t from-temple-gold/10 to-transparent" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
