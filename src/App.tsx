import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from "./views/HomeView";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen flex-col">
          <Routes>
            <Route path="/" element={<HomeView />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
