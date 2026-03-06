import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// ── Real data from Kapoq + Skai ─────────────────────────────────────────────
const MONTHLY = [
  { month: "Jan 2026", adSpend: 352850, adSales: 741860, totalSales: 1458492, impressions: 64572713, clicks: 251643, orders: 19059, acos: 47.56, tacos: 24.19, ctr: 0.39, cpc: 1.40 },
  { month: "Feb 2026", adSpend: 268125, adSales: 796686, totalSales: 1578301, impressions: 41915152, clicks: 207531, orders: 20015, acos: 33.66, tacos: 16.99, ctr: 0.50, cpc: 1.29 },
  { month: "Mar 2026", adSpend: 44062,  adSales: 123999, totalSales: 275084,  impressions: 8092413,  clicks: 37608,  orders: 3121,  acos: 35.53, tacos: 16.02, ctr: 0.47, cpc: 1.17 },
];

const WEEKLY = [
  { week: "W1 Dec28", label: "W1",  adSpend: 44995,  adSales: 81686,  totalSales: 367803, orders: 2098, acos: 55.08, tacos: 12.23 },
  { week: "W2 Jan4",  label: "W2",  adSpend: 105097, adSales: 181348, totalSales: 317500, orders: 4728, acos: 57.95, tacos: 33.10 },
  { week: "W3 Jan11", label: "W3",  adSpend: 73502,  adSales: 165253, totalSales: 335665, orders: 4244, acos: 44.48, tacos: 21.90 },
  { week: "W4 Jan18", label: "W4",  adSpend: 65432,  adSales: 151811, totalSales: 310921, orders: 3883, acos: 43.10, tacos: 21.04 },
  { week: "W5 Jan25", label: "W5",  adSpend: 63824,  adSales: 161762, totalSales: 337471, orders: 4106, acos: 39.46, tacos: 18.91 },
  { week: "W6 Feb1",  label: "W6",  adSpend: 64067,  adSales: 186751, totalSales: 374564, orders: 4755, acos: 34.31, tacos: 17.10 },
  { week: "W7 Feb8",  label: "W7",  adSpend: 70939,  adSales: 201900, totalSales: 407257, orders: 5021, acos: 35.14, tacos: 17.42 },
  { week: "W8 Feb15", label: "W8",  adSpend: 69553,  adSales: 200434, totalSales: 388709, orders: 5039, acos: 34.70, tacos: 17.89 },
  { week: "W9 Feb22", label: "W9",  adSpend: 63566,  adSales: 207601, totalSales: 407771, orders: 5200, acos: 30.62, tacos: 15.59 },
  { week: "W10 Mar1", label: "W10", adSpend: 44062,  adSales: 123999, totalSales: 275084, orders: 3121, acos: 35.53, tacos: 16.02 },
];

const CAMPAIGNS = [
  { month: "Jan 2026", type: "SP", spend: 294948, sales: 618512, impressions: 49346411, clicks: 206424, orders: 15998, acos: 47.69, roas: 2.10 },
  { month: "Jan 2026", type: "SB", spend: 47448,  sales: 113542, impressions: 11846160, clicks: 39441,  orders: 2807,  acos: 41.79, roas: 2.39 },
  { month: "Jan 2026", type: "SD", spend: 10455,  sales: 9806,   impressions: 3380142,  clicks: 5778,   orders: 254,   acos: 106.6, roas: 0.94 },
  { month: "Feb 2026", type: "SP", spend: 229492, sales: 680709, impressions: 31793779, clicks: 174165, orders: 17299, acos: 33.71, roas: 2.97 },
  { month: "Feb 2026", type: "SB", spend: 30966,  sales: 108099, impressions: 7492371,  clicks: 29047,  orders: 2516,  acos: 28.65, roas: 3.49 },
  { month: "Feb 2026", type: "SD", spend: 7667,   sales: 7878,   impressions: 2629002,  clicks: 4319,   orders: 200,   acos: 97.33, roas: 1.03 },
  { month: "Mar 2026", type: "SP", spend: 38149,  sales: 107006, impressions: 5789851,  clicks: 31457,  orders: 2767,  acos: 35.65, roas: 2.80 },
  { month: "Mar 2026", type: "SB", spend: 4415,   sales: 15976,  impressions: 1755155,  clicks: 5260,   orders: 328,   acos: 27.64, roas: 3.62 },
  { month: "Mar 2026", type: "SD", spend: 1498,   sales: 1017,   impressions: 547407,   clicks: 891,    orders: 26,    acos: 147.3, roas: 0.68 },
];

