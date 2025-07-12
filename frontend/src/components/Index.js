import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bolt,
  Leaf,
  Battery,
  BarChart3,
  AlertTriangle,
  Sun,
  Moon,
  TrendingUp,
  Users,
  Clock,
  Search,
  Filter,
  Download,
  Activity,
  Settings,
  Bell,
  X,
  Check,
  Zap,
  Globe,
  IndianRupee,
  ArrowLeft,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./Dash.css";

const mockWeeklyData = [
  { date: "Mon", value: 56 },
  { date: "Tue", value: 33 },
  { date: "Wed", value: 66 },
  { date: "Thu", value: 59 },
  { date: "Fri", value: 62 },
  { date: "Sat", value: 30 },
  { date: "Sun", value: 45 },
];

const MetricCard = ({ title, value, icon, trend }) => (
  <div className="dashboard-metric-card">
    <div className="dashboard-metric-header">
      {icon}
      <h3>{title}</h3>
    </div>
    <p className="dashboard-metric-value">{value}</p>
    {trend && (
      <p
        className={`dashboard-metric-trend ${
          trend.isPositive
            ? "dashboard-trend-positive"
            : "dashboard-trend-negative"
        }`}
      >
        {trend.isPositive ? "▲" : "▼"} {trend.value}%
      </p>
    )}
  </div>
);

