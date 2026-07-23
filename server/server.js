require("dotenv").config();
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("Secret Exists:", !!process.env.CLOUDINARY_API_SECRET);
const songRoutes = require("./routes/songRoutes");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const cors = require("cors");
const mongoose = require("mongoose");
const playlistRoutes = require("./routes/playlistRoutes");
const adminRoutes = require("./routes/adminRoutes");
const artistRoutes = require("./routes/artistRoutes");
const recentlyPlayedRoutes = require("./routes/recentlyPlayedRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const statsRoutes = require("./routes/statsRoutes");
const recentSearchRoutes = require("./routes/recentSearchRoutes");
const app = express();


app.use(
 cors({
   origin:[
     "http://localhost:3000",
     "https://your-frontend-domain.vercel.app"
   ],
   credentials:true
 })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/recently-played", recentlyPlayedRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/recent-searches", recentSearchRoutes);
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.log(err));


app.get("/", (req, res) => {
  res.json({
    message: "Music Player Backend is Running 🚀"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});