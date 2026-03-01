import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const tiers = {
  Silver: { min: 10000, dividend: 0.10, free: 0.12 },
  Gold: { min: 20000, dividend: 0.16, free: 0.07 },
  Platinum: { min: 35000, dividend: 0.19, free: 0.03 }
}

export default function App() {
  const [tier, setTier] = useState("Silver")
  const [py, setPy] = useState(0)
  const [cy, setCy] = useState(0)

  const selected = tiers[tier as keyof typeof tiers]
  const growth = cy - py
  const dividend = growth > 0 && cy >= 10000 ? growth * selected.dividend : 0
  const freeGoods = cy * selected.free

  const chartData = [
    { year: "Prior", spend: py },
    { year: "Current", spend: cy }
  ]

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif", background:"#111", minHeight:"100vh", color:"white" }}>
      <h1 style={{ color:"#f5c542" }}>Accelerate 3.0 Executive Dashboard</h1>

      <div style={{ display:"flex", gap:20, marginBottom:20 }}>
        <select value={tier} onChange={(e)=>setTier(e.target.value)}>
          {Object.keys(tiers).map(t=>(<option key={t}>{t}</option>))}
        </select>
        <input type="number" placeholder="Prior Year Spend" onChange={(e)=>setPy(Number(e.target.value))} />
        <input type="number" placeholder="Current Year Spend" onChange={(e)=>setCy(Number(e.target.value))} />
      </div>

      <div style={{ display:"flex", gap:40 }}>
        <div>
          <h3>Dividend</h3>
          <p>${dividend.toFixed(2)}</p>
        </div>
        <div>
          <h3>Free Goods</h3>
          <p>${freeGoods.toFixed(2)}</p>
        </div>
      </div>

      <div style={{ height:300, marginTop:40 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="year" stroke="white"/>
            <YAxis stroke="white"/>
            <Tooltip />
            <Line type="monotone" dataKey="spend" stroke="#f5c542" strokeWidth={3}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
