import { Link, Outlet, useLocation } from "react-router-dom";

const reportList = [
  { name: "Monthly Summary", path: "monthly-summary" },
  { name: "General Balance", path: "general-balance" },
  { name: "Expenses by Category", path: "expenses-by-category" },
];

const ReportsCenter = () => {
  const location = useLocation();
  const isAtRoot = location.pathname === "/reports";

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reports Center</h1>

      {isAtRoot ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportList.map((report) => (
            <Link
              key={report.path}
              to={`/reports/${report.path}`}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{report.name}</h2>
            </Link>
          ))}
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default ReportsCenter;
