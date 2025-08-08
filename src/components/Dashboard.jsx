import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Clock, AlertTriangle, MessageCircle, CheckCircle, Star, BarChart3, MessageSquare } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
const API_BASE = process.env.REACT_APP_API_BASE;


export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/dashboard/metrics`);
        if (!res.ok) {
          throw new Error(`Failed to fetch metrics: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setMetrics(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch dashboard metrics:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-header">
            <div className="loading-title"></div>
            <div className="loading-subtitle"></div>
          </div>
          <div className="loading-metrics">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="loading-card">
                <div className="loading-card-title"></div>
                <div className="loading-card-value"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <AlertTriangle className="error-icon" />
          <h2 className="error-title">Failed to Load Dashboard</h2>
          <p className="error-message">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="error-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="no-data-container">
        <div className="no-data-card">
          <MessageCircle className="no-data-icon" />
          <h2 className="no-data-title">No Data Available</h2>
          <p className="no-data-message">Dashboard metrics are not currently available.</p>
        </div>
      </div>
    );
  }

  const feedbackData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [metrics.feedbackPositive, metrics.feedbackNeutral, metrics.feedbackNegative],
        backgroundColor: ['#008080', '#FFD700', '#d12020ff'],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const interactionData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'User Messages',
        data: metrics.weeklyInteractions,
        backgroundColor: '#16a0d2ff',
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: '#2563EB',
      },
    ],
  };



  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header Section */}


        {/* Top Metrics Cards */}
        <div className="metrics-grid">
          <div className="metric-card blue">
            <div className="metric-card-header">
              <div className="metric-icon blue">
                <Clock />
              </div>
            </div>
            <h3 className="metric-title">Avg. Response Time</h3>
            <p className="metric-value default">{metrics.averageResponseTime}s</p>
 
          </div>

          <div className="metric-card red">
            <div className="metric-card-header">
              <div className="metric-icon red">
                <AlertTriangle />
              </div>
            </div>
            <h3 className="metric-title">Failed Responses</h3>
            <p className="metric-value red">{metrics.failedResponses}</p>
          </div>

          <div className="metric-card amber">
            <div className="metric-card-header">
              <div className="metric-icon amber">
                <MessageCircle />
              </div>
            </div>
            <h3 className="metric-title">Total Q&A</h3>
            <p className="metric-value default">{metrics.totalInteractions.toLocaleString()}</p>
          </div>

          <div className="metric-card emerald">
            <div className="metric-card-header">
              <div className="metric-icon emerald">
                <CheckCircle />
              </div>
            </div>
            <h3 className="metric-title">Success Rate</h3>
            <p className="metric-value emerald">{metrics.successRate}%</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-grid">
          {/* User Feedback Pie Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">User Feedback</h3>
              <div className="chart-icon blue">
                <Star />
              </div>
            </div>
            <div className="chart-container">
              <Pie
                data={feedbackData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    tooltip: {
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      titleColor: '#F8FAFC',
                      bodyColor: '#F8FAFC',
                      borderColor: '#334155',
                      borderWidth: 1,
                      callbacks: {
                        label: function (context) {
                          const label = context.label || '';
                          const value = context.raw;
                          const total = context.dataset.data.reduce((a, b) => a + b, 0);
                          const percentage = ((value / total) * 100).toFixed(1);
                          return `${label}: ${value} (${percentage}%)`;
                        },
                      },
                    },
                    legend: {
                      display: true,
                      position: 'bottom',
                      labels: {
                        padding: 20,
                        font: {
                          family: 'Inter',
                          size: 12,
                          weight: 500,
                        },
                        color: '#475569',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Weekly Interactions Bar Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Weekly Interactions</h3>
              <div className="chart-icon emerald">
                <BarChart3 />
              </div>
            </div>
            <div className="chart-container">
              <Bar
                data={interactionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      titleColor: '#F8FAFC',
                      bodyColor: '#F8FAFC',
                      borderColor: '#F8FAFC',
                      borderWidth: 1,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 10,
                        font: {
                          family: 'Inter',
                          size: 12,
                        },
                        color: '#2a0c3fff',
                      },
                      grid: {
                        color: '#E2E8F0',
                      },
                    },
                    x: {
                      ticks: {
                        font: {
                          family: 'Inter',
                          size: 12,
                          weight: 500,
                        },
                        color: '#64748B',
                      },
                      grid: {
                        display: true,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Recent Feedback Table */}
        <div className="table-card">
          <div className="table-header">
            <div className="table-header-content">
              <div className="table-header-text">
                <h3>Recent Feedback</h3>
              </div>
              <div className="table-header-icon">
                <MessageSquare />
              </div>
            </div>
          </div>

          <div className="table-container">
            <div className="table-scroll">
              <table className="feedback-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Message</th>
                    <th>Comment</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.recentFeedback?.length > 0 ? (
                    metrics.recentFeedback.map((item, index) => (
                      <tr key={index}>
                        <td className="row-number">{index + 1}</td>
                        <td className="message-cell">
                          <div className="message-text">{item.text}</div>
                        </td>
                        <td className="comment-cell">
                          {item.comment ? item.comment : <span className="no-comment">—</span>}
                        </td>
                        <td className="timestamp-cell">
                          {new Date(item.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="no-data-row">
                        No feedback available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}