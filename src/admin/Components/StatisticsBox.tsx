import type React from "react"


interface StatBoxProps {
  title: string
  value: number
  icon: React.ReactNode
}

const StatisticsBox: React.FC<StatBoxProps> = ({ title, value, icon }) => {
  return (
    <div className="stat-box">
      <div className="stat-content">
        <div className="stat-icon">{icon}</div>
        <div className="stat-info">
          <h3>{title}</h3>
          <span className="stat-value">{value}</span>
        </div>
      </div>
    </div>
  )
}

export default StatisticsBox

