import React, { useCallback, useEffect, useState } from 'react';
import api from "../api/api";

function Dashboard() {
  const [data, setUserdata] = useState([]);

  const userdata = useCallback(async () => {
    try {
      const response = await api.get("/userdata", {
        withCredentials: true
      });
      console.log("Dashboard Data: ", response.data.data.summaryData);
      if (response) {
        setUserdata (response.data.data);
      }
    } catch (error) {
      console.error("Unable to fetch the data");
    }
  }, []);

  useEffect(() => {
    userdata();
  }, []);

  return (
    <div className='pb-12 flex flex-col gap-4 '>
      <div className="p-3 bg-white rounded-lg shadow-xl mt-6 mx-4">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          {data?.summaryData?.map((item) => (
            <div key={item.id} className="p-4 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
              <span className="text-green-600 text-2xl font-bold">{item.value}</span>
              <span className="text-gray-500 text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 bg-white rounded-lg shadow-md mx-4">
        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 border-b text-left">Activity Type</th>
              <th className="py-2 px-4 bg-gray-100 border-b text-left">Description</th>
              <th className="py-2 px-4 bg-gray-100 border-b text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data?.recentActivities?.map((activity) => (
              <tr key={activity.id} className='p-4'>
                <td className="py-2 px-4 border-b">{activity.type}</td>
                <td className="py-2 px-4 border-b">{activity.content}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(activity.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