const KEYWORDS = [
  { keyword: "phlur",              type: "Branded",     spend: 54309, sales: 337776, orders: 7542, acos: 20.94, cvr: 14.08 },
  { keyword: "vanilla skin",       type: "Non-Branded", spend: 24583, sales: 123362, orders: 2899, acos: 30.75, cvr: 12.83 },
  { keyword: "vanilla perfume",    type: "Non-Branded", spend: 22850, sales: 31471,  orders: 819,  acos: 88.19, cvr: 7.42  },
  { keyword: "deodorant",          type: "Non-Branded", spend: 15940, sales: 17366,  orders: 752,  acos: 69.28, cvr: 10.68 },
  { keyword: "body spray",         type: "Non-Branded", spend: 11199, sales: 15538,  orders: 395,  acos: 79.77, cvr: 5.52  },
  { keyword: "phlur body mist",    type: "Branded",     spend: 10776, sales: 37267,  orders: 913,  acos: 31.41, cvr: 10.89 },
  { keyword: "heavy cream",        type: "Non-Branded", spend: 9756,  sales: 52793,  orders: 1307, acos: 22.17, cvr: 10.55 },
  { keyword: "phlur vanilla skin", type: "Branded",     spend: 5339,  sales: 36977,  orders: 811,  acos: 21.25, cvr: 18.53 },
  { keyword: "missing person",     type: "Non-Branded", spend: 5286,  sales: 36156,  orders: 739,  acos: 13.64, cvr: 21.94 },
  { keyword: "phlur perfume",      type: "Branded",     spend: 6934,  sales: 22978,  orders: 467,  acos: 35.61, cvr: 7.14  },
];

const SKUS = [
  { title: "Vanilla Skin Body Mist 8oz",       sales: 315672, units: 8347, pageViews: 106463, cvr: 9.78  },
  { title: "Heavy Cream Body Mist 8oz",         sales: 134807, units: 3660, pageViews: 46174,  cvr: 9.89  },
  { title: "Vanilla Skin Natural Deodorant",    sales: 113893, units: 5741, pageViews: 33607,  cvr: 21.48 },
  { title: "Missing Person Body Oil 4oz",       sales: 65183,  units: 1480, pageViews: 16903,  cvr: 10.99 },
  { title: "Sweet Skin Trio (3pc Travel Set)",  sales: 62677,  units: 938,  pageViews: 27517,  cvr: 4.47  },
  { title: "Missing Person EDP Full Size 50mL", sales: 56711,  units: 593,  pageViews: 19797,  cvr: 3.72  },
  { title: "Vanilla Skin Body Oil 4oz",         sales: 50175,  units: 1115, pageViews: 9256,   cvr: 15.28 },
  { title: "Fragrance Discovery Set (2025)",    sales: 48555,  units: 1245, pageViews: 19924,  cvr: 8.67  },
  { title: "Beach Skin Body Mist 8oz",          sales: 41987,  units: 1086, pageViews: 27243,  cvr: 4.71  },
  { title: "Missing Person EDP Travel 9.5mL",   sales: 41824,  units: 1307, pageViews: 11618,  cvr: 13.60 },
];

const SKAI_QUERIES = [
  { query: "phlur",               spend: 12429, sales: 84083, conversions: 1975, acos: 14.78 },
  { query: "vanilla perfume",     spend: 11171, sales: 17927, conversions: 464,  acos: 62.31 },
  { query: "phlur vanilla skin",  spend: 9915,  sales: 56446, conversions: 1324, acos: 17.57 },
  { query: "phlur perfume",       spend: 4372,  sales: 16758, conversions: 366,  acos: 26.09 },
  { query: "phlur body mist",     spend: 4357,  sales: 18836, conversions: 457,  acos: 23.13 },
  { query: "body spray",          spend: 3413,  sales: 5750,  conversions: 153,  acos: 59.36 },
  { query: "vanilla skin",        spend: 2844,  sales: 13768, conversions: 315,  acos: 20.66 },
  { query: "missing person perf.",spend: 2703,  sales: 17023, conversions: 315,  acos: 15.88 },
  { query: "phlur heavy cream",   spend: 2682,  sales: 15561, conversions: 386,  acos: 17.23 },
  { query: "perfumes for women",  spend: 2245,  sales: 4359,  conversions: 117,  acos: 51.49 },
];

// ── GOALS ────────────────────────────────────────────────────────────────────
const MONTHLY_GOALS = [
  { month: "Jan 2026", totalSalesGoal: 1400000, adSalesGoal: 700000,  adSpendBudget: 280000, tacosGoal: 20.0, acosGoal: 35.0, ordersGoal: 18000 },
  { month: "Feb 2026", totalSalesGoal: 1500000, adSalesGoal: 750000,  adSpendBudget: 270000, tacosGoal: 20.0, acosGoal: 35.0, ordersGoal: 19000 },
  { month: "Mar 2026", totalSalesGoal: 1200000, adSalesGoal: 600000,  adSpendBudget: 200000, tacosGoal: 20.0, acosGoal: 35.0, ordersGoal: 15000 },
];
const ANNUAL_GOALS = { totalSales: 18600000, adSales: 9300000, adSpend: 3310000, orders: 222000, tacosGoal: 18.0, acosGoal: 32.0 };
const YTD = { totalSales: 1458492+1578301+275084, adSales: 741860+796686+123999, adSpend: 352850+268125+44062, orders: 19059+20015+3121, tacos: 16.02, acos: 35.53 };
const DAYS_ELAPSED = 65, DAYS_IN_YEAR = 365;
const YEAR_PCT = (DAYS_ELAPSED / DAYS_IN_YEAR) * 100;
const MAR_DAY = 6, MAR_DAYS = 31, MAR_PCT = (MAR_DAY / MAR_DAYS) * 100;

