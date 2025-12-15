import React, { useEffect, useRef, useState, type Ref } from "react";
import WhatsAppFloatingButton from "./WhatsAppFloatingButton";
import IgFloatingButton from "./IgFloatingButton";
import { useClickAway } from "@uidotdev/usehooks";
import LottieComp from "./LottieComp";
import { useWindowScroll } from "@uidotdev/usehooks";

const SocialsFloatingButton = () => {
  const lottieRef = useRef(null);
  const [mode, setMode] = useState<"lottie" | "actions">("lottie");
  const [{ y }] = useWindowScroll();

  const bullsRef: Ref<HTMLDivElement> = useClickAway(() => {
    setMode("lottie");
  });

  useEffect(() => {
    if (mode === "actions") setMode("lottie");
  }, [y]);
  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col items-center ">
      {mode === "lottie" && (
        <div
          className="cursor-pointer  "
          onMouseEnter={() => lottieRef.current?.current.pause()}
          onMouseLeave={() => lottieRef.current?.current.play()}
          onClick={() => {
            setMode("actions");
          }}
        >
          <LottieComp loop autoplay className="size-28" />
        </div>
      )}

      <div
        ref={bullsRef}
        aria-disabled={mode === "lottie"}
        className={`absolute bottom-5 right-5 flex flex-col space-y-2 opacity-0 transition-all duration-300 ease-in-out ${
          mode === "actions"
            ? "opacity-100 transition-all duration-300 ease-in-out"
            : "pointer-events-none "
        }`}
      >
        <WhatsAppFloatingButton onClickCapture={() => setMode("lottie")} />
        <IgFloatingButton onClickCapture={() => setMode("lottie")} />
      </div>
    </div>
  );
};

export default SocialsFloatingButton;
