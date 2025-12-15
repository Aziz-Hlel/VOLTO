import axios from "axios";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";

const LottieComp = ({ ...props }: Omit<React.ComponentProps<typeof Lottie>, "animationData">) => {
  const [animationData, setAnimationData] = useState(null);
  console.log("animation dtaa type = " + typeof animationData);
  useEffect(() => {
    axios("/img/bulls/Social-Icons-Marketing.json")
      .then((res) => res.data)
      .then(setAnimationData);
  }, []);
  return <Lottie {...props} animationData={animationData} />;
};

export default LottieComp;
