🛍️ FlockShop – Collaborative Wishlist App
FlockShop is a modern, real-time collaborative wishlist manager where users can create shared wishlists, invite others via email, and manage gifts or goals together. It supports user authentication, real-time updates, and a clean responsive UI.

📸 Preview
Live: https://flockshop-collab-wishlist-q25o.vercel.app
Backend: https://flockshop-collab-wishlist.onrender.com

🚀 Features
✅ Sign up / Login via Firebase Auth

✅ Create & view personal or collaborative wishlists

✅ Share wishlists with other emails

✅ Add/remove products in real-time (via WebSockets – coming soon)

✅ Fully responsive design with Tailwind CSS

✅ RESTful API with MongoDB via Mongoose

✅ Deployment-ready on Vercel (frontend) and Render (backend)

🛠 Tech Stack
Layer	Technology
Frontend	React + Vite + Tailwind CSS
Backend	Node.js + Express
Database	MongoDB (Mongoose ODM)
Auth	Firebase Authentication (Email/Password)
Real-time	WebSockets (socket.io) — coming soon
Hosting (FE)	Vercel
Hosting (BE)	Render

📁 Folder Structure (Simplified)
bash
Copy
Edit
/frontend
  ├── src/
  │   ├── pages/
  │   │   ├── Dashboard.jsx
  │   │   ├── Login.jsx
  │   │   └── Signup.jsx
  │   ├── components/
  │   ├── firebase.js
  │   └── App.jsx
  ├── public/
  └── vite.config.js

/backend
  ├── models/Wishlist.js
  ├── routes/wishlist.js
  ├── index.js
  └── .env
⚙️ Setup Instructions
1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/<your-username>/flockshop-collab-wishlist.git
cd flockshop-collab-wishlist
2. Setup Backend (Node + Express)
bash
Copy
Edit
cd backend
npm install
Create a .env file:

env
Copy
Edit
PORT=5000
MONGODB_URI=your_mongodb_connection
FIREBASE_PROJECT_ID=your_firebase_project_id
Then run:

bash
Copy
Edit
npm start
3. Setup Frontend (Vite + React)
bash
Copy
Edit
cd frontend
npm install
Create a firebase.js config like:

js
Copy
Edit
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  // ...
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
Then run:

bash
Copy
Edit
npm run dev
🌐 Deployment
Frontend (Vercel)
Push frontend to GitHub

Go to vercel.com, import the repo

Add vercel.json to handle SPA routes:

json
Copy
Edit
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
Deploy ✅

Backend (Render)
Push backend to GitHub

Create a Web Service on render.com

Set start script in package.json:

json
Copy
Edit
"scripts": {
  "start": "node index.js"
}
Add .env vars via Render dashboard

Deploy ✅

🧪 API Endpoints (Backend)
GET /api/wishlist — Get all wishlists for logged-in user

POST /api/wishlist — Create a new wishlist

PUT /api/wishlist/:id — Update wishlist (future)

DELETE /api/wishlist/:id — Delete wishlist (future)

🔐 All routes are protected by Firebase Auth middleware

🙌 Author
Made with ❤️ by Aman AB
GitHub: @AmanAB-9162


##SignUP : 
![image](https://github.com/user-attachments/assets/803258f2-02e8-4ff8-bd71-9a2c3618def7)

##Login:
![image](https://github.com/user-attachments/assets/78270c99-359f-4581-9bf1-d6fc18e864c4)

##WishList : 
![image](https://github.com/user-attachments/assets/cfc714c5-a3ed-4667-88af-65dbba1c8f63)


