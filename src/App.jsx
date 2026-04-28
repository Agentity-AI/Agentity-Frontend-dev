import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import DashboardPage from "./pages/DashboardPage.jsx";
import AiAgent from "./pages/AiAgentPage.jsx";
import SimulationPage from "./pages/SimulationPage.jsx";
import LandingPag from "./pages/LandingPage.jsx";
import { authentication } from "./store/zustant/useZustandHook.js";
import Transaction from "./pages/Transaction.jsx";
import SmartContract from "./pages/SmartContract.jsx";
import AlertPage from "./pages/AlertPage.jsx";
import Documentation from "./pages/Documentation.jsx";

function App() {
  const { dashBoard, getDashboard , getTasksHistory} = authentication();

  useEffect(() => {
    const loadDashboard = async () => {
      await getDashboard();
      await  getTasksHistory();
    };
    loadDashboard();
  }, [getDashboard,  getTasksHistory]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      <Routes>
        <Route path="/" element={dashBoard ? <DashboardPage /> : <LandingPag />} />
        <Route
          path="/dashboard"
          element={dashBoard ? <DashboardPage /> : <LandingPag />}
        />
        <Route
          path="/agents"
          element={dashBoard ? <AiAgent /> : <LandingPag />}
        />
        <Route
          path="/simulations"
          element={dashBoard ? <SimulationPage /> : <LandingPag />}
        />
        <Route
          path="/transactions"
          element={dashBoard ? <Transaction /> : <LandingPag />}
        />
        <Route
        path="/smart-contracts"
        element={dashBoard ? <SmartContract /> : <LandingPag />}
      />
      <Route
        path="/alerts"
        element={dashBoard ? <AlertPage /> : <LandingPag />}
      />
      <Route
        path="/documentation"
        element={dashBoard ? <Documentation /> : <LandingPag />}
      />
      </Routes>
    </>
  );
}

export default App;
