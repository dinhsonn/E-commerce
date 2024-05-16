import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RouterAdmin from "./router/RouterAdmin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<RouterAdmin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
