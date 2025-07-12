// import React, { useState, useEffect } from "react";
// import "chart.js/auto";
// import { Line, Bar } from "react-chartjs-2";
// import logo from "../images/amppay.png";
// import baseUrl from "../urls";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {Alert} from '@mui/material';

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import "./Dashboard.css";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [activeSection, setActiveSection] = useState("dashboard");
//   const [latestUsage, setLatestUsage] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const rmsCurrent = latestUsage.irms_current;
//   const rmsPower = latestUsage.irms_power;
//   const peakPower = latestUsage.peak_power;
//   const averageDailyConsumption = latestUsage.averageDailyConsumption;
//   const unitsConsumed = latestUsage.usage_value;
//   const todaysReport =
//     "Energy consumption is within the expected range. No anomalies detected.";
//   const weeklyEnergyUsage = latestUsage.weeklyEnergyUsage;
//   const monthlyEnergyUsage = latestUsage.monthlyEnergyUsage;
//   const environmentalImpact = "Carbon emissions reduced by 5% from last month";
//   const predictedBill = "$120.00";
//   const billingHistory = [
//     { month: "January", amount: "$100" },
//     { month: "February", amount: "$115" },
//     { month: "March", amount: "$110" },
//   ];
//   const notifications = [
//     "System check completed at 10 AM",
//     "Energy consumption is lower than usual today.",
//     "New report available for House C.",
//   ];

//   const leaderboardData = [
//     { house: "House A", consumption: "300 kWh" },
//     { house: "House B", consumption: "350 kWh" },
//     { house: "House C", consumption: "400 kWh" },
//   ];

//   const graphData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "Energy Consumption",
//         data: [100, 200, 150, 300, 250, 400],
//         borderColor: "rgba(75,192,192,1)",
//         backgroundColor: "rgba(75,192,192,0.2)",
//         pointRadius: 5,
//         pointHoverRadius: 7,
//       },
//     ],
//   };

