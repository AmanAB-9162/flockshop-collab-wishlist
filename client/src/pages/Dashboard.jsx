// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const navigate = useNavigate();

  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [collaborators, setCollaborators] = useState('');


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const res = await fetch('http://localhost:5000/api/wishlist', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          setWishlists(data);
        } catch (err) {
          console.error('Error fetching wishlists:', err);
        }
      } else {
        navigate('/login');
        console.warn('User not logged in');
      }
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, [navigate]);


  const handleCreateWishlist = async () => {
    const collaboratorArray = collaborators
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email !== '');

    const user = auth.currentUser;

    const newWishlist = {
      title,
      createdBy: user?.email || 'anonymous@example.com',
      collaborators: collaboratorArray,
      products: [],
    };

    try {
      const res = await fetch('http://localhost:5000/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify(newWishlist),
      });

      if (res.ok) {
        const created = await res.json();
        setWishlists((prev) => [...prev, created]);
        setShowModal(false);
        setTitle('');
        setCollaborators('');
      } else {
        console.error('Failed to create wishlist');
      }
    } catch (err) {
      console.error('Error creating wishlist:', err);
    }
  };


  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">


     <h1 className="text-3xl font-bold mb-4">My Wishlists</h1>

<div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
  

  <button
    onClick={() => setShowModal(true)}
    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
  >
    + New Wishlist
  </button>
  <button
    onClick={async () => {
      await signOut(auth);
      navigate('/login');
    }}
    className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
  >
    Logout
  </button>
</div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Wishlist</h2>

            <input
              type="text"
              placeholder="Wishlist Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-3"
            />

            <input
              type="text"
              placeholder="Collaborators (comma-separated emails)"
              value={collaborators}
              onChange={(e) => setCollaborators(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
                onClick={handleCreateWishlist}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {wishlists.map((wishlist) => (
          <div key={wishlist._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">

            <span className="text-3xl mb-2 block">🎁</span>
            <h2 className="text-lg font-semibold text-purple-700 mb-2">{wishlist.title}</h2>
            {wishlist.createdBy && (
              <p className="text-gray-500 text-sm mb-1">Created by: {wishlist.createdBy}</p>
            )}

            <p className="text-gray-600 font-medium">🛍️ Items: {wishlist.products.length}</p>

          </div>
        ))}
      </div>

    </div>
  );
}

