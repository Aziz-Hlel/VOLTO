import ENV from "@/config/ENV";

const apiRoutes = {
  baseUrl: ENV.BASE_URL,

  resetPassword: {
    confirm: () => "/reset-password/confirm" as const,
  },
};

export default apiRoutes;
