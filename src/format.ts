export type MonthlyReport = Record<string, number>;

export type Bar = {
  category: string;
  cents: number;
  label: string;
  percent: number;
};

/** Format an amount in cents as rupees, e.g. 123456 -> "₹1,234.56". */
export function formatCents(cents: number): string {
  const rupees = (cents / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `₹${rupees}`;
}

/** Turn a monthly report into bars sorted from the largest category, with each bar's share of the total. */
export function toBars(report: MonthlyReport): Bar[] {
  const total = Object.values(report).reduce((sum, cents) => sum + cents, 0);
  return Object.entries(report)
    .map(([category, cents]) => ({
      category,
      cents,
      label: formatCents(cents),
      percent: total === 0 ? 0 : Math.round((cents / total) * 100),
    }))
    .sort((a, b) => b.cents - a.cents || a.category.localeCompare(b.category));
}

/** Previous and next month for the month picker, wrapping across years. */
export function shiftMonth(year: number, month: number, delta: number): { year: number; month: number } {
  const index = year * 12 + (month - 1) + delta;
  return { year: Math.floor(index / 12), month: (index % 12) + 1 };
}
