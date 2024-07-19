import  { useEffect, useState } from 'react';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
const Home = lazy(() => import("./pages/Home"));
const Project = lazy(() => import('./pages/Projects'));
const Hireme = lazy(() => import('./pages/Hireme'));
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
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className='relative w-screen  h-screen flex flex-col justify-center items-center'>
        <BrowserRouter>
          <Appbar isMobile={isMobile} />
          <Routes>
            <Route path="/" element={<Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}><Home /> </Suspense>} />
            <Route path="/projects" element={<Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}><Project /> </Suspense>} />
            <Route path="/hire" element={<Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}><Hireme  /> </Suspense>} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>

  )
}

function Appbar({ isMobile }: { isMobile: boolean }) {
  const { theme, setTheme } = useTheme();
  if (!isMobile) {
    return (
      <div className='flex absolute top-0 w-screen h-20 md:h-16' style={{ backgroundColor: '#14B8A6' }}>
        <div className='ml-auto md:w-1/3 flex justify-end' >
          <NavigationMenu>
            <NavigationMenuList className='px-4'>
              <NavigationMenuItem >
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} style={theme === 'dark' ? { backgroundColor: '#31363F' } : { backgroundColor: '#EEEEEE' }} >
                    Home
                  </NavigationMenuLink>
                </Link>

              </NavigationMenuItem>
              <NavigationMenuItem >
                <Link to="/projects">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} style={theme === 'dark' ? { backgroundColor: '#31363F' } : { backgroundColor: '#EEEEEE' }}>
                    Projects
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem >
                <Link to="/hire">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} style={theme === 'dark' ? { backgroundColor: '#31363F' } : { backgroundColor: '#EEEEEE' }}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem >
                <Button  variant="outline" size="icon" onClick={() => {
                  console.log(theme);
                  if (theme === "dark") {
                    setTheme("light");
                  }
                  else {
                    setTheme("dark");
                  }
                }} style={theme === 'dark' ? { backgroundColor: '#31363F' } : { backgroundColor: '#EEEEEE' }}>
                  <Sun className="h-[1.2 rem] w-[1.2 rem] font-semibold rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100 " />
                  <Moon className="absolute h-[1.2 rem] w-[1.2 rem] font-semibold rotate-100 scale-100 transition-all dark:rotate-0 dark:scale-0" />

                  <span className="sr-only">Toggle theme</span>
                </Button>

              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
        )}
        else{
          return(
            <div className='flex absolute top-0 w-screen h-18' style={{ backgroundColor: '#14B8A6' }}>
            <div className='ml-auto mr-2 w-14 my-2 flex justify-center items-center rounded border-2 border-black'>
          <DropdownMenu >
            <DropdownMenuTrigger> <HamburgerMenuIcon className='h-full w-10 font-bold' /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel><Link to="/">Home</Link></DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem ><Link to="/projects">Projects</Link></DropdownMenuItem>
              <DropdownMenuItem><Link to="/hire">About</Link></DropdownMenuItem>
              <DropdownMenuItem><Button className="h-full w-full " variant="outline" size="icon" onClick={() => {
                console.log(theme);
                if (theme === "dark") {
                  setTheme("light");
                }
                else {
                  setTheme("dark");
                }
              }} style={theme === 'dark' ? { backgroundColor: '#31363F' } : { backgroundColor: '#EEEEEE' }}>
                <Sun className="h-4 w-4 font-semibold rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100 " />
                <Moon className="absolute h-4 w-4 font-semibold rotate-100 scale-100 transition-all dark:rotate-0 dark:scale-0" />

                <span className="sr-only">Toggle theme</span>
              </Button></DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
          )
        }
}
