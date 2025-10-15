import ENV from "../utils/env.variables";

const apiRoutes = {
  baseUrl: ENV.BASE_URL,

  auth: {
    me: () => "/auth/me" as const,
    login: () => "/auth/login" as const,
    refresh: () => "/auth/refresh" as const,
    signUp: () => "/auth/register/" as const,
  },
  staff: {
    list: () => "/staff" as const,
    get: (staffId: string) => `/staff/${staffId}` as const,
    create: () => "/staff/" as const,
    update: (staffId: string) => `/staff/${staffId}` as const,
    delete: (staffId: string) => `/staff/${staffId}` as const,
  },

  gallery: {
    list: () => "/gallery/" as const,
  },

  events: {
    list: () => "/events/list" as const,
    get: (eventId: string) => `/events/${eventId}` as const,
    create: () => "/events/" as const,
    update: (eventId: string) => `/events/${eventId}` as const,
    delete: (eventId: string) => `/events/${eventId}` as const,
  },

  ladiesNight: {
    details: () => "/ladies-night/details" as const,
    getQuota: () => "/ladies-night/quota" as const,
    updateQuota: () => "/app-settings/ladies-night/drink-quota" as const,
    stats: () => "/ladies-night-stats/list" as const,
    statsByPeriod: () => "/ladies-night-stats/periodic" as const,
  },

  spinningWheel: {
    details: () => "/spinning-wheel/admin/instance" as const,
    update: () => "/spinning-wheel/admin/instance" as const,
  },

  media: {
    presignedUrl: () => "/media/presigned-url" as const,
  },
  images: () => ENV.BASE_URL + "/images/",
};

export default apiRoutes;
