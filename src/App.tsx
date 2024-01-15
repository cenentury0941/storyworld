import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/end-user/Dashboard";

function App() {
  return (
    <Router basename="story">
      <Routes>
        <Route path="/" Component={Dashboard} />
      </Routes>
    </Router>
  );
}

export default App;
