// Example: ThemeToggle component
import { useEffect, useState } from "react";
import { Button } from "../ui";
import { Moon, Sun } from "lucide-react";

type ThemeMode = "light" | "dark";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeMode>("light");

  const toggle = (newTheme: ThemeMode) => {
    const fallbackNextTheme = theme === "light" ? "dark" : "light";
    const next = newTheme ? newTheme : fallbackNextTheme;
    document.documentElement.className = next;
    setTheme(next);
  };

  useEffect(() => {
    toggle("dark");
  }, []);

  return (
    <Button variant="outline" onClick={toggle}>
      {theme == "light" ? <Sun /> : <Moon />}
    </Button>
  );
}
