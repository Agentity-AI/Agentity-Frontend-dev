import { create } from "zustand";
import api from "../axios/axiosInitaition";
import toast from "react-hot-toast";

export const authentication = create((set) => ({
  dashBoard: null,
  loading: false,
  error: null,
  alerts: [],
  alertSummary: null,
  agents: [],
  agentDetails: null,
  user: null,
  audits: [],
  tasksHistory: [],
  simulations: [],
  transactions:[],
  policies:[],
  txTotal:0,
  totalVolume:0,
  highRisk: 0,
  runSimulationData:null,

  registerUser: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post("/auth/register", payload);

      if (!res || res.status < 200 || res.status >= 300) {
        alert("Registration failed, please try again");
        set({ loading: false });
        return;
      }

      const { dashboard, email, name } = res.data;

      set({
        dashBoard: dashboard,
        user: { email, name },
        loading: false,
      });
      toast.success("Registration successful!", { id: "register" });
      // TODO: optionally persist jwt (localStorage / cookie)
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to register user",
      });
      toast.error("Registration failed, please try again", { id: "register" });
    }
  },

  loginUser: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post("/auth/login", payload);

      if (!res || res.status < 200 || res.status >= 300) {
        toast.error("Login failed, please try again");
        set({ loading: false });
        return;
      }

      const {  dashboard, email, name } = res.data;

      set({
        dashBoard: dashboard,
        user: { email, name },
        loading: false,
      });
      toast.success("Login successful!", { id: "login" });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to login user",
      });
      toast.error("Login failed, please try again", { id: "login" });
    }
  },

  getDashboard: async () => {
    try {
      set({ loading: true, error: null });

      const res = await api.get("/dashboard/overview");
      set({ dashBoard: res.data, loading: false });
    } catch (err) {
      set({
        loading: false,
        error:
          err?.response?.data?.message ?? "Failed to get dashboard data",
      });
    }
  },

  getUserAgents: async () => {
    try {
      set({ loading: true, error: null });

      const res = await api.get("/agents/my");
        console.log("getUserAgents response:", res);
      set({ agents: res.data.items, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to get user agents",
      });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });

      await api.post("/auth/logout");

      set({ dashBoard: null, user: null, loading: false });
      toast.success("Logged out successfully!", { id: "logout" });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to logout",
      });
      toast.error("Logout failed, please try again", { id: "logout" });
    }
  },

  registerAgent: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post("/agents/register", payload);

      if (!res || res.status < 200 || res.status >= 300) {
        toast.error("Agent registration failed, please try again", {
          id: "register-agent",
        });
        set({ loading: false });
        return;
      }

      toast.success("Agent registered!", { id: "register-agent" });
      set({ loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to register agent",
      });
      toast.error("Failed to register agent", { id: "register-agent" });
    }
  },

  getAudit: async () => {
    try {
      set({ loading: true, error: null });

      const res = await api.get("/audits/history");

      if (!res || res.status < 200 || res.status >= 300) {
        toast.error("Failed to load audit, please try again", {
          id: "load-audit",
        });
        set({ loading: false });
        return;
      }

      toast.success("Audit loaded!", { id: "load-audit" });
      set({ loading: false, audit: res.data });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to load audit",
      });
      toast.error("Failed to load audit", { id: "load-audit" });
    }
  },

  verifyAgent: async (agentId) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post(`/agents/${agentId}/verify`);

      if (!res || res.status < 200 || res.status >= 300) {
        toast.error("Agent verification failed, please try again", {
          id: "verify-agent",
        });
        console.error("Verification failed response:", res);
        set({ loading: false });
        return;
      }

      console.log("Verification successful response:", res);
      toast.success("Agent verified!", { id: "verify-agent" });
      set({ loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to verify agent",
      });
      toast.error("Failed to verify agent", { id: "verify-agent" });
    }
  },

  getTasksHistory: async () => {
    try {
      set({ loading: true, error: null });

      const res = await api.get("/tasks/history");

      if (!res || res.status < 200 || res.status >= 300) {
        set({ loading: false });
        return;
      }
      set({ loading: false, tasksHistory: res.data });
    } catch (err) {
      set({
        loading: false,
        error:
          err?.response?.data?.message ?? "Failed to load tasks history",
      });
    }
  },

  runSimulation: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post("/simulation/run", payload);

      if (!res || res.status < 200 || res.status >= 300) {
        toast.error("Simulation failed, please try again", {
          id: "run-simulation",
        });
        set({ loading: false });
        return;
      }

      toast.success("Simulation run successfully!", {
        id: "run-simulation",
      });
      set({ loading: false ,runSimulationData: res.data});
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to run simulation",
      });
      toast.error("Failed to run simulation", { id: "run-simulation" });
    }
  },

  getSimulations: async () => {
    try {
      set({ loading: true, error: null });

      const res = await api.get("/simulation/history");

      if (!res || res.status < 200 || res.status >= 300) {
        set({ loading: false });
        return;
      }

      set({ loading: false, simulations: res.data.items });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to load simulations",
      });
      toast.error("Failed to load simulations", { id: "load-simulations" });
    }
  },
  registerTask: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post("/tasks/request", payload);

      if (!res || res.status < 200 || res.status >= 300) {
        toast.error("Task registration failed, please try again", {
          id: "register-task",
        });
        set({ loading: false });
        return;
      }

      toast.success("Task registered!", { id: "register-task" });
      set({ loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to register task",
      });
      toast.error("Failed to register task", { id: "register-task" });
    }
  },
  payTask:async (id)=>{
    try {
      set({ loading: true, error: null });

      const res = await api.post(`/tasks/${id}/pay`);

      if (!res || res.status < 200 || res.status >= 300) {
        toast.error("Payment failed, please try again", {
          id: "pay-task",
        });
        set({ loading: false });
        return;
      }

      toast.success("Task paid!", { id: "pay-task" });
      set({ loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to pay for task",
      });
      toast.error("Failed to pay for task", { id: "pay-task" });
  }},
  executeTask:async (id)=>{
    try {
      set({ loading: true, error: null });

      const res = await api.post(`/tasks/${id}/execute`);

      if (!res || res.status < 200 || res.status >= 300) {
        toast.error("Execution failed, please try again", {
          id: "execute-task",
        });
        set({ loading: false });
        return;
      }

      toast.success("Task executed!", { id: "execute-task" });
      set({ loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to execute task",
      });
      toast.error("Failed to execute task", { id: "execute-task" });
    }
  },
  registerTransaction: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post("/transactions/policies", payload);

      if (!res || res.status < 200 || res.status >= 300) {
        toast.error("Transaction registration failed, please try again", {
          id: "register-transaction",
        });
        set({ loading: false });
        return;
      }
      
      toast.success("Transaction registered!", { id: "register-transaction" });
      set({ loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to register transaction",
      });
      toast.error("Failed to register transaction", { id: "register-transaction" });
    }
  },
  getTransactionsPolicies: async () => {
    try {
      set({ loading: true, error: null });

      const res = await api.get("/transactions/policies");

      if (!res || res.status < 200 || res.status >= 300) {
        set({ loading: false });
        return;
      }
      set({ loading: false, policies: res.data.items });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to load transactions",
      });
    }
  },
  getTransactionHistory: async () => {
    try {
      set({ loading: true, error: null });

      const res = await api.get("/transactions/history");
        console.log("getTransactionHistory response:", res);
      if (!res || res.status < 200 || res.status >= 300) {
        set({ loading: false });
        return;
      }
      set({ loading: false, transactions: res.data.items, txTotal: res.data.total
        ,highRisk: res.data.highRisk, totalVolume: res.data.totalVolume });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to load transaction history",
      });
    }
  },
  getTransactionById: async (id) => {
    try {
      set({ loading: true, error: null });

      const res = await api.get(`/transactions/${id}`);

      if (!res || res.status < 200 || res.status >= 300) {
        set({ loading: false });
        return;
      }
      set({ loading: false, transactionDetails: res.data });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to load transaction details",
      });
    }
  },
    getAuditHistory: async () => {
      try {
      set({ loading: true, error: null });

      const res = await api.get("/audits/history");

      if (!res || res.status < 200 || res.status >= 300) {
        set({ loading: false });
        return;
      }
      set({ loading: false, audits: res.data.items });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to load audit history",
        });
    }
  },
  registerAudit: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post("/audits", payload);

      if (!res || res.status < 200 || res.status >= 300) {
        toast.error("Audit registration failed, please try again", {
          id: "register-audit",
        });
        set({ loading: false });
        return;
      }

      toast.success("Audit registered!", { id: "register-audit" });
      set({ loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to register audit",
      });
      toast.error("Failed to register audit", { id: "register-audit" });
    }
  },
  getAlert: async () => {
    try {
      set({ loading: true, error: null });

      const res = await api.get("/alerts");

      if (!res || res.status < 200 || res.status >= 300) {
        set({ loading: false });
        return;
      }
      set({ loading: false, alerts: res.data.items });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to load alerts",
      });
    }
  },
  getAlertSummary: async () => {
    try {
      set({ loading: true, error: null });

      const res = await api.get("/alerts/summary");

      if (!res || res.status < 200 || res.status >= 300) {
        set({ loading: false });
        return;
      }

      toast.success("Alert summary loaded!", { id: "load-alert-summary" });
      set({ loading: false, alertSummary: res.data });
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message ?? "Failed to load alert summary",
      });
    }
  },
}));
