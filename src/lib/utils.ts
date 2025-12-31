import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";
import { config } from "@/config/config";
import { useQuery } from "@tanstack/react-query";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export async function getProjects(){
  const response = await axios.get(`${config.BACKEND_URL}/projects/getall`,{
    headers: {
    'ngrok-skip-browser-warning': 'true',
  }
  });
  
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
export async function getBlogs(){
  const response = await axios.get(`${config.BLOG_BACKEND_URL}/articles`,{
    headers: {
    'ngrok-skip-browser-warning': 'true',
  }
  });
  
  // Map API response to clean blog objects
  const blogs = response.data.map((b:any) => ({
    id: b.id,
    title: b.title,
    
  }));
  
  return blogs;
}
export async function getBlog(articleId: string) {
  const response = await axios.get(`${config.BLOG_BACKEND_URL}/article/${articleId}`,{
    headers: {
    'ngrok-skip-browser-warning': 'true',
  }
  });
  const b = response.data;
  return {
    id: b.id,
    title: b.title,
    content: b.content,
  };
}


export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    refetchOnWindowFocus:true,
  });
}
export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus:true,
  });
}
export function useBlog(articleId:string) {
  return useQuery({
    queryKey: ["blog", articleId],
    queryFn: () => getBlog(articleId),
     enabled: !!articleId, // only run if articleId exists
    refetchOnWindowFocus:true,
  });
}