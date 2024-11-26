import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import NotFound from "./pages/common/not_found";
import DashboardPage from "./pages/dashboard_page";
import RefPostPage from "./pages/ref-post/ref_post_page";
import GeneralJournalPage from "./pages/journal/general/general_journal_page";
import AddGeneralJournalPage from "./pages/journal/general/add_general_journal_page";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/ref" element={<RefPostPage />} />
          <Route path="/general-journal" element={<GeneralJournalPage />} />
          <Route
            path="/general-journal/add"
            element={<AddGeneralJournalPage />}
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
