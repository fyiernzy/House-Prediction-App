import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import FormPage from "./pages/FormPage";
import ResultPage from "./pages/ResultPage";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  );
};

export default App;
