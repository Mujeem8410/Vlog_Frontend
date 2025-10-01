import { useEffect, useState } from "react";
import API from "../api.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUser } from "react-icons/fi";
import PostForm from "./PostForm";
import PostList from "./PostList";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");


  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/api/posts");
      setPosts(res.data);
    } catch (err) {
      if (
        err.response?.data?.status !== 401 &&
        err.response?.data?.message !== "Token invalid / expired"
      ) {
        toast.error(err.response?.data?.message || "Failed to fetch posts!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/*  Header */}
      <header className="sticky top-16 z-40 max-w-6xl mx-auto mb-8 ">
        <div className="flex justify-between items-center bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <FiUser className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back, {username || "User"}!
              </h1>
              <p className="text-gray-600">
                Manage your posts and create new content
              </p>
            </div>
          </div>
        </div>
      </header>



      {/*  Layout */}
      <div className=" max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Left: Post Form */}
        <div className="md:col-span-1" >
          <PostForm
            editId={editId}
            setEditId={setEditId}
            fetchPosts={fetchPosts}
          />
        </div>

        {/* Right: Post List */}
        <div className="md:col-span-2">
          <PostList
            posts={posts}
            loading={loading}
            userId={userId}
            setEditId={setEditId}
            fetchPosts={fetchPosts}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