const UsageChart = ({ data, title, unit = "kWh" }) => (
  <div className="dashboard-chart-card">
    <h3>{title}</h3>
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const LeaderboardCard = ({ leaderboard }) => (
  <div className="dashboard-leaderboard-card">
    <h3>
      <Users className="card-icon" /> Efficiency Leaderboard
    </h3>
    <ul>
      {leaderboard.map((user, index) => (
        <li key={index} className="leaderboard-item">
          <div className="leaderboard-rank">{index + 1}</div>
          <div className="leaderboard-user">
            <span className="user-name">{user.name}</span>
            <div className="efficiency-bar">
              <div 
                className="efficiency-fill"
                style={{ width: `${user.efficiency}%` }}
              />
            </div>
          </div>
          <span className="efficiency-value">{user.efficiency}%</span>
        </li>
      ))}
    </ul>
  </div>
);

const IncidentReporting = ({ addIncident }) => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {};
    
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!location.trim()) {
      newErrors.location = "Location is required";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      addIncident({ 
        description, 
        location, 
        priority,
        timestamp: new Date().toISOString(),
        status: "pending"
      });
      setDescription("");
      setLocation("");
      setPriority("medium");
      setErrors({});
      setTimeout(() => setIsSubmitting(false), 500);
    }
  };

  const getPriorityBadgeStyle = (priority) => {
    switch (priority) {
      case 'high': return { backgroundColor: '#ef4444', color: 'white' };
      case 'medium': return { backgroundColor: '#f59e0b', color: 'white' };
      case 'low': return { backgroundColor: '#22c55e', color: 'white' };
      default: return { backgroundColor: '#6b7280', color: 'white' };
    }
  };

  return (
    <div className="dashboard-incident-card enhanced">
      <div className="incident-card-header">
        <div className="header-title">
          <AlertTriangle className="header-icon" />
          <h3>Report Incident</h3>
        </div>
        <div className="priority-preview">
          <span className="priority-label">Priority:</span>
          <span 
            className="priority-badge" 
            style={getPriorityBadgeStyle(priority)}
          >
            {priority.toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="incident-form-enhanced">
        <div className="form-row">
          <div className="form-field">
            <label className="floating-label">Issue Description *</label>
            <textarea
              placeholder="Describe the incident in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
        </div>
        
        <div className="form-row-double">
          <div className="form-field">
            <label className="floating-label">Location *</label>
            <input
              type="text"
              placeholder="Enter exact location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={errors.location ? 'error' : ''}
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>
          
          <div className="form-field">
            <label className="floating-label">Priority Level</label>
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select-enhanced"
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
          </div>
        </div>
        
        <button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className={`submit-btn-enhanced ${isSubmitting ? 'submitting' : ''}`}
        >
          {isSubmitting ? (
            <>
              <div className="spinner"></div>
              Submitting...
            </>
          ) : (
            <>
              <AlertTriangle size={18} />
              Submit Report
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const energySourceData = [
  { name: 'Solar', value: 45, color: '#22c55e' },
  { name: 'Grid', value: 35, color: '#6366f1' },
  { name: 'Wind', value: 15, color: '#06b6d4' },
  { name: 'Battery', value: 5, color: '#f59e0b' },
];

const activityData = [
  { time: '2 mins ago', type: 'incident', message: 'New incident reported: Power fluctuation' },
  { time: '15 mins ago', type: 'achievement', message: 'Energy efficiency goal achieved!' },
  { time: '1 hour ago', type: 'alert', message: 'High consumption detected in Zone A' },
  { time: '3 hours ago', type: 'info', message: 'Maintenance scheduled for tomorrow' },
];

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <Check className="toast-icon" />;
      case 'error': return <X className="toast-icon" />;
      case 'warning': return <AlertTriangle className="toast-icon" />;
      default: return <Bell className="toast-icon" />;
    }
  };

  return (
    <div className={`toast toast-${type}`}>
      {getIcon()}
      <span className="toast-message">{message}</span>
      <button onClick={onClose} className="toast-close">
        <X size={16} />
      </button>
    </div>
  );
};

// Quick Actions Component
const QuickActions = ({ showToast, exportData, setSearchTerm }) => {
  const actions = [
    { 
      icon: <Zap />, 
      label: 'Quick Report', 
      action: () => {
        setSearchTerm('');
        showToast('Quick report mode activated!', 'info');
      }
    },
    { 
      icon: <Download />, 
      label: 'Export Data', 
      action: exportData
    },
    { 
      icon: <Settings />, 
      label: 'Settings', 
      action: () => showToast('Settings panel coming soon!', 'info')
    },
    { 
      icon: <Activity />, 
      label: 'Analytics', 
      action: () => showToast('Advanced analytics coming soon!', 'info')
    },
  ];

  return (
    <div className="quick-actions">
      <h4>Quick Actions</h4>
      <div className="action-buttons">
        {actions.map((action, index) => (
          <button key={index} className="action-btn" onClick={action.action}>
            {action.icon}
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Activity Feed Component
const ActivityFeed = ({ activities }) => (
  <div className="activity-feed">
    <h3><Activity className="card-icon" /> Recent Activity</h3>
    <div className="activity-list">
      {activities.map((activity, index) => (
        <div key={index} className={`activity-item activity-${activity.type}`}>
          <div className="activity-time">{activity.time}</div>
          <div className="activity-message">{activity.message}</div>
        </div>
      ))}
    </div>
  </div>
);

// Energy Sources Chart Component
const EnergySourcesChart = ({ data }) => (
  <div className="dashboard-chart-card">
    <h3><Globe className="card-icon" /> Energy Sources</h3>
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// Search and Filter Component
const SearchFilter = ({ searchTerm, setSearchTerm, filterPriority, setFilterPriority, filterStatus, setFilterStatus }) => (
  <div className="search-filter">
    <div className="search-box">
      <Search className="search-icon" />
      <input
        type="text"
        placeholder="Search incidents..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <div className="filter-controls">
      <select 
        value={filterPriority} 
        onChange={(e) => setFilterPriority(e.target.value)}
        className="filter-select"
      >
        <option value="">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select 
        value={filterStatus} 
        onChange={(e) => setFilterStatus(e.target.value)}
        className="filter-select"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="resolved">Resolved</option>
      </select>
    </div>
  </div>
);

// Statistics Overview Component
const StatisticsOverview = ({ incidents }) => {
  const totalIncidents = incidents.length;
  const highPriorityIncidents = incidents.filter(i => i.priority === 'high').length;
  const activeIncidents = incidents.filter(i => i.status === 'active').length;
  const todayIncidents = incidents.filter(i => {
    const today = new Date().toDateString();
    return new Date(i.timestamp).toDateString() === today;
  }).length;

  const stats = [
    { label: 'Total Incidents', value: totalIncidents, color: 'var(--primary-color)' },
    { label: 'High Priority', value: highPriorityIncidents, color: 'var(--danger-color)' },
    { label: 'Active Now', value: activeIncidents, color: 'var(--warning-color)' },
    { label: 'Today', value: todayIncidents, color: 'var(--success-color)' },
  ];

  return (
    <div className="statistics-overview">
      <h4><BarChart3 className="card-icon" /> Incident Statistics</h4>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [leaderboard, setLeaderboard] = useState([
    { name: "Michael Brown", efficiency: 97 },
    { name: "Christopher Wilson", efficiency: 96 },
    { name: "Olivia Martin", efficiency: 94 },
    { name: "Alice Johnson", efficiency: 93 },
    { name: "Emily Davis", efficiency: 92 },
    { name: "Sophia Anderson", efficiency: 91 },
  ]);
  const [weeklyData, setWeeklyData] = useState(mockWeeklyData);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [incidents, setIncidents] = useState([
    { 
      description: "Broken power line", 
      location: "Oak Street",
      priority: "high",
      timestamp: new Date().toISOString(),
      status: "active"
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const incidentsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [toasts, setToasts] = useState([]);
  const [activities, setActivities] = useState(activityData);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setWeeklyData(prevData => 
        prevData.map(point => ({
          ...point,
          value: Math.max(20, Math.min(80, point.value + (Math.random() - 0.5) * 10))
        }))
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const addIncident = (incident) => {
    setIncidents((prev) => [incident, ...prev]);
    showToast('Incident reported successfully!', 'success');
    
    // Add to activity feed
    setActivities(prev => [{
      time: 'Just now',
      type: 'incident',
      message: `New incident: ${incident.description}`
    }, ...prev.slice(0, 9)]);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'var(--danger-color)';
      case 'medium': return 'var(--warning-color)';
      case 'low': return 'var(--success-color)';
      default: return 'var(--text-secondary)';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'var(--danger-color)';
      case 'pending': return 'var(--warning-color)';
      case 'resolved': return 'var(--success-color)';
      default: return 'var(--text-secondary)';
    }
  };

  // Filter incidents based on search and filters
  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = !filterPriority || incident.priority === filterPriority;
    const matchesStatus = !filterStatus || incident.status === filterStatus;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  // Calculate pagination
  const indexOfLastIncident = currentPage * incidentsPerPage;
  const indexOfFirstIncident = indexOfLastIncident - incidentsPerPage;
  const currentIncidents = filteredIncidents.slice(indexOfFirstIncident, indexOfLastIncident);
  const totalPages = Math.ceil(filteredIncidents.length / incidentsPerPage);

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Timestamp,Description,Location,Priority,Status\n" +
      incidents.map(incident => 
        `${incident.timestamp},${incident.description},${incident.location},${incident.priority},${incident.status}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "incidents_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Data exported successfully!', 'success');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  return (
    <div
      className={`dashboard-container ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      <header className="dashboard-header">
        <div className="header-left">
          <button className="back-button" onClick={handleBackToHome}>
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          <h1>Welcome, {userName}</h1>
          <p className="date-display">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="header-right">
          <div className="dashboard-theme-toggle">
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-metrics-row">
        <MetricCard
          title="Current Power"
          value="4.2 kW"
          icon={<Bolt className="metric-icon" />}
          trend={{ value: 5, isPositive: false }}
        />
        <MetricCard
          title="Daily Usage"
          value="8.5 kWh"
          icon={<Battery className="metric-icon" />}
          trend={{ value: 3, isPositive: true }}
        />
        <MetricCard
          title="Predicted Monthly Bill"
          value="₹4563.29"
          icon={<IndianRupee className="metric-icon" />}
        />
        <MetricCard
          title="Carbon Saved"
          value="125 kg"
          icon={<Leaf className="metric-icon" />}
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      <div className="dashboard-row">
        <UsageChart data={weeklyData} title="Weekly Energy Consumption" />
        <LeaderboardCard leaderboard={leaderboard} />
      </div>

      <div className="dashboard-lower-row">
        <IncidentReporting addIncident={addIncident} />
        <div className="dashboard-warnings-card">
          <div className="card-header-with-actions">
            <h3><AlertTriangle className="card-icon" /> Reported Incidents</h3>
            <button onClick={exportData} className="export-btn">
              <Download size={16} />
              Export
            </button>
          </div>
          <StatisticsOverview incidents={incidents} />
          <SearchFilter 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          <div className="incidents-list">
            {currentIncidents.map((incident, index) => (
              <div key={index} className="dashboard-alert">
                <div className="alert-header">
                  <span className="alert-time">
                    {new Date(incident.timestamp).toLocaleString()}
                  </span>
                  <div className="alert-status-container">
                    <span 
                      className="alert-priority"
                      style={{ backgroundColor: getPriorityColor(incident.priority) }}
                    >
                      {incident.priority}
                    </span>
                    <span 
                      className="alert-status"
                      style={{ color: getStatusColor(incident.status) }}
                    >
                      {incident.status}
                    </span>
                  </div>
                </div>
                <p><strong>Issue:</strong> {incident.description}</p>
                <p><strong>Location:</strong> {incident.location}</p>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
        <div className="dashboard-tips-card">
          <h4><TrendingUp className="card-icon" /> Energy Saving Tips</h4>
          <ul>
            <li>
              <div className="tip-header">AC Efficiency in Indian Summer</div>
              <p>Set your AC to <strong>24°C</strong> instead of 18°C to save up to <strong>₹3,000</strong> per month on electricity bills.</p>
            </li>
            <li>
              <div className="tip-header">Solar Investment</div>
              <p>Solar panels can save Indian households over <strong>₹20,00,000</strong> in electricity costs over 20 years, with government subsidies reducing initial costs.</p>
            </li>
            <li>
              <div className="tip-header">LED Bulb Savings</div>
              <p>Replacing 10 incandescent bulbs with LEDs can save <strong>₹2,400</strong> annually and reduce electricity consumption by 80%.</p>
            </li>
            <li>
              <div className="tip-header">Ceiling Fan + AC Combo</div>
              <p>Using ceiling fans with AC allows you to increase thermostat by 3-4°C while maintaining comfort, saving <strong>30-40%</strong> on cooling costs.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
