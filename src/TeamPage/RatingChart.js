import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RatingChart = ({ teamId }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchRatingData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/matches/${teamId}/rating`
        );
        const ratingData = res.data.data;

        if (ratingData.length > 0) {
          const firstEntry = ratingData[0];

          const formatted = [
            {
              match: "0", // x축 레이블
              rating: firstEntry.before,
              date: new Date(firstEntry.matchDate).toLocaleDateString(),
            },
            ...ratingData.map((entry, index) => ({
              match: index+1,
              rating: entry.after,
              date: new Date(entry.matchDate).toLocaleDateString(),
            })),
          ];

          setChartData(formatted);
        }
      } catch (err) {
        console.error("그래프 데이터 불러오기 실패:", err);
      }
    };

    fetchRatingData();
  }, [teamId]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h5>팀 레이팅 변화 추이</h5>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="match"
            label={{ position: "insideBottom", offset: -5 }}
          />
          <YAxis
            domain={["auto", "auto"]}
            label={{ value: "레이팅", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            formatter={(value) => `${value}점`}
            labelFormatter={(label) => `경기 ${label}`}
          />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#23b323"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;
