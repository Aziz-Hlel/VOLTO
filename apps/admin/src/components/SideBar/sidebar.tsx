import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { Menu as MenuIcon, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "./menu";
import { useStore } from "@/hooks/use-store";
import { SidebarToggle } from "./sidebar-toggle";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;

  // ✅ Affiche toujours la version complète sur mobile
  const isSidebarOpen = window.innerWidth < 1024 ? true : getOpenState();

  // ✅ Ferme le sidebar automatiquement quand on change de page sur mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setMobileOpen(false);
    }
  };

  return (
    <>

      {/* 🔹 Bouton burger stylé – visible uniquement sur mobile */}
      {/* 🔹 Bouton burger stylé – visible uniquement sur mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            "relative w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300", // taille réduite
            "bg-gradient-to-r from-zinc-800 to-zinc-700 text-white shadow-sm hover:scale-105 hover:shadow-md",
            "dark:from-zinc-200 dark:to-zinc-300 dark:text-zinc-900"
          )}
        >
          {/* Animation du burger / croix */}
          <div className="relative w-4 h-4 flex flex-col justify-between">
            {/* Barre du haut */}
            <span
              className={cn(
                "absolute top-0 left-0 w-4 h-[2px] bg-current rounded transition-all duration-300",
                mobileOpen ? "rotate-45 top-[7px]" : "rotate-0 top-0"
              )}
            />
            {/* Barre du milieu */}
            <span
              className={cn(
                "absolute top-[7px] left-0 w-4 h-[2px] bg-current rounded transition-all duration-300",
                mobileOpen ? "opacity-0" : "opacity-100"
              )}
            />
            {/* Barre du bas */}
            <span
              className={cn(
                "absolute bottom-0 left-0 w-4 h-[2px] bg-current rounded transition-all duration-300",
                mobileOpen ? "-rotate-45 bottom-[7px]" : "rotate-0 bottom-0"
              )}
            />
          </div>
        </Button>
      </div>



      {/* 🔹 Sidebar */}
      <aside
        className={cn(
          "fixed lg:static top-0 left-0 z-40 h-full bg-white dark:bg-zinc-900 shadow-md dark:shadow-zinc-800 transition-all duration-300 ease-in-out",
          // Mobile slide effect
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          // Largeur dynamique desktop
          !getOpenState() ? "lg:w-[90px]" : "lg:w-72",
          // Largeur fixe sur mobile
          "w-72",
          settings.disabled && "hidden"
        )}
      >
        {/* 🔸 Bouton Toggle (desktop only) */}
        <div className="hidden lg:block">
          <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
        </div>

        {/* 🔸 Contenu Sidebar */}
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="relative h-full flex flex-col px-3 py-4 overflow-y-auto"
        >
          {/* Logo + titre */}
          <Button
            className={cn(
              "transition-transform ease-in-out duration-300 mb-1",
              !getOpenState() ? "translate-x-1" : "translate-x-0"
            )}
            variant="link"
            asChild
          >
            <Link
              to="/events"
              className="flex items-center gap-2"
              onClick={handleLinkClick} // ✅ ferme le menu mobile
            >
              <img src="/logo.dark.png" alt="Volto" className="w-12 h-6 mr-1" />
              <h1
                className={cn(
                  "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                  window.innerWidth < 1024
                    ? "translate-x-0 opacity-100"
                    : !getOpenState()
                      ? "-translate-x-96 opacity-0 hidden"
                      : "translate-x-0 opacity-100"
                )}
              >
                Volto
              </h1>
            </Link>
          </Button>

          {/* Menu avec fermeture automatique */}
          <div onClick={handleLinkClick}>
            <Menu isOpen={isSidebarOpen} />
          </div>
        </div>
      </aside>

      {/* 🔹 Overlay sombre pour mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}