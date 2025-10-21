import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";
import { config } from "@/config/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export async function getProjects(){
  const response = await axios.get(`${config.BACKEND_URL}/projects/getall`);
  
  // Map API response to clean project objects
  const projects = response.data.map((p:any) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    link: p.link,
    category: p.category,
  }));
  
  return projects;
}

import { useQuery } from "@tanstack/react-query";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    refetchOnWindowFocus:true,
  });
}