// ── Market Defense Brand Colors ───────────────────────────────────────────────
const C = {
  // Backgrounds — warm cream palette from marketdefense.com
  bg:       "#F5F3F1",   // site background: rgb(245,243,241)
  surface:  "#FFFFFF",   // card surface: white
  surface2: "#EDEBE8",   // slightly darker cream for depth
  // Borders & dividers
  border:   "#E0DDD9",
  border2:  "#D0CCC7",
  // Text
  text:     "#191919",   // near-black: rgb(25,25,25)
  textSub:  "#3F3F3F",   // dark gray: rgb(63,63,63)
  muted:    "#818181",   // secondary: rgb(129,129,129)
  // Brand gold — from the MD shield logo
  gold:     "#C9A84C",
  goldLight:"#E8D9A8",
  goldDark: "#9E7E2E",
  // Semantic colors — desaturated to match luxury feel
  green:    "#4A7C59",   // muted forest green
  red:      "#9B3A3A",   // muted terracotta red
  amber:    "#C9813A",   // warm amber
  // Chart palette — warm, editorial tones
  brown:    "#8B6A4F",
  taupe:    "#9E9080",
  charcoal: "#3D3935",
};

const CHART_COLORS = [C.gold, C.charcoal, C.brown];
const PIE_COLORS   = [C.charcoal, C.gold, C.brown];

const fmt = {
  usd: v => v >= 1e6 ? `$${(v/1e6).toFixed(2)}M` : v >= 1e3 ? `$${(v/1e3).toFixed(0)}k` : `$${v}`,
  pct: v => `${Number(v).toFixed(1)}%`,
  num: v => v >= 1e6 ? `${(v/1e6).toFixed(1)}M` : v >= 1e3 ? `${(v/1e3).toFixed(0)}k` : `${v}`,
  x:   v => `${Number(v).toFixed(2)}x`,
};

// ── Tooltip ──────────────────────────────────────────────────────────────────
const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: "10px 14px", fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
      <p style={{ color: C.text, fontWeight: 700, marginBottom: 6, fontFamily: "serif" }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, margin: "2px 0", fontFamily: "monospace" }}>
          {p.name}: {typeof p.value === "number" && p.value > 500 ? fmt.usd(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

// ── KPI Card ─────────────────────────────────────────────────────────────────
function KPI({ label, value, sub, change, up, accent = C.gold }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 2, padding: "18px 20px", flex: "1 1 150px", minWidth: 140, position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: accent }} />
      <div style={{ color: C.muted, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{label}</div>
      <div style={{ color: C.text, fontSize: 22, fontWeight: 700, fontFamily: "monospace", lineHeight: 1.1 }}>{value}</div>
      {(sub || change) && (
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
          {change && (
            <span style={{ background: up ? "rgba(74,124,89,.12)" : "rgba(155,58,58,.12)", color: up ? C.green : C.red, fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 2 }}>{change}</span>
          )}
          {sub && <span style={{ color: C.muted, fontSize: 11 }}>{sub}</span>}
        </div>
      )}
    </div>
  );
}

// ── Pacing Bar ───────────────────────────────────────────────────────────────
function PacingBar({ label, actual, goal, expectedPct, color = C.gold, format = "usd", inverse = false }) {
  const actualPct  = Math.min((actual / goal) * 100, 100);
  const isOnPace   = inverse ? actualPct <= expectedPct : actualPct >= expectedPct;
  const statusCol  = isOnPace ? C.green : C.amber;
  const statusText = isOnPace ? "On Pace ✓" : inverse ? "Over Pace ⚠" : "Behind ⚠";
  const displayActual = format === "usd" ? fmt.usd(actual) : fmt.pct(actual);
  const displayGoal   = format === "usd" ? fmt.usd(goal)   : fmt.pct(goal);

  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 2, padding: "18px 20px", flex: "1 1 220px", minWidth: 200 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ color: C.muted, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
        <span style={{ background: isOnPace ? "rgba(74,124,89,.1)" : "rgba(201,129,58,.1)", color: statusCol, fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 2 }}>{statusText}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
        <div>
          <div style={{ color: C.text, fontSize: 20, fontWeight: 700, fontFamily: "monospace" }}>{displayActual}</div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>of {displayGoal} goal</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: statusCol, fontSize: 18, fontWeight: 700 }}>{actualPct.toFixed(0)}%</div>
          <div style={{ color: C.muted, fontSize: 10 }}>attained</div>
        </div>
      </div>
      <div style={{ background: C.surface2, borderRadius: 2, height: 6, position: "relative" }}>
        <div style={{ background: color, width: `${actualPct}%`, height: "100%", borderRadius: 2 }} />
        <div style={{ position: "absolute", top: -5, left: `${Math.min(expectedPct, 98)}%`, width: 1.5, height: 16, background: C.muted }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ color: C.muted, fontSize: 9, letterSpacing: "0.05em" }}>0%</span>
        <span style={{ color: C.muted, fontSize: 9 }}>Expected: {expectedPct.toFixed(0)}%</span>
        <span style={{ color: C.muted, fontSize: 9 }}>100%</span>
      </div>
    </div>
  );
}

