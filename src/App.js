import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// views
import CharactersList from "./views/CharactersList";
import CharacterView from "./views/CharacterView";

// ==============================|| APP ||============================== //

export default function App() {
  return (
    <Router>
      <div className="px-[10%] py-[5%]">
        <Routes>
          <Route path="/" element={<CharactersList />} />
          <Route path="/character/:id" element={<CharacterView />} />
        </Routes>
      </div>
    </Router>
  );
}
