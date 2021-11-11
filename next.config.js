module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    LOCAL_URL: process.env.LOCAL_URL,
    NEXTAUTH_URL: process.env.LOCAL_URL,
    HOSTNAME_URL: process.env.HOSTNAME_URL,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    FACEBOOK_ID: process.env.FACEBOOK_ID,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
    GOOGLE_USER: process.env.GOOGLE_USER,
    GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    REGION_ADDRESS: process.env.REGION_ADDRESS,
    PROVINCE_ADDRESS: process.env.PROVINCE_ADDRESS,
    CITIES_ADDRESS: process.env.CITIES_ADDRESS,
    BRGY_ADDRESS: process.env.BRGY_ADDRESS,
  },
  reactStrictMode: true,
};
