import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import API from "../api";

function PostList({ posts, loading, userId, setEditId, fetchPosts }) {
  const [open, setOpen] = useState(null);

  
  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/posts/${id}`);
      toast.success("Post deleted successfully!");
      fetchPosts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete post!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-lg">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
        <p className="text-gray-500">Create your first post to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Posts</h2>
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
          {posts.length} posts
        </span>
      </div>

      {posts.map((p) => (
        <div
          key={p._id}
          className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-800 mb-2">{p.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: p.content }} />
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="mt-3 rounded-lg shadow-md mx-auto max-h-96 object-contain"
               
                />
              )}

              <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                <span className="font-semibold">{p.author?.username}</span>
                <span>•</span>
                <span>{new Date(p.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Show edit/delete only for author */}
            {p.author?._id === userId && (
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => setEditId(p._id)}
                  className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100"
                  title="Edit post"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => setOpen(p._id)}
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                  title="Delete post"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Delete Confirmation */}
          {open === p._id && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>
                <p className="text-sm text-gray-600 mb-4">
                  This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setOpen(null)}
                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(p._id);
                      setOpen(null);
                    }}
                    className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                  >
                    Yes, delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;
