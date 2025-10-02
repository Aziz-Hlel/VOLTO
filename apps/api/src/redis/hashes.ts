

export const REDIS_HASHES = {
  USER_SESSION: (userId: string) => `user:${userId}:session`,

  LADIES_NIGHT: {
    USER: {
      HASH: (userId: string) => `ladies_night:user:${userId}`,
      ALL_HASHES: () => 'ladies_night:user:*',
      USER_DRINKS_CONSUMED: () => 'user_drinks_consumed',
      USER_CODE: () => 'user_code',
      SOCKET_ID: () => 'socket_id',
    },

    CODES: () => 'ladies_night:codes',

    DATE: {
      HASH: () => 'ladies_night:date',
      CRON_START_DATE: () => 'start_date',
      CRON_END_DATE: () => 'end_date',
    },
  },

  SPINNING_WHEEL: {
    USER: {
      HASH: (userId: string) => `spinning_wheel:user:${userId}`,
      ALL_HASHES: () => 'spinning_wheel:user:*',
      USER_CODE: () => 'user_code',
      USER_REDEEMED_CODE: () => 'code_redeemed',
      REWARD_ID: () => 'reward_id',
    },
    DATE: {
      HASH: () => 'spinning_wheel:date',
      START_DATE: () => 'start_date',
      END_DATE: () => 'end_date',
      NAME: () => 'name',
    },

    CODES: () => 'spinning_wheel:codes',

    REWARDS: {
      REWARD_NAME: () => `spinning_wheel:rewards`,
    },
    
  },

  RESET_PASSWORD:{
      HASH : (token: string) => `reset_password:${token}`,
      UserEmail: () => 'user_email',
      RequestCount: () => 'request_count',
      EXP: () =>  60 * 60, // 1 hour
    },

  RESET_PASSWORD_RATE_LIMIT: {
    HASH : (email: string) => `reset_password:rate_limit:${email}`,
    RequestCount: () => 'request_count',
    RateLimit : () => 3 as const ,
    EXP: () =>  60 * 60, // 1 hour
  },

} as const;

