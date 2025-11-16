import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, MapPin, User, Image as ImageIcon } from "lucide-react";

const BlogCreate = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [region, setRegion] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null); // Base64 string
  const [preview, setPreview] = useState(null);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Base64 string
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !excerpt || !content || !author || !region || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const newBlog = {
      id: title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
      title,
      excerpt,
      content,
      author,
      region,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      image, // Base64
      readTime: `${Math.max(Math.floor(content.split(" ").length / 200), 1)} min`,
      temples: [], // optional
      reactions: { likes: 0, divine: 0, beautiful: 0, inspiring: 0 },
      date: new Date().toISOString().split("T")[0],
    };

    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    localStorage.setItem("blogs", JSON.stringify([...storedBlogs, newBlog]));

    alert("Blog added successfully!");
    navigate("/blog"); // redirect to blog page
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-heading font-bold text-parchment mb-6 flex items-center gap-2">
          <Plus /> Share Your Journey
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <Textarea placeholder="Excerpt" value={excerpt} onChange={e => setExcerpt(e.target.value)} />
          <Textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} rows={8} />
          <Input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
          <Input placeholder="Region" value={region} onChange={e => setRegion(e.target.value)} />
          <Input placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />

          {/* Image Upload */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer bg-background/50 px-4 py-2 border border-temple-gold/40 rounded">
              <ImageIcon /> Upload Image
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {preview && <img src={preview} alt="Preview" className="mt-4 w-full max-h-64 object-cover rounded" />}
          </div>

          <Button type="submit" className="bg-temple-gold hover:bg-soft-gold text-deep-bronze font-heading mt-4">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BlogCreate;
