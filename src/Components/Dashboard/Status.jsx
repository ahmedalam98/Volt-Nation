import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { getStatistics } from "../../api/apiFunctions.js";
import { useQuery } from "react-query";

const Status = () => {
  const { data, isLoading, error } = useQuery("products", getStatistics);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Assuming data is fetched successfully
  const chartData = data?.data.result.map((item) => ({
    name: item.month,
    total: item.totalMonthlyPrice,
  }));

  return (
    <ResponsiveContainer width="100%" height={420} className="self-end">
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          domain={[0, 7000]}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#08cff6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Status;
