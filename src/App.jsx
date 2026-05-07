import { useEffect } from "react";
import PortfolioScene from "./components/PortfolioScene";
import LiquidGlassFilter from "./components/LiquidGlassFilter";
import { initPortfolioInteractions } from "./scripts/main";

export default function App() {
  useEffect(() => {
    const cleanup = initPortfolioInteractions();
    return cleanup;
  }, []);

  return (
    <>
      <PortfolioScene />
      <LiquidGlassFilter />
    </>
  );
}
