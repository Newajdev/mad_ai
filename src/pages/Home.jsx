import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Icon } from "@iconify/react";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

import { getDashboard } from "../api/dashboardApi";
import { getDoctors } from "../api/doctorsApi";
import { getPharmacies } from "../api/pharmaciesApi";

export default function Home() {
  const [stats, setStats] = useState([
    {
      title: "Total Users",
      value: 0,
      icon: "material-symbols:group-outline",
    },
    {
      title: "Total Doctors",
      value: 0,
      icon: "material-symbols:medication-outline",
    },
    {
      title: "Total Pharmacies",
      value: 0,
      icon: "material-symbols:sync-alt",
    },
  ]);

  const [userGrowthData, setUserGrowthData] = useState([]);

  // 🔹 Medicine chart fallback (unchanged)
  const medicineData = [
    { month: "Jan", value: 7 },
    { month: "Feb", value: 12 },
    { month: "Mar", value: 11 },
    { month: "Apr", value: 15 },
    { month: "May", value: 6 },
    { month: "Jun", value: 11 },
    { month: "Jul", value: 12 },
    { month: "Aug", value: 13 },
    { month: "Sep", value: 15 },
    { month: "Oct", value: 12 },
    { month: "Nov", value: 16 },
    { month: "Dec", value: 18 },
  ];

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchDashboardData();
      hasFetched.current = true;
    }
  }, []);

  const fetchDashboardData = async () => {
    const toastId = toast.loading("Loading dashboard...");

    try {
      const [dashboardData, doctorData, pharmacyData] =
        await Promise.all([
          getDashboard(),
          getDoctors(),
          getPharmacies(),
        ]);

      setStats([
        {
          title: "Total Users",
          value: dashboardData.total_users || 0,
          icon: "material-symbols:group-outline",
        },
        {
          title: "Total Doctors",
          value: doctorData.doctors?.length || 0,
          icon: "material-symbols:medication-outline",
        },
        {
          title: "Total Pharmacies",
          value:
            pharmacyData.total_pharmacies ||
            pharmacyData.pharmacies?.length ||
            0,
          icon: "material-symbols:sync-alt",
        },
      ]);

      const growthArray = Object.entries(
        dashboardData.monthly_user_growth || {}
      ).map(([month, value]) => ({
        month,
        value,
      }));

      setUserGrowthData(growthArray);

      toast.success("Dashboard loaded successfully ✅", {
        id: toastId,
      });
    } catch (error) {
      toast.error("Failed to load dashboard ❌", {
        id: toastId,
      });
    }
  };

  return (
    <div className="space-y-10">

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-primary-light p-6 rounded-2xl">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-text-muted font-semibold">
                {item.title}
              </p>
              <h3 className="text-3xl font-bold mt-2">
                {item.value}
              </h3>
            </div>

            <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-primary-light text-primary">
              <Icon icon={item.icon} width="26" height="26" />
            </div>
          </div>
        ))}
      </div>

      {/* ================= CHART SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* USER GROWTH */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-primary font-semibold mb-4">
            User Growth
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#DA722C"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MONTHLY MEDICINE */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-primary font-semibold mb-4">
            Monthly Added Medication
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={medicineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#DA722C"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
