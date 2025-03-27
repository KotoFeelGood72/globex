"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Button,
  ButtonGroup,
} from "@nextui-org/react";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/ui/logo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link as ScrollLink } from "react-scroll";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navigationItems = [
  { to: "about", label: "О нас" },
  { to: "calculator", label: "Калькулятор" },
  { to: "benefits", label: "Преимущества" },
  { to: "target-audience", label: "Для кого?" },
  { to: "how-we-work", label: "Как мы работаем" },
  { to: "faq", label: "FAQ" },
  { to: "contact", label: "Контакты" },
];

export function PublicNavigation() {
  const { theme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  if (session?.user) {
    return null;
  }

  const handleSectionChange = (to: string) => {
    setActiveSection(to);
    setIsMenuOpen(false);
  };

  return (
    <Navbar
      isBordered
      isBlurred
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="fixed top-0 z-50"
      classNames={{
        wrapper: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8",
      }}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          className="sm:hidden"
        />
        <NavbarBrand className="gap-2.5">
          <ScrollLink
            to="hero"
            smooth={true}
            duration={500}
            className="cursor-pointer flex items-center gap-2"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Logo />
            </motion.div>
          </ScrollLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <nav className="flex gap-4">
          {navigationItems.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              smooth={true}
              duration={500}
              spy={true}
              offset={-100}
              onSetActive={() => setActiveSection(item.to)}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                activeSection === item.to
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.label}
            </ScrollLink>
          ))}
        </nav>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden sm:flex gap-3">
        <ul className=" flex items-center gap-3">
          <li>
            <a href="#">
              {" "}
              <Image
                src="/images/socials/fb.png"
                alt="Facebook"
                width={25}
                height={25}
                className={theme === "light" ? "invert" : ""}
                priority
              />
            </a>
          </li>
          <li>
            <a href="#">
              {" "}
              <Image
                src="/images/socials/vk.png"
                alt="VK"
                width={25}
                height={25}
                className={theme === "light" ? "invert" : ""}
                priority
              />
            </a>
          </li>
          <li>
            <a href="#">
              {" "}
              <Image
                src="/images/socials/im.png"
                alt="Instagram"
                width={25}
                height={25}
                className={theme === "light" ? "invert" : ""}
                priority
              />
            </a>
          </li>
        </ul>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        {process.env.NEXT_PUBLIC_ENABLE_AUTH === "true" && (
          <ButtonGroup>
            <Button
              onClick={() => router.push("/auth/signin")}
              variant="flat"
              className="font-medium"
            >
              Войти
            </Button>
            <Button
              onClick={() => router.push("/auth/signup")}
              color="primary"
              className="font-medium"
            >
              Регистрация
            </Button>
          </ButtonGroup>
        )}
      </NavbarContent>

      <NavbarMenu>
        <div className="flex flex-col gap-2 mt-4">
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            spy={true}
            offset={-100}
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-lg font-medium cursor-pointer rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Проконсультируйтесь с экспертом
          </ScrollLink>

          {navigationItems.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              smooth={true}
              duration={500}
              spy={true}
              offset={-100}
              onSetActive={() => handleSectionChange(item.to)}
              className={cn(
                "block px-3 py-2 text-lg font-medium cursor-pointer rounded-lg",
                activeSection === item.to
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.label}
            </ScrollLink>
          ))}
          {process.env.NEXT_PUBLIC_ENABLE_AUTH === "true" && (
            <div className="flex flex-col gap-2 mt-4">
              <Button
                onClick={() => router.push("/auth/signin")}
                variant="flat"
                className="font-medium w-full"
                size="lg"
              >
                Войти
              </Button>
              <Button
                onClick={() => router.push("/auth/signup")}
                color="primary"
                className="font-medium w-full"
                size="lg"
              >
                Регистрация
              </Button>
            </div>
          )}
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
