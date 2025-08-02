let environment = "dev";
// let environment = "production";

const config = {
    baseURL: environment === "production" ? import.meta.env.VITE_APP_URL_PROD : import.meta.env.VITE_APP_URL_LOCAL,
    siteUrl: environment === "production" ? import.meta.env.VITE_SITE_URL_PROD : import.meta.env.VITE_SITE_URL_LOCAL,
    socketUrl: environment === "production" ? import.meta.env.VITE_APP_SOCKET_URL_PROD : import.meta.env.VITE_APP_SOCKET_URL_LOCAL,
};

export default config;
