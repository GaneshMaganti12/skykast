import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherDashBoard from "./pages/WeatherDashBoard";
import CityPage from "./pages/CityPage";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gradient-to-br from-background to-muted">
        <Routes>
          <Route path="/" element={<WeatherDashBoard />} />
          <Route path="/city/:cityName" element={<CityPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
