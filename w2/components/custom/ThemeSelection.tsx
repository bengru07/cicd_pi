import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
  { value: "light", label: "Light", icon: <Sun className="w-5 h-5" /> },
  { value: "dark", label: "Dark", icon: <Moon className="w-5 h-5" /> },
  { value: "system", label: "System", icon: <Monitor className="w-5 h-5" /> },
];

export function ThemeSelection() {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="
          text-sm
          flex items-center justify-center gap-2 rounded-md
          border border-border
          bg-background
          text-foreground
          shadow-sm
          hover:bg-muted
          focus:outline-none focus:ring-0 hover:border-foreground
          sm:px-4 sm:py-2
          px-3 py-1
          z-70
        "
        aria-label="Select theme"
      >
        <span className="flex items-center gap-1 sm:hidden text-sm">
          {currentTheme === "light" && <Sun className="w-5 h-5" />}
          {currentTheme === "dark" && <Moon className="w-5 h-5" />}
          {currentTheme === "system" && <Monitor className="w-5 h-5" />}
        </span>

        <span className="hidden items-center gap-2 sm:flex text-sm">
          {themes.find((t) => t.value === (theme ?? "system"))?.icon}
          {false && <span>{themes.find((t) => t.value === (theme ?? "system"))?.label}</span>}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="center"
        className="
          w-40
          rounded-md border border-border
          bg-background
          p-1
          shadow-md
          text-sm
          z-70
          "
      >
        {themes.map(({ value, label, icon }) => (
          <DropdownMenuItem
            key={value}
            className="
              cursor-pointer flex items-center gap-2 px-3 py-2
              text-sm
              hover:bg-muted
            "
            onClick={() => setTheme(value)}
          >
            {icon}
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
