import { useEffect, useState } from "react";
import { shiftMonth, toBars, type MonthlyReport } from "./format";

export default function App() {
  const today = new Date();
  const [period, setPeriod] = useState({ year: today.getFullYear(), month: today.getMonth() + 1 });
  const [report, setReport] = useState<MonthlyReport | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    fetch(`/reports/${period.year}/${period.month}`)
      .then((response) => {
        if (!response.ok) throw new Error(`The API returned ${response.status}`);
        return response.json() as Promise<MonthlyReport>;
      })
      .then(setReport)
      .catch((reason: Error) => setError(reason.message));
  }, [period]);

  const bars = report ? toBars(report) : [];
  const title = new Date(period.year, period.month - 1).toLocaleString("en-IN", { month: "long", year: "numeric" });

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 640, margin: "40px auto", padding: "0 16px" }}>
      <h1>Expense Dashboard</h1>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button onClick={() => setPeriod(shiftMonth(period.year, period.month, -1))}>← Previous</button>
        <strong>{title}</strong>
        <button onClick={() => setPeriod(shiftMonth(period.year, period.month, 1))}>Next →</button>
      </div>
      {error && <p style={{ color: "#b42318" }}>Could not load the report: {error}</p>}
      {!error && bars.length === 0 && <p>No expenses recorded this month.</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {bars.map((bar) => (
          <li key={bar.category} style={{ margin: "12px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{bar.category}</span>
              <span>{bar.label} · {bar.percent}%</span>
            </div>
            <div style={{ background: "#e4e7ec", height: 10, borderRadius: 5 }}>
              <div style={{ background: "#1f3a5f", width: `${bar.percent}%`, height: 10, borderRadius: 5 }} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
