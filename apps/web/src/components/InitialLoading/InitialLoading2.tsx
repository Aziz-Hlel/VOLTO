import { useEffect, useState } from "react";

const InitialLoading = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  if (!showLoader) return null;

  return (
    <div>
      <CutoutTextLoader
        height="450px"
        background="white"
        imgUrl="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGFob3lkZGlmdWp1YXBqa2ZoZzhqejdoNmtiZGsxbnJydHY1NnNkaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bmSB5pVWuz662oBeUU/giphy.gif"
      />
    </div>
  );
};

const CutoutTextLoader = ({
  height,
  background,
  imgUrl,
}: {
  height: string;
  background: string;
  imgUrl: string;
}) => {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      />
    </div>
  );
};

export default InitialLoading;
