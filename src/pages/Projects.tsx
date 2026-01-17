import { useEffect, useState, useMemo } from 'react';
import { useTheme } from '@/components/theme-provider';
import { CardCom } from '@/components/CardCom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn, useProjects } from '@/lib/utils';

export default function Projects() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const { theme } = useTheme();
  const { data: projects, isLoading } = useProjects();
  console.log("isloading", isLoading);
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
      {isLoading ?
        <div className="flex justify-center items-center gap-2">
          <div className="animate-spin h-5 w-5 border-2 border-green-500 border-t-transparent rounded-full"></div>
          <p>Loading Projects...</p>
        </div> :


        <div className=" space-y-12">
          {Object.entries(groupedProjects).map(([category, items]): any => (
            <div key={category} className="border-t border-border border-dashed  mx-4">
              {/* ✅ Category Heading */}
              <h3
                className="text-2xl font-bold font-mono text-green-500 mb-6 pl-2 border-l-4 border-green-500"
              >
                $ ls ./{category}
              </h3>

              {/* ✅ Carousel for category projects */}
              <div className="flex flex-col justify-center items-center h-auto">
                <Carousel
                  className="w-full md:max-w-[95%]"
                >
                  <CarouselContent>
                    {/* @ts-ignore */}
                    {items.map((project: any) => (
                      <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1 h-full">
                          <CardCom
                            title={project.title}
                            link={project.link}
                            border={project.border}
                            description={project.description}
                            techstack={project.techstack}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black" />
                  <CarouselNext className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black" />
                </Carousel>
              </div>
            </div>
          ))}
        </div>}
    </div>

  );
}
