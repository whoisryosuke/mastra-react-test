// Example: ThemeToggle component
import { useState } from "react";
import { Button } from "../ui";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.className = next;
    setTheme(next);
  };

  return (
    <Button variant="outline" onClick={toggle}>
      {theme == "light" ? <Sun /> : <Moon />}
    </Button>
  );
}
