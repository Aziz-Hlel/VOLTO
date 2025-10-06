const BASE_URL = import.meta.env.VITE_API_URL;

const ENV = {
  BASE_URL,
};

(Object.keys(ENV) as Array<keyof typeof ENV>).forEach((key) => {
  if (!ENV[key] || ENV[key] === "") {
    alert(`${key} is not defined in the environment variables`);
    throw new Error(`${key} is not defined in the environment variables`);
  }
});

console.log("✅   ENV is valid");

export default ENV;
