import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaMedium } from "react-icons/fa";
import { useTheme } from '../components/theme-provider';
import TerminalHero from "../components/TerminalHero";
import { CardCom } from "@/components/CardCom";
import projects from "../assets/projectlist";

export default function Home() {
  const navigate = useNavigate();
  // Retaining existing logic/hooks if they were doing something useful, 
  // but looking at previous file, most were unused or for the old animation.
  // The 'animejs' import was there but unused in my new plan (TerminalHero handles animation).
  // I will keep the clean structure.

  return (
    <div className='min-h-screen w-full pt-16'>
      <TerminalHero />

      <div className="container mx-auto px-4 py-12">
        <div className='flex flex-col items-center justify-center p-4 md:p-10'>
          <h2 className="text-xl md:text-2xl font-mono font-bold mb-8 border-b-2 border-green-500/50 pb-2 text-green-500">
            ./featured_projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {projects.slice(0, 3).map((project: any) => (
              <CardCom
                key={project.id}
                title={project.title}
                description={project.desc}
                link={project.link1}
                border={project.border}
                techstack={project.techstack}
              />
            ))}
          </div>

          <div className="mt-8">
            <Link to="/projects" className="font-mono text-sm text-muted-foreground hover:text-green-500 underline decoration-dashed underline-offset-4">
              view_all_projects()
            </Link>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center md:w-4/6 mx-auto mt-8 border-t border-border border-dashed pt-8'>
        <p className='text-lg md:text-xl font-mono mb-4'>connect_with_me:</p>
        <div className='flex flex-row space-x-6'>
          <a href="https://github.com/devacius" className="hover:text-green-500 transition-colors"><FaGithub className='h-6 w-6 md:h-8 md:w-8' /></a>
          <a href="https://www.linkedin.com/in/deepansh-gupta-1227591b9/" className="hover:text-blue-500 transition-colors"><FaLinkedin className='h-6 w-6 md:h-8 md:w-8' /></a>
          <a href="https://twitter.com/devacius" className="hover:text-sky-500 transition-colors"><FaTwitter className='h-6 w-6 md:h-8 md:w-8' /></a>
          <a href="https://medium.com/@devaciusaboveall789456" className="hover:text-foreground transition-colors"><FaMedium className="h-6 w-6 md:h-8 md:w-8" /></a>
        </div>
      </div>

      <footer className="text-xs md:text-sm text-center mt-12 mb-4 font-mono text-muted-foreground">
        <span className="text-green-500">&gt;</span> "I am just a good Developer on my journey to be a Great Developer!!"
      </footer>
    </div>
  )
}
