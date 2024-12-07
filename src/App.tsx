import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WalletProvider } from "./contexts/WalletProvider";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import Wallets from "./pages/Wallets";
import Settings from "./pages/Settings";
import { RecommendationsPage } from "./pages/Recommendations";

function App() {
  return (
    <BrowserRouter>
      <WalletProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-background text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Header />
            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/wallets" element={<Wallets />} />
                <Route path="/settings" element={<Settings />} />
                <Route
                  path="/recommendations"
                  element={<RecommendationsPage />}
                />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </WalletProvider>
    </BrowserRouter>
  );
}

export default App;
