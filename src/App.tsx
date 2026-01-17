import { useEffect, useState } from 'react';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
const Home = lazy(() => import("./pages/Home"));
const Project = lazy(() => import('./pages/Projects'));
const Hireme = lazy(() => import('./pages/Hireme'));
const NoPage = lazy(() => import('./pages/NoPage'));
const Blogs = lazy(() => import('./pages/Blogs'));
const Blog = lazy(() => import('./pages/Blog'));

import { ThemeProvider } from './components/theme-provider';
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  HamburgerMenuIcon,

} from '@radix-ui/react-icons';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { Moon, Sun } from "lucide-react";

import { useTheme } from './components/theme-provider';
import { Button } from "@/components/ui/button";
import { Games } from './pages/Games';
import Tetris from './games/tetris/Tetris';

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize); // Listen for window resize event
    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className=' min-w-full  min-h-screen'>
        <BrowserRouter>
          <Appbar isMobile={isMobile} />
          <Routes>
            <Route path="/" element={<Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}><Home /> </Suspense>} />
            <Route path="/projects" element={<Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}><Project /> </Suspense>} />
            <Route path="/hire" element={<Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}><Hireme /> </Suspense>} />
            <Route path="/photos" element={<Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}><NoPage /> </Suspense>} />
            <Route path="/use" element={<Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}><NoPage /> </Suspense>} />
            <Route path="/blogs" element={<Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}><Blogs /> </Suspense>} />
            <Route path="/blog/:id" element={<Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}><Blog /> </Suspense>} />
            <Route path="/games" element={<Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}><Games /> </Suspense>} />
            <Route path="/tetris" element={<Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}><Tetris /> </Suspense>} />

          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>

  )
}

function Appbar({ isMobile }: { isMobile: boolean }) {
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: '~/home', path: '/' },
    { name: '~/projects', path: '/projects' },
    { name: '~/games', path: '/games' },
    { name: '~/blogs', path: '/blogs' },
  ];

  return (
    <div className='fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border border-dashed h-16 flex items-center px-4 md:px-8'>
      <div className="mr-auto font-mono text-lg font-bold text-green-500 animate-pulse">
        <Link to="/">devacius@portfolio:~</Link>
      </div>

      {/* Desktop Nav */}
      <div className='hidden md:flex items-center gap-6 ml-auto'>
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className="font-mono text-sm text-foreground/70 hover:text-green-500 transition-colors">
            {item.name}
          </Link>
        ))}

        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="ml-2 hover:bg-transparent hover:text-green-500">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      {/* Mobile Nav */}
      <div className='md:hidden ml-auto flex items-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="focus-visible:ring-0">
              <HamburgerMenuIcon className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2 bg-background border border-border border-dashed rounded-none">
            <DropdownMenuLabel className="font-mono text-xs text-muted-foreground">Navigation</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {navItems.map((item) => (
              <DropdownMenuItem key={item.path} asChild>
                <Link to={item.path} className="font-mono cursor-pointer hover:text-green-500 hover:bg-transparent">
                  {item.name}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="font-mono cursor-pointer">
              Theme: {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
