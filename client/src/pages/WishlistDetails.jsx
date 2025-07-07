import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function WishlistDetails() {
  const { id } = useParams();
  const [wishlist, setWishlist] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/wishlist/${id}`)
      .then(res => res.json())
      .then(data => setWishlist(data));
  }, [id]);

  if (!wishlist) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">{wishlist.name}</h1>
      <ul className="space-y-4">
        {wishlist.products.map((item, index) => (
          <li key={index} className="border p-4 rounded-lg shadow">
            <p className="font-semibold text-lg">{item.name}</p>
            <img src={item.imageUrl} alt={item.name} className="w-full max-w-sm rounded mt-2" />
            <p className="text-green-600 font-bold">₹{item.price}</p>
            <p className="text-sm text-gray-500">Added by: {item.addedBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
