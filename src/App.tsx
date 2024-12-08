import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import NotFound from "./pages/common/not_found";
import DashboardPage from "./pages/dashboard_page";
import RefPostPage from "./pages/ref-post/ref_post_page";
// ~*~ // ~*~ // ~*~ //
import GeneralJournalPage from "./pages/journal/general/general_journal_page";
import AddGeneralJournalPage from "./pages/journal/general/add_general_journal_page";
import LedgerPage from "./pages/journal/ledger/ledger_page";
import TrialBalancePage from "./pages/journal/trial-balance/trial_balance_page";
import AddTrialBalancePage from "./pages/journal/trial-balance/add_trial_balance_page";
import AdjustmentEntryPage from "./pages/journal/adjustment-entry/adjustment_entry_page";
import AddAdjustmentEntryPage from "./pages/journal/adjustment-entry/add_adjustment-entry_page";
import WorkSheetPage from "./pages/journal/work-sheet/work_sheet_page";
import IncomeStatementPage from "./pages/journal/income-statement/income_statement_page";
import PeriodReportPage from "./pages/period-report/period_report_page";
import EmployeePage from "./pages/employee/employee_page";
import PayrollPage from "./pages/payroll/payroll_page";
import AddPayrollPage from "./pages/payroll/add_payroll_page";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/ref" element={<RefPostPage />} />
          {/* ~*~ // Journal // ~*~ */}
          {/* jurnal umum */}
          <Route path="/general-journal" element={<GeneralJournalPage />} />
          <Route
            path="/add-general-journal"
            element={<AddGeneralJournalPage />}
          />
          {/* buku besar */}
          <Route path="/ledger" element={<LedgerPage />} />
          {/* neraca saldo */}
          <Route path="/trial-balance" element={<TrialBalancePage />} />
          <Route path="/add-trial-balance" element={<AddTrialBalancePage />} />
          {/* jurnal penyesuaian */}
          <Route path="/adjustment-entry" element={<AdjustmentEntryPage />} />
          <Route
            path="/add-adjustment-entry"
            element={<AddAdjustmentEntryPage />}
          />
          {/* neraca lajur */}
          <Route path="/work-sheet" element={<WorkSheetPage />} />
          {/* laba rugi */}
          <Route path="/income-statement" element={<IncomeStatementPage />} />
          {/* ~*~ // End of Journal // ~*~ */}
          <Route path="/period-report" element={<PeriodReportPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/payroll" element={<PayrollPage />} />
          <Route path="/add-payroll" element={<AddPayrollPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