//   const barGraphData = {
//     labels: ["House A", "House B", "House C"],
//     datasets: [
//       {
//         label: "Monthly Energy Consumption",
//         data: [300, 350, 400],
//         backgroundColor: [
//           "rgba(75, 192, 192, 0.6)",
//           "rgba(192, 75, 75, 0.6)",
//           "rgba(75, 192, 75, 0.6)",
//         ],
//       },
//     ],
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   const handleMenuClick = (section) => {
//     setActiveSection(section);

//     if (window.innerWidth < 577) {
//       setIsSidebarOpen(false);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `${baseUrl}/api/energyusage/?user=Arjun`
//         );

//         const data = response.data;

//         const latest = data.reduce((latest, current) => {
//           if (!latest || current.datetime > latest.datetime) {
//             return current;
//           }
//           return latest;
//         }, null);

//         const oneWeekAgo = new Date();
//         oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//         const pastWeekUsage = data.filter(
//           (item) => new Date(item.datetime) >= oneWeekAgo
//         );
//         const weeklyEnergyUsage = pastWeekUsage
//           .reduce((total, entry) => {
//             return total + parseFloat(entry.usage_value);
//           }, 0)
//           .toFixed(2);

//         const oneMonthAgo = new Date();
//         oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
//         const pastMonthUsage = data.filter(
//           (item) => new Date(item.datetime) >= oneMonthAgo
//         );
//         const monthlyEnergyUsage = pastMonthUsage
//           .reduce((total, entry) => {
//             return total + parseFloat(entry.usage_value);
//           }, 0)
//           .toFixed(2);

//         const averageDaily = (weeklyEnergyUsage / 7).toFixed(2);

//         setLatestUsage({
//           usage_value: parseFloat(latest.usage_value).toFixed(2) || 0 + " kWh",
//           irms_current: parseFloat(latest.irms_current).toFixed(2) || 0 + " V",
//           irms_power: parseFloat(latest.irms_power).toFixed(2) || 0 + " W",
//           peak_power: parseFloat(latest.peak_power).toFixed(2) || 0 + " W",
//           averageDailyConsumption: averageDaily + " kWh",
//           weeklyEnergyUsage: weeklyEnergyUsage + " kWh",
//           monthlyEnergyUsage: monthlyEnergyUsage + " kWh",
//         });
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();

//     //const interval = setInterval(fetchData, 1000);

//     //return () => clearInterval(interval);
//   }, []);

//   return (

//     <div className="dashboard-container">

//       <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
//         <div className="logo">
//           <img onClick={() => navigate("/")} src={logo} alt="amppay" />{" "}
//         </div>
//         <nav>
//           <ul>
//             <li
//               className={activeSection === "dashboard" ? "active" : ""}
//               onClick={() => handleMenuClick("dashboard")}
//             >
//               Home
//             </li>
//             <li
//               className={activeSection === "report" ? "active" : ""}
//               onClick={() => handleMenuClick("report")}
//             >
//               Report Issue
//             </li>
//             <li
//               className={activeSection === "notifications" ? "active" : ""}
//               onClick={() => handleMenuClick("notifications")}
//             >
//               Notifications
//             </li>
//             <li
//               className={activeSection === "profile" ? "active" : ""}
//               onClick={() => handleMenuClick("profile")}
//             >
//               Profile
//             </li>
//             <li
//               className={activeSection === "settings" ? "active" : ""}
//               onClick={() => handleMenuClick("settings")}
//             >
//               Settings
//             </li>
//           </ul>
//         </nav>
//       </div>

//       <div className={`content ${!isSidebarOpen ? "full-width" : ""}`}>
//         <button
//           style={{ zIndex: "9999" }}
//           className="sidebar-toggle"
//           onClick={toggleSidebar}
//         >
//           ☰
//         </button>

//         {activeSection === "dashboard" && (
//           <>
//             {/* <h1>Energy Insights Dashboard</h1> */}
//             <div className="dashboard-sections">
//               <div className="dashboard-section rms-display">
//                 <h2 style={{ color: "black" }}>RMS Current & Power</h2>
//                 <div className="rms-stats">
//                   <div className="rms-stat">
//                     <p>
//                       <strong>Current:</strong>
//                     </p>
//                     <span>{rmsCurrent}</span>
//                   </div>
//                   <div className="rms-stat">
//                     <p>
//                       <strong>Power:</strong>
//                     </p>
//                     <span>{rmsPower}</span>
//                   </div>
//                   <div className="rms-stat">
//                     <p>
//                       <strong>Average Daily Consumption:</strong>
//                     </p>
//                     <span>{averageDailyConsumption}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="dashboard-section peak-power">
//                 <h2>Peak Power</h2>
//                 <div className="peak-power-stat">
//                   <p>
//                     <strong>Peak Power:</strong>
//                   </p>
//                   <span>{peakPower}</span>
//                 </div>
//               </div>

//               <div className="dashboard-section consumption-details">
//                 <h2 style={{ color: "black" }}>Consumption Details</h2>
//                 <div className="consumption-stat">
//                   <p>
//                     <strong>Units Consumed:</strong>
//                   </p>
//                   <span>{unitsConsumed}</span>
//                 </div>
//                 <div className="consumption-stat">
//                   <p>
//                     <strong>Weekly Energy Usage:</strong>
//                   </p>
//                   <span>{weeklyEnergyUsage}</span>
//                 </div>
//                 <div className="consumption-stat">
//                   <p>
//                     <strong>Monthly Energy Usage:</strong>
//                   </p>
//                   <span>{monthlyEnergyUsage}</span>
//                 </div>
//               </div>

//               <div className="dashboard-section environmental-impact">
//                 <h2>Environmental Impact</h2>
//                 <div className="impact-details">
//                   <p>{environmentalImpact}</p>
//                 </div>
//               </div>

//               <div className="dashboard-section todays-report">
//                 <h2>Today's Report</h2>
//                 <div className="report-content">
//                   <p>{todaysReport}</p>
//                 </div>
//               </div>

//               <div className="dashboard-section billing-history">
//                 <h2>Billing History</h2>
//                 <div className="billing-list">
//                   <ul>
//                     {billingHistory.map((bill, index) => (
//                       <li key={index}>
//                         <span className="billing-month">{bill.month}:</span>
//                         <span className="billing-amount">{bill.amount}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               <div className="dashboard-section leaderboard">
//                 <h2>Leaderboard</h2>
//                 <table className="leaderboard-table">
//                   <thead>
//                     <tr>
//                       <th>Rank</th>
//                       <th>House</th>
//                       <th>Consumption</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {leaderboardData.map((item, index) => (
//                       <tr key={index}>
//                         <td>{index + 1}</td>
//                         <td>{item.house}</td>
//                         <td>{item.consumption}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="dashboard-section graph">
//                 <h2>Energy Consumption Over Time</h2>
//                 <div className="chart-container">
//                   <Line data={graphData} />
//                 </div>
//               </div>

//               <div className="dashboard-section bar-graph">
//                 <h2 style={{ color: "black" }}>
//                   Monthly Energy Consumption per House
//                 </h2>
//                 <div className="chart-container">
//                   <Bar data={barGraphData} />
//                 </div>
//               </div>

//               <div className="dashboard-section predicted-bill">
//                 <h2 style={{ color: "black" }}>Predicted Bill</h2>
//                 <div className="bill-content">
//                   <p>
//                     Your estimated bill for this month is{" "}
//                     <strong>{predictedBill}</strong>. This estimate is based on
//                     your energy consumption trends over the past month.
//                   </p>
//                   <p>
//                     Keep an eye on your consumption to stay within your budget
//                     and avoid extra charges.
//                   </p>
//                 </div>
//               </div>
//               {/*
//               <div className="dashboard-section notifications">
//                 <h2 style={{ color: "black" }}>Notifications</h2>
//                 <div className="notifications-content">
//                   <ul>
//                     {notifications.map((notification, index) => (
//                       <li key={index} className="notification-item">
//                         {notification}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div> */}
//             </div>
//           </>
//         )}

//         {activeSection === "report" && (
//           <div className="report-section">
//             <h1>Report Issue</h1>
//             <p>
//               Fill out the form to report any issues related to your energy
//               usage or system.
//             </p>
//             <form className="report-form">
//               <label htmlFor="issue-type">Issue Type:</label>
//               <select id="issue-type" name="issue-type">
//                 <option value="low-energy">Low Energy Output</option>
//                 <option value="high-bill">Unexpected High Bill</option>
//                 <option value="system">System Malfunction</option>
//               </select>
//               <label htmlFor="details">Details:</label>
//               <textarea id="details" name="details" rows="4" />
//               <button type="submit">Submit</button>
//             </form>
//           </div>
//         )}

//         {activeSection === "notifications" && (
//           <div>
//             <h1>Notifications</h1>
//             <ul>
//               {notifications.map((notification, index) => (
//                 <li key={index}>{notification}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {activeSection === "profile" && (
//           <div>
//             <h1>Profile</h1>
//             <p>View and edit your profile information here.</p>
//           </div>
//         )}

//         {activeSection === "settings" && (
//           <div>
//             <h1>Settings</h1>
//             <p>Modify your dashboard settings here.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
