import WhatsAppFloatingButton from "./WhatsAppFloatingButton";
import IgFloatingButton from "./IgFloatingButton";

const SocialsFloatingButton = () => {

  const pathname = window.location.pathname;

  if (pathname === "/menu/cocktails") {
    return null;
  }
  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col items-center ">
      <div
        className={`absolute bottom-5 right-5 flex flex-col space-y-2 ease-in-out opacity-100 transition-all duration-300  `}
      >
        <WhatsAppFloatingButton />
        <IgFloatingButton />
      </div>
    </div>
  );
};

export default SocialsFloatingButton;