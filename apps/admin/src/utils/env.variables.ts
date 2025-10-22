const BASE_URL = import.meta.env.VITE_API_URL;
const NODE_ENV = import.meta.env.VITE_NODE_ENV;

const ENV = {
  BASE_URL,
  NODE_ENV,
};

(Object.keys(ENV) as Array<keyof typeof ENV>).forEach((key) => {
  if (!ENV[key] || ENV[key] === "") {
    alert(`${key} is not defined in the environment variables`);
    throw new Error(`${key} is not defined in the environment variables`);
  }
});

console.log("✅   ENV is valid");

export default ENV;
