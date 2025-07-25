import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "./components/theme-provider";
import FormGeneratorView from "./views/FormGeneratorView";
import HomeView from "./views/HomeView";
import FinancialCardView from "./views/FinancialCardView";

function App() {
  return (
    <div className="bg-muted/20">
      <Router>
        <ThemeProvider defaultTheme="light">
          <div className="min-h-screen flex-col">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/form-generator" element={<FormGeneratorView />} />
              <Route path="/financial-card" element={<FinancialCardView />} />
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
