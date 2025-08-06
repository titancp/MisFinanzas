import { createRoot } from 'react-dom/client'
import './index.css'

import { Toaster } from 'sonner';

import { BrowserRouter, Routes, Route } from 'react-router'

import LoginPage from './features/authentication/pages/LoginPage.jsx'

import LayoutAuth from './shared/layouts/LayoutAuth.jsx'
import { LayoutAdmin } from './shared/layouts/LayoutAdmin.jsx'
import DashboardPage from './features/dashboard/pages/DashboardPage.jsx'

import IncomePage from './features/income/pages/IncomePage.jsx'
import IncomeForm from './features/income/components/IncomeForm.jsx'
import IncomeList from './features/income/components/IncomeList.jsx'

import ExpensesPage from './features/Expenses/pages/ExpensesPage.jsx'
import ExpensesForm from './features/Expenses/components/ExpensesForm.jsx'
import ExpensesList from './features/Expenses/components/ExpensesList.jsx'

import MonthlySummaryPage from './features/reports/pages/MonthlySummaryPage.jsx';
import GeneralBalancePage from './features/reports/pages/GeneralBalancePage.jsx';
import ExpensesByCategoryPage from './features/reports/pages/ExpensesByCategoryPage.jsx';
import ReportsCenter from './features/reports/components/ReportsCenter.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route element={<LayoutAuth />}>
          <Route path="/" element={<LoginPage />} />
        </Route>

        <Route element={<LayoutAdmin />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/income" element={<IncomePage />}>
            <Route path="form" element={<IncomeForm />} />
            <Route path="list" element={<IncomeList />} />
          </Route>
          <Route path="/expenses" element={<ExpensesPage />}>
            <Route path="form" element={<ExpensesForm />} />
            <Route path="list" element={<ExpensesList />} />
          </Route> 

        <Route path="/reports" element={<ReportsCenter />}>
          <Route path="monthly-summary" element={<MonthlySummaryPage />} />
          <Route path="general-balance" element={<GeneralBalancePage />} />
          <Route path="expenses-by-category" element={<ExpensesByCategoryPage />} />
        </Route>

        </Route>
      
      </Routes>
    </>
  </BrowserRouter>


)


