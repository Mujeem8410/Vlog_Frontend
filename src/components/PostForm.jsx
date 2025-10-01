import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../api.js";
import { FiEdit, FiPlus } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

function PostForm({ editId, setEditId, fetchPosts }) {
  const [post, setPost] = useState({ title: "", content: "", image: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit mode → fetch existing post data
  useEffect(() => {
    if (editId) {
      (async () => {
        try {
          const res = await API.get(`/api/posts/${editId}`);
          setPost({
            title: res.data.title || "",
            content: res.data.content || "",
            image: null,
          });
        } catch {
          toast.error("Failed to load post data!");
        }
      })();
    }
  }, [editId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!post.title || !post.content) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("content", post.content);
      if (post.image) {
        formData.append("image", post.image);
      }

      if (editId) {
        await API.put(`/api/posts/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Post updated successfully!");
        setEditId(null);
      } else {
        await API.post("/api/posts", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Post created successfully!");
      }

      // ✅ Reset form after submit
      setPost({ title: "", content: "", image: null });
      fetchPosts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit post!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-32">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <FiPlus className="text-blue-600 text-xl" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          {editId ? "Edit Post" : "Create New Post"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Enter post title..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />

        {/* Rich Text Editor */}
        <ReactQuill
          key={post.content === "" ? "empty" : "filled"} // ✅ force reset when cleared
          theme="snow"
          modules={modules}
          value={post.content}
          onChange={(value) => setPost({ ...post, content: value })}
          className="bg-white rounded-lg"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPost({ ...post, image: e.target.files[0] })}
          className="w-full border border-gray-300 rounded-lg p-3"
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              "Processing..."
            ) : editId ? (
              <>
                <FiEdit /> Update Post
              </>
            ) : (
              <>
                <FiPlus /> Create Post
              </>
            )}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setPost({ title: "", content: "", image: null }); // ✅ Clear form on cancel
              }}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PostForm;
