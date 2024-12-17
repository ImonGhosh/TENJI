import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import { FilteredResultsPage, HomePage, NotFound } from "@/pages";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<LogInPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