// ── TACoS Gauge ──────────────────────────────────────────────────────────────
function TacosGauge({ actual, goal }) {
  const pct    = Math.min((actual / goal) * 100, 150);
  const isGood = actual <= goal;
  const diff   = Math.abs(actual - goal).toFixed(1);
  const color  = actual <= goal * 0.9 ? C.green : actual <= goal ? C.amber : C.red;
  const label  = actual <= goal * 0.9 ? "Well Below Target ✓" : actual <= goal ? "Near Target ✓" : "Above Target ⚠";

  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 2, padding: "20px", flex: "1 1 260px", minWidth: 240 }}>
      <div style={{ color: C.muted, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>TACoS vs Goal</div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ position: "relative", width: 120, height: 70 }}>
          <svg width="120" height="70" viewBox="0 0 120 70">
            <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke={C.surface2} strokeWidth="10" strokeLinecap="round" />
            {(() => {
              const angle = Math.min(pct / 100, 1) * Math.PI;
              const x = 60 - 50 * Math.cos(angle);
              const y = 60 - 50 * Math.sin(angle);
              const largeArc = angle > Math.PI / 2 ? 1 : 0;
              return <path d={`M 10 60 A 50 50 0 ${largeArc} 1 ${x.toFixed(1)} ${y.toFixed(1)}`} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" />;
            })()}
            <circle cx="110" cy="60" r="4" fill={C.gold} />
            {(() => {
              const needleAngle = Math.min(pct / 100, 1) * Math.PI;
              const nx = 60 - 38 * Math.cos(needleAngle);
              const ny = 60 - 38 * Math.sin(needleAngle);
              return <line x1="60" y1="60" x2={nx.toFixed(1)} y2={ny.toFixed(1)} stroke={C.charcoal} strokeWidth="2" strokeLinecap="round" />;
            })()}
            <circle cx="60" cy="60" r="3" fill={C.charcoal} />
          </svg>
          <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
            <div style={{ color, fontSize: 18, fontWeight: 700, fontFamily: "monospace" }}>{fmt.pct(actual)}</div>
          </div>
        </div>
        <div>
          <div style={{ color: C.muted, fontSize: 11, marginBottom: 4 }}>Goal: <span style={{ color: C.gold, fontWeight: 700 }}>{fmt.pct(goal)}</span></div>
          <div style={{ background: isGood ? "rgba(74,124,89,.1)" : "rgba(155,58,58,.1)", color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 2, marginBottom: 6 }}>{label}</div>
          <div style={{ color: C.muted, fontSize: 11 }}>{isGood ? `${diff}pp below target` : `${diff}pp above target`}</div>
        </div>
      </div>
    </div>
  );
}

// ── Section Title ─────────────────────────────────────────────────────────────
function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 16, height: 1, background: C.gold }} />
        <h2 style={{ color: C.text, fontSize: 11, fontWeight: 700, margin: 0, letterSpacing: "0.14em", textTransform: "uppercase" }}>{children}</h2>
      </div>
      {sub && <p style={{ color: C.muted, fontSize: 11, margin: "4px 0 0 26px" }}>{sub}</p>}
    </div>
  );
}

