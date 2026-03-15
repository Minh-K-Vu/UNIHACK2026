import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StatsStrip from "../components/StatsStrip";
import PlatformPreview from "../components/PlatformPreview";
import MarketOverview from "../components/MarketOverview";
import StrategySection from "../components/StrategySection";
import RightSidebar from "../components/RightSidebar";
import { useAuth } from "../context/AuthContext";
import { getFavorites, getRecentSearches } from "../lib/userData";

function LandingPage() {
  const { user } = useAuth();

  const [favorites, setFavorites] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    async function loadSidebarData() {
      if (!user?.id) {
        setFavorites([]);
        setRecentSearches([]);
        return;
      }

      try {
        const [favoritesRows, recentRows] = await Promise.all([
          getFavorites(user.id),
          getRecentSearches(user.id),
        ]);

        setFavorites(favoritesRows.map((row) => row.ticker));
        setRecentSearches(recentRows.map((row) => row.ticker));
      } catch (err) {
        console.error("Error loading landing sidebar:", err.message);
      }
    }

    loadSidebarData();
  }, [user]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#09090b",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Navbar />

      <div style={{ padding: "20px" }}>
        {user && (
          <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                backgroundColor: "#18181b",
                color: "white",
                border: "1px solid #27272a",
                borderRadius: "10px",
                padding: "10px 14px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              {isSidebarOpen ? "Close Panel" : "Open Panel"}
            </button>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              user && isSidebarOpen ? "1fr 280px" : "1fr",
            gap: "20px",
          }}
        >
          <div>
            <HeroSection />
            <StatsStrip />
            <PlatformPreview />
            <MarketOverview />
            <StrategySection />
          </div>

          {user && isSidebarOpen && (
            <RightSidebar
              favorites={favorites}
              recentSearches={recentSearches}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;