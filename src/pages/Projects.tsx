import { useEffect, useState, useMemo } from 'react';
import { useTheme } from '@/components/theme-provider';
import { CardCom } from '@/components/CardCom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn, useProjects } from '@/lib/utils';

export default function Projects() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const { theme } = useTheme();
  const { data: projects, isLoading } = useProjects();
  console.log("isloading",isLoading);
  console.log("Fetched projects:", projects);
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Group projects by category
  const groupedProjects = useMemo(() => {
    if (!projects) return {};
    return projects.reduce((acc: Record<string, any[]>, project: any) => {
      const category = project.category;
      console.log("Category:", category);
      if (!acc[category]) acc[category] = [];
      acc[category].push(project);
      return acc;
    }, {});
  }, [projects]);

  return (
      <div className="flex flex-col justify-between max-h-screen max-w-full pt-20">
       { isLoading ?
    <div className="flex justify-center items-center gap-2">
      <div className="animate-spin h-5 w-5 border-2 border-green-500 border-t-transparent rounded-full"></div>
      <p>Loading Projects...</p>
    </div> :


      <div className="pt-28 space-y-10">
        {Object.entries(groupedProjects).map(([category, items]): any => (
          <div key={category}>
            {/* ✅ Category Heading */}
            <p
              className="text-2xl px-2 font-bold rounded-lg w-80 py-2 mx-4 font-mono"
              style={{ backgroundColor: '#14B8A6' }}
            >
              {category}
            </p>

            {/* ✅ Carousel for category projects */}
            <div className="flex flex-col justify-between pt-4 items-center h-auto space-y-2">
              <Carousel
                className={cn(
                  'h-auto w-full md:max-w-[93%] justify-center border-2 border-gray-700 rounded-lg p-4',
                  theme === 'dark' ? 'bg-gray-400' : 'bg-slate-200'
                )}
              >
                <CarouselContent>
                  {/* @ts-ignore */}
                  {items.map((project: any) => (
                    <CarouselItem key={project.id} className="w-fit md:basis-1/4">
                      <CardCom
                        title={project.title}
                        link={project.link}
                        border={project.border}
                        description={project.description}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        ))}
      </div>}
    </div>

  );
}
