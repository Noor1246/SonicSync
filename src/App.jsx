import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import StartupLoader from "./components/StartupLoader";
import API_URL from "./api";
import { Vibrant } from "node-vibrant/browser";
import { useTheme } from "./context/ThemeContext";
import {
  Searchbar,
  Sidebar,
  MusicPlayer,
  TopPlay,
  ProtectedRoute,
} from "./components";

import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
  Login,
  Register,
  Admin,
  Favorites,
  Playlists,
  RecentlyPlayed,
  Stats,
  Profile,
} from "./pages";

const App = () => {
  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );
  const { themes, theme } = useTheme();

  const [colors, setColors] = useState({
    
    primary: "#8B5CF6",
    secondary: "#3B82F6",
  });
  const [loadingBackend, setLoadingBackend] = useState(true);
useEffect(() => {
  const wakeBackend = async () => {
    try {
      await axios.get(`${API_URL}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingBackend(false);
    }
  };

  wakeBackend();
}, []);
  // Extract colors from album artwork
  useEffect(() => {
    if (!activeSong?.image) {
      setColors({
        primary: "#8B5CF6",
        secondary: "#3B82F6",
      });
      return;
    }

    Vibrant.from(activeSong.image)
      .getPalette()
      .then((palette) => {
        setColors({
          primary:
            palette.Vibrant?.hex ||
            palette.DarkVibrant?.hex ||
            "#8B5CF6",

          secondary:
            palette.LightVibrant?.hex ||
            palette.Muted?.hex ||
            "#3B82F6",
        });
      })
      .catch(() => {
        setColors({
          primary: "#8B5CF6",
          secondary: "#3B82F6",
        });
      });
  }, [activeSong]);
  if (loadingBackend) {
  return <StartupLoader />;
}

  return (
    <div
  className={`relative flex h-screen overflow-hidden ${themes[theme].background}`}
>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div
  className={`relative flex-1 flex flex-col overflow-hidden ${themes[theme].background}`}
>
        {/* Dynamic Background */}
        {activeSong?.title && (
          <div
            className={`
              absolute
              inset-0
              overflow-hidden
              pointer-events-none
              transition-all
              duration-1000
              ${
                isPlaying
                  ? "opacity-100 animate-background"
                  : "opacity-40"
              }
            `}
          >
            {/* Glow 1 */}
            <div
              className="absolute -top-44 -left-44 w-[560px] h-[560px] rounded-full blur-[150px] animate-spin-slow"
              style={{
                background: colors.primary,
                opacity: 0.30,
              }}
            />

            {/* Glow 2 */}
            <div
              className="absolute top-1/3 left-1/3 w-[340px] h-[340px] rounded-full blur-[130px] animate-pulse"
              style={{
                background: colors.secondary,
                opacity: 0.20,
              }}
            />

            {/* Glow 3 */}
            <div
              className="absolute -bottom-44 -right-44 w-[560px] h-[560px] rounded-full blur-[150px] animate-bounce-slow"
              style={{
                background: colors.secondary,
                opacity: 0.30,
              }}
            />

            {/* Premium Noise Texture */}
            <div
              className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
          </div>
        )}

        {/* Foreground */}
<div className="relative z-10 flex flex-col flex-1 min-h-0">

  {/* Search */}
  <div className="px-3 sm:px-3 pt-3 pb-1">
  <Searchbar />
</div>

  {/* Content */}

          {/* Content */}
          <div
  className="
    flex
    flex-col-reverse
    xl:flex-row

    flex-1
    min-h-0

    overflow-y-auto

    hide-scrollbar

    px-3
    sm:px-6

    pb-36
  "
>
            {/* Main Pages */}
            <div className="flex-1 min-w-0 h-fit">

              <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Discover />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/recently-played"
                  element={
                    <ProtectedRoute>
                      <RecentlyPlayed />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  }
                />
                <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

                <Route
                  path="/playlists"
                  element={
                    <ProtectedRoute>
                      <Playlists />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/top-artists"
                  element={
                    <ProtectedRoute>
                      <TopArtists />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/top-charts"
                  element={
                    <ProtectedRoute>
                      <TopCharts />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/around-you"
                  element={
                    <ProtectedRoute>
                      <AroundYou />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/stats"
                  element={
                    <ProtectedRoute>
                      <Stats />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/artists/:id"
                  element={
                    <ProtectedRoute>
                      <ArtistDetails />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/songs/:songid"
                  element={
                    <ProtectedRoute>
                      <SongDetails />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/search/:searchTerm"
                  element={
                    <ProtectedRoute>
                      <Search />
                    </ProtectedRoute>
                  }
                />

                <Route
  path="/admin"
  element={
    <ProtectedRoute adminOnly>
      <Admin />
    </ProtectedRoute>
  }
/>

              </Routes>

            </div>

            {/* Right Panel */}
            <div
              className="
                w-full
                xl:w-[360px]
                xl:sticky
                top-0
                h-fit
                xl:ml-6
                mb-8
                xl:mb-0
                flex-shrink-0
              "
            >
              <TopPlay />
            </div>

          </div>

        </div>
      </div>
            {/* Bottom Music Player */}
      {activeSong?.title && (
        <div
          className="
            fixed
            bottom-3
            left-2
            right-2
            sm:left-4
            sm:right-4

            h-24

            rounded-3xl

            border
            border-white/10

            backdrop-blur-3xl

            overflow-visible

            z-50

            transition-all
            duration-700
          "
          style={{
            background: "rgba(255,255,255,0.08)",
            boxShadow: `0 0 45px ${colors.primary}55`,
          }}
        >
          {/* Dynamic Gradient */}
          <div
            className="absolute inset-0 animate-pulse rounded-3xl"
            style={{
              background: `linear-gradient(
                90deg,
                ${colors.primary}22,
                ${colors.secondary}22,
                ${colors.primary}22
              )`,
            }}
          />

          {/* Music Player */}
          <div className="relative z-10 h-full flex items-center">
            <MusicPlayer />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
