export const BASE_URL = import.meta.env.VITE_API_URL || "https://expense-tracker-o6d1.onrender.com";

// utils/apiPaths.js
export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        GET_USER_INFO: "/api/auth/getUser",
    },
    DASHBOARD: {
        GET_DATA: "/api/dashboard",
    },
    INCOME: {
        GET_ALL_INCOME: "/api/income/get",
        ADD_INCOME: "/api/income/add",
        UPDATE_INCOME: (incomeId) => `/api/income/${incomeId}`,
        DELETE_INCOME: (incomeId) => `/api/income/${incomeId}`,
        DOWNLOAD_INCOME: "/api/income/downloadexcel",
    },
    EXPENSE: {
        GET_ALL_EXPENSE: "/api/expense/get",
        ADD_EXPENSE: "/api/expense/add",
        UPDATE_EXPENSE: (expenseId) => `/api/expense/${expenseId}`,
        DELETE_EXPENSE: (expenseId) => `/api/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/expense/downloadexcel",
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/uploadProfileImage",
    },
    LOGOUT: "/api/auth/logout",
};
