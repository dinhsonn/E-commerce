  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import RouterPublic from "./router/RouterPublic";
  import { UserProvider } from "./services/UserContext";
  function App() {
    return (
      <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<RouterPublic />} />
          </Routes>
        </Router>
      </UserProvider>
      </>
    );
  }

  export default App;
