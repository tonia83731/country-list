import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import Header from "./components/Header";
import TablePage from "./pages/TablePage";
import { useThemeContext } from "./context/ThemeContext";
import { useEffect } from "react";

function App() {
  const { currentMode } = useThemeContext();
  useEffect(() => {
    document.body.classList.add(currentMode.background, currentMode.text);

    return () => {
      document.body.classList.remove(currentMode.background, currentMode.text);
    };
  }, [currentMode.background, currentMode.text]);
  return (
    <>
      <Header />
      <main className="w-full h-full mt-[104px] mb-16 px-4 md:px-20 md:mt-[128px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
