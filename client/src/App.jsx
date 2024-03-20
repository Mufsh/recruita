import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Update from "./components/Update";
import Delete from "./components/Delete";
import ViewAll from "./components/ViewAll";
import AddCandidate from "./components/AddCandidate";
import NavBar from "./components/NavBar";
function App() {
  return (
    <>
      <NavBar />
      <div className="h-screen bg-[url('assets/background-sm.jpg')] lg:bg-[url('assets/background.jpg')] bg-cover">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddCandidate />} />
          <Route path="/update" element={<Update />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/viewall" element={<ViewAll />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
