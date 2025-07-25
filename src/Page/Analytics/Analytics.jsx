import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import axiosSecure from '../../Hooks/useAxiosSecure';

const Analytics = () => {
  const [scholarshipData, setScholarshipData] = useState([]);
  const [applicationData, setApplicationData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scholarshipsRes, applicationsRes] = await Promise.all([
          axiosSecure.get('/scholarships'),
          axiosSecure.get('/get-applied-scholarships'),
        ]);
        setScholarshipData(scholarshipsRes.data);
        setApplicationData(applicationsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const scholarshipByCategory = scholarshipData.reduce((acc, scholarship) => {
    const category = scholarship.scholarshipCategory;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {});

  const applicationStatus = applicationData.reduce((acc, application) => {
    const status = application.status;
    if (!acc[status]) {
      acc[status] = 0;
    }
    acc[status]++;
    return acc;
  }, {});

  const chartData = Object.keys(scholarshipByCategory).map(category => ({
    name: category,
    count: scholarshipByCategory[category],
  }));

  const pieChartData = Object.keys(applicationStatus).map(status => ({
    name: status,
    value: applicationStatus[status],
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-4 md:p-10">
      <h2 className="text-2xl font-bold mb-6">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Scholarships by Category</h3>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Application Status</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={pieChartData}
              cx={200}
              cy={150}
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
