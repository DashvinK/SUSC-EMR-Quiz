import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Landing from "./pages/Landing.jsx";
import QuizStart from "./pages/QuizStart.jsx";
import QuizPlay from "./pages/QuizPlay.jsx";
import QuizResult from "./pages/QuizResult.jsx";
import DepartmentDirectory from "./pages/DepartmentDirectory.jsx";
import DepartmentPage from "./pages/DepartmentPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz" element={<QuizStart />} />
        <Route path="/quiz/play" element={<QuizPlay />} />
        <Route path="/quiz/result" element={<QuizResult />} />
        <Route path="/departments" element={<DepartmentDirectory />} />
        <Route path="/departments/:slug" element={<DepartmentPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
