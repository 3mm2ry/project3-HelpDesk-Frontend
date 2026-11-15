import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllTickets } from "../services/ticketService";
import { getAllAssets } from "../services/assetServices";
import { getAllUsers } from "../services/userService";
import "./Dashboard.css";

function Dashboard({ user }) {
  const [tickets, setTickets] = useState([]);
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      setTickets(await getAllTickets());

      if (user.role !== "Employee") {
        setAssets(await getAllAssets());
      }

      if (user.role === "Admin") {
        setUsers(await getAllUsers());
      }
    } catch (err) {
      setError("Could not load dashboard data");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // ----- Counting -----
  const today = new Date().toDateString();

  const ticketStats = [
    { label: "Total Tickets", number: tickets.length },
    {
      label: "Today",
      number: tickets.filter(
        (oneTicket) => new Date(oneTicket.createdAt).toDateString() === today
      ).length,
    },
    {
      label: "Open",
      number: tickets.filter((oneTicket) => oneTicket.status === "Open").length,
    },
    {
      label: "In Progress",
      number: tickets.filter((oneTicket) => oneTicket.status === "In Progress").length,
    },
    {
      label: "Resolved",
      number: tickets.filter((oneTicket) => oneTicket.status === "Resolved").length,
    },
    {
      label: "Urgent",
      number: tickets.filter(
        (oneTicket) => oneTicket.priority === "Urgent" && oneTicket.status !== "Closed"
      ).length,
    },
  ];

  const assetStats = [
    {
      label: "Available Assets",
      number: assets.filter((oneAsset) => oneAsset.status === "Available").length,
    },
    {
      label: "Borrowed Assets",
      number: assets.filter((oneAsset) => oneAsset.status === "Borrowed").length,
    },
    {
      label: "Pending Requests",
      number: assets.filter((oneAsset) => oneAsset.borrowStatus === "Pending").length,
    },
  ];

  const peopleStats = [
    {
      label: "Employees",
      number: users.filter((oneUser) => oneUser.role === "Employee").length,
    },
    {
      label: "IT Staff",
      number: users.filter((oneUser) => oneUser.role === "IT-Staff").length,
    },
    { label: "All Users", number: users.length },
  ];

  // ----- Big cards -----
  const employeeCards = [
    { title: "Create a Ticket", text: "Report a new IT problem.", link: "/tickets/new" },
    { title: "Track My Tickets", text: "See the status of your tickets.", link: "/tickets" },
    { title: "Book an Asset", text: "Borrow a laptop or another device.", link: "/assets" },
    { title: "AI Assistant", text: "Get quick steps to fix common problems.", link: "/ai-assistant" },
  ];

  const staffCards = [
    { title: "All Tickets", text: "View and manage every ticket.", link: "/tickets" },
    { title: "Borrow Requests", text: "Approve or reject asset requests.", link: "/asset-requests" },
    { title: "Inventory", text: "Manage all IT equipment.", link: "/assets" },
    { title: "Office Map", text: "Find employee desks.", link: "/locations" },
  ];

  const adminCards = [
    ...staffCards,
    { title: "Users", text: "Manage accounts and roles.", link: "/users" },
    { title: "Departments", text: "Manage company departments.", link: "/departments" },
  ];

  let cards = staffCards;
  if (user.role === "Employee") {
    cards = employeeCards;
  }
  if (user.role === "Admin") {
    cards = adminCards;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.username}</h1>
      <p>Role: {user.role}</p>

      {error ? <p className="error">{error}</p> : null}

      {user.role === "Employee" ? (
        <p>
          HelpDesk Pro helps you get IT support fast. You have{" "}
          <strong>
            {tickets.filter((oneTicket) => oneTicket.status !== "Closed").length}
          </strong>{" "}
          active tickets.
        </p>
      ) : (
        <>
          <h2>Tickets</h2>
          <div className="stats">
            {ticketStats.map((oneStat) => (
              <div className="stat-box" key={oneStat.label}>
                <p className="stat-number">{oneStat.number}</p>
                <p>{oneStat.label}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {user.role === "Admin" ? (
        <>
          <h2>Assets</h2>
          <div className="stats">
            {assetStats.map((oneStat) => (
              <div className="stat-box" key={oneStat.label}>
                <p className="stat-number">{oneStat.number}</p>
                <p>{oneStat.label}</p>
              </div>
            ))}
          </div>

          <h2>People</h2>
          <div className="stats">
            {peopleStats.map((oneStat) => (
              <div className="stat-box" key={oneStat.label}>
                <p className="stat-number">{oneStat.number}</p>
                <p>{oneStat.label}</p>
              </div>
            ))}
          </div>
        </>
      ) : null}

      <h2>Shortcuts</h2>
      <div className="cards">
        {cards.map((oneCard) => (
          <Link className="big-card" to={oneCard.link} key={oneCard.title}>
            <h3>{oneCard.title}</h3>
            <p>{oneCard.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