// ── Data Table ────────────────────────────────────────────────────────────────
function DataTable({ cols, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${C.gold}` }}>
            {cols.map(c => <th key={c} style={{ textAlign: "left", padding: "8px 10px", color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.surface : C.bg }}>
              {row.map((cell, j) => {
                const isAcos = cols[j]?.toLowerCase().includes("acos");
                const n = parseFloat(cell);
                const acosColor = isAcos ? (n < 30 ? C.green : n < 60 ? C.amber : C.red) : null;
                return (
                  <td key={j} style={{ padding: "9px 10px", color: acosColor || (j === 0 ? C.text : C.textSub), fontWeight: j === 0 ? 600 : 400, fontFamily: j > 0 ? "monospace" : "inherit", fontSize: j > 0 ? 11 : 12 }}>{cell}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GoalVsActualBar({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barGap={4}>
        <CartesianGrid strokeDasharray="2 4" stroke={C.border} />
        <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => fmt.usd(v)} />
        <Tooltip content={<Tip />} />
        <Legend wrapperStyle={{ fontSize: 11, color: C.muted }} />
        <Bar dataKey="actual" name="Actual" fill={C.charcoal} radius={[2,2,0,0]} />
        <Bar dataKey="goal"   name="Goal"   fill={C.goldLight} radius={[2,2,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

const TABS = ["Overview", "Goals & Pacing", "PPC Campaigns", "Keywords", "Products"];

export default function App() {
  const [tab, setTab] = useState("Overview");

  const feb = MONTHLY[1], jan = MONTHLY[0];
  const chg = (a, b) => `${a >= b ? "+" : ""}${(((a - b) / b) * 100).toFixed(1)}%`;

  const febCamps    = CAMPAIGNS.filter(c => c.month === "Feb 2026");
  const spendByType = febCamps.map(c => ({ name: c.type, value: c.spend }));
  const salesByType = febCamps.map(c => ({ name: c.type, value: c.sales }));

  const totalSalesVsGoal = MONTHLY.map((m, i) => ({ month: m.month, actual: m.totalSales, goal: MONTHLY_GOALS[i]?.totalSalesGoal || 0 }));
  const adSalesVsGoal    = MONTHLY.map((m, i) => ({ month: m.month, actual: m.adSales,    goal: MONTHLY_GOALS[i]?.adSalesGoal   || 0 }));
  const adSpendVsGoal    = MONTHLY.map((m, i) => ({ month: m.month, actual: m.adSpend,    goal: MONTHLY_GOALS[i]?.adSpendBudget || 0 }));
  const tacosVsGoal      = MONTHLY.map((m, i) => ({ month: m.month, actual: m.tacos,      goal: MONTHLY_GOALS[i]?.tacosGoal     || 0 }));

  const cardStyle = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 2, padding: 20 };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: C.bg, minHeight: "100vh", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "stretch", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0" }}>
          {/* MD Shield logo mark */}
          <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
            <path d="M14 0L0 5.5V16C0 23.7 6.1 30.8 14 32C21.9 30.8 28 23.7 28 16V5.5L14 0Z" fill={C.charcoal}/>
            <path d="M14 4L4 8V16C4 21.8 8.4 27.1 14 28.4C19.6 27.1 24 21.8 24 16V8L14 4Z" fill={C.gold}/>
            <text x="14" y="20" textAnchor="middle" fill={C.charcoal} fontSize="10" fontWeight="700" fontFamily="serif">MD</text>
          </svg>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: C.text }}>PHLUR · Ad Performance</div>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: "0.04em" }}>Amazon US · Kapoq + Skai · as of Mar 6, 2026</div>
          </div>
        </div>
        {/* Tabs inline in header */}
        <div style={{ display: "flex", gap: 0 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "0 18px", background: "none", border: "none", cursor: "pointer", color: tab === t ? C.text : C.muted, fontSize: 11, fontWeight: tab === t ? 700 : 400, letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: tab === t ? `2px solid ${C.gold}` : "2px solid transparent", transition: "all .15s", marginBottom: -1 }}>{t}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
          <span style={{ color: C.muted, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>Live</span>
        </div>
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1500, margin: "0 auto" }}>

        {/* ── OVERVIEW ── */}
        {tab === "Overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <SectionTitle sub="February 2026 vs January 2026">Key Metrics</SectionTitle>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <KPI label="Total Sales"  value={fmt.usd(feb.totalSales)} change={chg(feb.totalSales, jan.totalSales)} up={true}  sub="vs Jan" accent={C.gold}    />
                <KPI label="Ad Sales"     value={fmt.usd(feb.adSales)}    change={chg(feb.adSales, jan.adSales)}       up={true}  sub="vs Jan" accent={C.charcoal} />
                <KPI label="Ad Spend"     value={fmt.usd(feb.adSpend)}    change={chg(feb.adSpend, jan.adSpend)}       up={false} sub="vs Jan" accent={C.brown}    />
                <KPI label="ACoS"         value={fmt.pct(feb.acos)}       change={`-${(jan.acos-feb.acos).toFixed(1)}pp`} up={true} sub="vs Jan" accent={C.gold}  />
                <KPI label="TACoS"        value={fmt.pct(feb.tacos)}      change={`-${(jan.tacos-feb.tacos).toFixed(1)}pp`} up={true} sub="vs Jan" accent={C.goldDark} />
                <KPI label="Orders"       value={fmt.num(feb.orders)}     change={chg(feb.orders, jan.orders)}         up={true}  sub="vs Jan" accent={C.charcoal} />
                <KPI label="Impressions"  value={fmt.num(feb.impressions)} change={chg(feb.impressions, jan.impressions)} up={false} sub="vs Jan" accent={C.taupe} />
                <KPI label="CPC"          value={`$${feb.cpc}`}           change={`-$${(jan.cpc-feb.cpc).toFixed(2)}`} up={true}  sub="vs Jan" accent={C.green}    />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <div style={cardStyle}>
                <SectionTitle sub="10 weeks · Ad Spend vs Ad Sales">Weekly Spend & Sales</SectionTitle>
                <ResponsiveContainer width="100%" height={210}>
                  <BarChart data={WEEKLY}>
                    <CartesianGrid strokeDasharray="2 4" stroke={C.border} />
                    <XAxis dataKey="label" tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => fmt.usd(v)} />
                    <Tooltip content={<Tip />} />
                    <Legend wrapperStyle={{ fontSize: 11, color: C.muted }} />
                    <Bar dataKey="adSpend" name="Ad Spend" fill={C.brown}    radius={[2,2,0,0]} />
                    <Bar dataKey="adSales" name="Ad Sales" fill={C.charcoal} radius={[2,2,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={cardStyle}>
                <SectionTitle sub="10 weeks · ACoS % and TACoS %">ACoS & TACoS Trend</SectionTitle>
                <ResponsiveContainer width="100%" height={210}>
                  <LineChart data={WEEKLY}>
                    <CartesianGrid strokeDasharray="2 4" stroke={C.border} />
                    <XAxis dataKey="label" tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                    <Tooltip content={<Tip />} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="acos"  name="ACoS %"  stroke={C.charcoal} strokeWidth={2} dot={{ r: 3, fill: C.charcoal }} />
                    <Line type="monotone" dataKey="tacos" name="TACoS %" stroke={C.gold}     strokeWidth={2} dot={{ r: 3, fill: C.gold }} strokeDasharray="5 3" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={cardStyle}>
              <SectionTitle sub="Weekly Ad Sales vs Total Sales — gap represents organic revenue">Ad Sales vs Total Revenue</SectionTitle>
              <ResponsiveContainer width="100%" height={190}>
                <AreaChart data={WEEKLY}>
                  <defs>
                    <linearGradient id="gTotal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.charcoal} stopOpacity={0.12}/><stop offset="95%" stopColor={C.charcoal} stopOpacity={0}/></linearGradient>
                    <linearGradient id="gAd"    x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.gold}     stopOpacity={0.18}/><stop offset="95%" stopColor={C.gold}     stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke={C.border} />
                  <XAxis dataKey="label" tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => fmt.usd(v)} />
                  <Tooltip content={<Tip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="totalSales" name="Total Sales" stroke={C.charcoal} fill="url(#gTotal)" strokeWidth={2} />
                  <Area type="monotone" dataKey="adSales"    name="Ad Sales"   stroke={C.gold}     fill="url(#gAd)"    strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={cardStyle}>
              <SectionTitle sub="Jan–Mar 2026 · Source: Kapoq">Monthly Summary</SectionTitle>
              <DataTable
                cols={["Month","Total Sales","Ad Sales","Ad Spend","Orders","ACoS","TACoS","CTR","CPC"]}
                rows={MONTHLY.map(m => [m.month, fmt.usd(m.totalSales), fmt.usd(m.adSales), fmt.usd(m.adSpend), fmt.num(m.orders), fmt.pct(m.acos), fmt.pct(m.tacos), `${m.ctr}%`, `$${m.cpc}`])}
              />
            </div>
          </div>
        )}

        {/* ── GOALS & PACING ── */}
        {tab === "Goals & Pacing" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <SectionTitle sub={`YTD through Mar 6 · ${DAYS_ELAPSED} of ${DAYS_IN_YEAR} days (${YEAR_PCT.toFixed(0)}% of year elapsed)`}>Annual Goals — YTD Pacing</SectionTitle>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <PacingBar label="Annual Total Sales"  actual={YTD.totalSales} goal={ANNUAL_GOALS.totalSales} expectedPct={YEAR_PCT} color={C.charcoal} />
                <PacingBar label="Annual Ad Sales"     actual={YTD.adSales}    goal={ANNUAL_GOALS.adSales}    expectedPct={YEAR_PCT} color={C.gold}     />
                <PacingBar label="Annual Ad Spend"     actual={YTD.adSpend}    goal={ANNUAL_GOALS.adSpend}    expectedPct={YEAR_PCT} color={C.brown}    />
                <PacingBar label="Annual Orders"       actual={YTD.orders}     goal={ANNUAL_GOALS.orders}     expectedPct={YEAR_PCT} color={C.taupe}    format="num" />
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <TacosGauge actual={YTD.tacos} goal={ANNUAL_GOALS.tacosGoal} />
              <div style={{ ...cardStyle, flex: "1 1 220px" }}>
                <SectionTitle sub="Monthly actual vs goal">TACoS vs Goal by Month</SectionTitle>
                <ResponsiveContainer width="100%" height={130}>
                  <BarChart data={tacosVsGoal} barGap={4}>
                    <CartesianGrid strokeDasharray="2 4" stroke={C.border} />
                    <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[0, 30]} />
                    <Tooltip />
                    <Bar dataKey="actual" name="Actual TACoS %" fill={C.charcoal} radius={[2,2,0,0]} />
                    <Bar dataKey="goal"   name="TACoS Goal %"  fill={C.goldLight} radius={[2,2,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ ...cardStyle, flex: "1 1 200px" }}>
                <SectionTitle sub="From Phlur_Goals_2026.xlsx">Annual Goal Summary</SectionTitle>
                {[["Total Sales Goal", fmt.usd(ANNUAL_GOALS.totalSales)], ["Ad Sales Goal", fmt.usd(ANNUAL_GOALS.adSales)], ["Ad Spend Budget", fmt.usd(ANNUAL_GOALS.adSpend)], ["Orders Goal", fmt.num(ANNUAL_GOALS.orders)], ["TACoS Goal", fmt.pct(ANNUAL_GOALS.tacosGoal)], ["ACoS Goal", fmt.pct(ANNUAL_GOALS.acosGoal)]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ color: C.muted, fontSize: 12 }}>{k}</span>
                    <span style={{ color: C.text, fontFamily: "monospace", fontSize: 12, fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle sub={`March MTD · Day ${MAR_DAY} of ${MAR_DAYS} · ${MAR_PCT.toFixed(0)}% through month`}>March MTD Pacing</SectionTitle>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <PacingBar label="Mar Total Sales"  actual={MONTHLY[2].totalSales} goal={MONTHLY_GOALS[2].totalSalesGoal} expectedPct={MAR_PCT} color={C.charcoal} />
                <PacingBar label="Mar Ad Sales"     actual={MONTHLY[2].adSales}    goal={MONTHLY_GOALS[2].adSalesGoal}    expectedPct={MAR_PCT} color={C.gold}     />
                <PacingBar label="Mar Ad Spend"     actual={MONTHLY[2].adSpend}    goal={MONTHLY_GOALS[2].adSpendBudget}  expectedPct={MAR_PCT} color={C.brown}    />
                <PacingBar label="Mar Orders"       actual={MONTHLY[2].orders}     goal={MONTHLY_GOALS[2].ordersGoal}     expectedPct={MAR_PCT} color={C.taupe}    format="num" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <div style={cardStyle}><SectionTitle sub="Monthly actual vs goal">Total Sales vs Goal</SectionTitle><GoalVsActualBar data={totalSalesVsGoal} /></div>
              <div style={cardStyle}><SectionTitle sub="Monthly actual vs goal">Ad Sales vs Goal</SectionTitle><GoalVsActualBar data={adSalesVsGoal} /></div>
              <div style={cardStyle}><SectionTitle sub="Monthly actual vs budget">Ad Spend vs Budget</SectionTitle><GoalVsActualBar data={adSpendVsGoal} /></div>
              <div style={cardStyle}>
                <SectionTitle sub="Lower is better">TACoS vs Goal Trend</SectionTitle>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={tacosVsGoal}>
                    <CartesianGrid strokeDasharray="2 4" stroke={C.border} />
                    <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[0, 30]} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="actual" name="Actual TACoS %" stroke={C.charcoal} strokeWidth={2} dot={{ r: 4, fill: C.charcoal }} />
                    <Line type="monotone" dataKey="goal"   name="TACoS Goal %"  stroke={C.gold}     strokeWidth={2} dot={{ r: 4, fill: C.gold }} strokeDasharray="6 3" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={cardStyle}>
              <SectionTitle sub="From Phlur_Goals_2026.xlsx">Monthly Goals vs Actuals</SectionTitle>
              <DataTable
                cols={["Month","Total Sales","Goal","vs Goal","Ad Spend","Budget","vs Budget","TACoS","TACoS Goal","vs Goal"]}
                rows={MONTHLY.map((m, i) => {
                  const g = MONTHLY_GOALS[i];
                  const salesDiff = (((m.totalSales-g.totalSalesGoal)/g.totalSalesGoal)*100).toFixed(1);
                  const spendDiff = (((m.adSpend-g.adSpendBudget)/g.adSpendBudget)*100).toFixed(1);
                  const tacosDiff = (m.tacos - g.tacosGoal).toFixed(1);
                  return [m.month, fmt.usd(m.totalSales), fmt.usd(g.totalSalesGoal), `${salesDiff>0?"+":""}${salesDiff}%`, fmt.usd(m.adSpend), fmt.usd(g.adSpendBudget), `${spendDiff>0?"+":""}${spendDiff}%`, fmt.pct(m.tacos), fmt.pct(g.tacosGoal), `${tacosDiff>0?"+":""}${tacosDiff}pp`];
                })}
              />
            </div>
          </div>
        )}

        {/* ── PPC CAMPAIGNS ── */}
        {tab === "PPC Campaigns" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SectionTitle sub="Sponsored Products · Sponsored Brands · Sponsored Display · February 2026">PPC by Campaign Type</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
              {febCamps.map((c, idx) => (
                <div key={c.type} style={{ ...cardStyle, borderTop: `3px solid ${idx===0?C.charcoal:idx===1?C.gold:C.brown}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <span style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 700, color: C.text }}>{c.type}</span>
                    <span style={{ background: C.surface2, color: C.muted, fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 2, letterSpacing: "0.06em" }}>
                      Sponsored {c.type==="SP"?"Products":c.type==="SB"?"Brands":"Display"}
                    </span>
                  </div>
                  {[["Ad Spend",fmt.usd(c.spend)],["Ad Sales",fmt.usd(c.sales)],["Orders",fmt.num(c.orders)],["ACoS",fmt.pct(c.acos)],["ROAS",fmt.x(c.roas)],["Impressions",fmt.num(c.impressions)]].map(([k,v]) => {
                    const isAcos = k==="ACoS"; const n = parseFloat(c.acos);
                    const col = isAcos ? (n<35?C.green:n<70?C.amber:C.red) : C.text;
                    return <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}`}}><span style={{color:C.muted,fontSize:12}}>{k}</span><span style={{color:col,fontFamily:"monospace",fontSize:12,fontWeight:600}}>{v}</span></div>;
                  })}
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <div style={cardStyle}>
                <SectionTitle sub="Feb 2026 Spend Mix">% Spend by Type</SectionTitle>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart><Pie data={spendByType} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false} style={{fontSize:12}}>{spendByType.map((_,i)=><Cell key={i} fill={PIE_COLORS[i]}/>)}</Pie><Tooltip formatter={v=>fmt.usd(v)} contentStyle={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:2}}/></PieChart>
                </ResponsiveContainer>
              </div>
              <div style={cardStyle}>
                <SectionTitle sub="Feb 2026 Sales Mix">% Sales by Type</SectionTitle>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart><Pie data={salesByType} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false} style={{fontSize:12}}>{salesByType.map((_,i)=><Cell key={i} fill={PIE_COLORS[i]}/>)}</Pie><Tooltip formatter={v=>fmt.usd(v)} contentStyle={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:2}}/></PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div style={cardStyle}>
              <SectionTitle sub="Jan–Mar 2026 all campaign types">Campaign Type Detail</SectionTitle>
              <DataTable cols={["Month","Type","Ad Spend","Ad Sales","Orders","Impressions","Clicks","ACoS","ROAS"]}
                rows={CAMPAIGNS.map(c=>[c.month,c.type,fmt.usd(c.spend),fmt.usd(c.sales),fmt.num(c.orders),fmt.num(c.impressions),fmt.num(c.clicks),fmt.pct(c.acos),fmt.x(c.roas)])} />
            </div>
          </div>
        )}

        {/* ── KEYWORDS ── */}
        {tab === "Keywords" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SectionTitle sub="Kapoq keyword data (Jan–Mar 2026) + Skai search query report (Feb–Mar 2026)">Keyword & Search Query Performance</SectionTitle>
            <div style={cardStyle}>
              <SectionTitle sub="Top 10 keywords by total spend">Spend vs Sales by Keyword</SectionTitle>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={KEYWORDS} layout="vertical">
                  <CartesianGrid strokeDasharray="2 4" stroke={C.border} horizontal={false} />
                  <XAxis type="number" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>fmt.usd(v)} />
                  <YAxis type="category" dataKey="keyword" tick={{fill:C.text,fontSize:11}} axisLine={false} tickLine={false} width={130} />
                  <Tooltip content={<Tip />} /><Legend wrapperStyle={{fontSize:11}} />
                  <Bar dataKey="spend" name="Spend" fill={C.brown}    radius={[0,2,2,0]} />
                  <Bar dataKey="sales" name="Sales" fill={C.charcoal} radius={[0,2,2,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <div style={cardStyle}>
                <SectionTitle sub="Kapoq · Jan–Mar 2026">Top Keywords by Spend</SectionTitle>
                <DataTable cols={["Keyword","Type","Spend","Sales","ACoS","CVR"]}
                  rows={KEYWORDS.map(k=>[k.keyword,k.type,fmt.usd(k.spend),fmt.usd(k.sales),fmt.pct(k.acos),`${k.cvr}%`])} />
              </div>
              <div style={cardStyle}>
                <SectionTitle sub="Skai · Feb–Mar 2026">Top Search Queries</SectionTitle>
                <DataTable cols={["Query","Spend","Sales","Conv.","ACoS"]}
                  rows={SKAI_QUERIES.map(q=>[q.query,fmt.usd(q.spend),fmt.usd(q.sales),fmt.num(q.conversions),fmt.pct(q.acos)])} />
              </div>
            </div>
          </div>
        )}

        {/* ── PRODUCTS ── */}
        {tab === "Products" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SectionTitle sub="February 2026 · Kapoq Brand Manager">Top Products by Revenue</SectionTitle>
            <div style={cardStyle}>
              <SectionTitle sub="Feb 2026 ordered product sales">Revenue by SKU</SectionTitle>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={SKUS} layout="vertical">
                  <CartesianGrid strokeDasharray="2 4" stroke={C.border} horizontal={false} />
                  <XAxis type="number" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>fmt.usd(v)} />
                  <YAxis type="category" dataKey="title" tick={{fill:C.text,fontSize:10}} axisLine={false} tickLine={false} width={220} />
                  <Tooltip content={<Tip />} />
                  <Bar dataKey="sales" name="Sales" radius={[0,2,2,0]}>
                    {SKUS.map((_,i)=><Cell key={i} fill={i===0?C.charcoal:i===1?C.gold:C.brown}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={cardStyle}>
              <SectionTitle sub="Feb 2026 · Top 10 SKUs">SKU Performance Detail</SectionTitle>
              <DataTable cols={["Product","Sales","Units","Page Views","CVR"]}
                rows={SKUS.map(s=>[s.title,fmt.usd(s.sales),fmt.num(s.units),fmt.num(s.pageViews),`${s.cvr}%`])} />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "14px 32px", display: "flex", justifyContent: "space-between", background: C.surface }}>
        <span style={{ color: C.muted, fontSize: 10, letterSpacing: "0.06em" }}>SOURCES: KAPOQ · SKAI · AMAZON US &nbsp;|&nbsp; GOALS: PHLUR_GOALS_2026.XLSX</span>
        <span style={{ color: C.muted, fontSize: 10, letterSpacing: "0.06em", fontFamily: "monospace" }}>MARKET DEFENSE · PHLUR AD INTELLIGENCE V2.1</span>
      </div>
    </div>
  );
}
