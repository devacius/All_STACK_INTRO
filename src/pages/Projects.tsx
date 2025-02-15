
import { CardCom } from '@/components/CardCom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import projects from '@/assets/projectlist';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
export default function Projects() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };


  }, []);
  const{theme}=useTheme();
  return (
    <div className='flex flex-col justify-between  max-h-screen max-w-full pt-20 '>
      <div className='px-2 mt-10 pb-8 '><p className='text-sm'><b>Note:</b> The projects with green deploy border are deployed . While the ones with Red ones are not </p></div>
      <div className='pt-28' >
        <div className='pb-4'>
          <p className='text-2xl px-2 font-bold rounded-lg w-80 py-2 mx-4' style={{ backgroundColor: '#14B8A6' }}>Web Development</p>

          <div className='flex flex-col justify-between  pt-4 md: items-center max-h-11/12 h-3/5  space-y-2 '>
            
              <Carousel className={cn(" h-auto max-w-96 md:max-w-[93%] justify-center border-2 border-gray-700 rounded-lg p-4",theme==="dark"?"bg-gray-400":"bg-slate-200")}>
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem className=' w-fit md:basis-1/4' >
                      <CardCom
                        
                        title={project.title}
                        link1={project.link1}
                        border={project.border}
                        techstack={project.techstack}
                        desc={project.desc}
                        link2={project.link2}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>

           
          </div>
        </div>

        <div className='pb-4'>
          <p className='text-2xl px-2 font-bold rounded-lg py-2 w-80 mx-4 ' style={{ backgroundColor: '#14B8A6' }}>Blockchain</p>

          <div className='flex flex-col pt-4  md:flex-row items-center max-h-11/12 h-3/5 w-full  px-4 space-x-8 space-y-2 '>
            {
              isLargeScreen ? (
                <>
                  <CardCom title={"Blockchain Voting System"} link1={"https://github.com/devacius/blockchain-voting-main"} border={"border-red-500 border-4"} techstack={"react | metamask | tailwind css | Solidity | Polygon | Ethereum"} desc={"Our final year project - A blockchain-based voting system revolutionizes democratic processes, leveraging Ethereum and Polygon for secure, transparent, and accessible elections. Powered by smart contracts , our solution ensures integrity and inclusivity in governance."} link2={"#"} />
                </>) : (<>
                  <Carousel className="w-96 h-auto px-4">
                    <CarouselContent>
                      <CarouselItem>                            <CardCom title={"Blockchain Voting System"} link1={"https://github.com/devacius/blockchain-voting-main"} border={"border-red-500 border-4"} techstack={"react | metamask | tailwind css | Solidity | Polygon | Ethereum"} desc={"Our final year project - A blockchain-based voting system revolutionizes democratic processes, leveraging Ethereum and Polygon for secure, transparent, and accessible elections. Powered by smart contracts , our solution ensures integrity and inclusivity in governance."} link2={"#"} />
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>

                </>)
            }
          </div>
        </div>
        <div className='pb-4'>
          <p className='text-2xl px-2 font-bold rounded-lg py-2 w-80 mx-4 ' style={{ backgroundColor: '#14B8A6' }}>App Development</p>

          <div className='flex flex-col pt-4  md:flex-row items-center max-h-11/12 h-3/5 w-full  px-4 space-x-8 space-y-2 '>
            {
              isLargeScreen ? (
                <>
                  <CardCom title={"Blockchain Voting System"} link1={"https://github.com/devacius/blockchain-voting-main"} border={"border-red-500 border-4"} techstack={"react | metamask | tailwind css | Solidity | Polygon | Ethereum"} desc={"Our final year project - A blockchain-based voting system revolutionizes democratic processes, leveraging Ethereum and Polygon for secure, transparent, and accessible elections. Powered by smart contracts , our solution ensures integrity and inclusivity in governance."} link2={"#"} />
                </>) : (<>
                  <Carousel className="w-96 h-auto px-4">
                    <CarouselContent>
                      <CarouselItem>                            <CardCom title={"Blockchain Voting System"} link1={"https://github.com/devacius/blockchain-voting-main"} border={"border-red-500 border-4"} techstack={"react | metamask | tailwind css | Solidity | Polygon | Ethereum"} desc={"Our final year project - A blockchain-based voting system revolutionizes democratic processes, leveraging Ethereum and Polygon for secure, transparent, and accessible elections. Powered by smart contracts , our solution ensures integrity and inclusivity in governance."} link2={"#"} />
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>

                </>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}
