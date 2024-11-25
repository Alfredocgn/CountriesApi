import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryList from "./pages/CountryList";
import CountryInfo from "./pages/CountryInfo";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<CountryList />} />
            <Route path="/country/:countryCode" element={<CountryInfo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
