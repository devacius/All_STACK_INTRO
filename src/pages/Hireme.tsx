
import pdf from "../../Deepansh_Gupta__Full_Stack_ (8).pdf";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Hireme() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize); // Listen for window resize event
    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);
  if(!isMobile){
  return (
    <div className='flex flex-col items-center h-full max-w-full lg:overflow-x-hidden mt-20'>
     

<a href={pdf} download="MyExampleDoc" target='_blank'>
   <Button >Download</Button>
</a>
      <div className='h-18 w-50 justify-center items-center flex flex-col py-4'><p className='text-2xl font-bold '>My Resume</p> </div>
      <div className='flex flex-col justify-center items-center h-auto w-auto'>
        <iframe src={pdf} width="700px " height="950px" className='my-8'></iframe>
        
        
        </div>
    </div>
  );
}
else{
  return(
  <div className='flex flex-col items-center h-full w-full mt-20'>
  
      <div className=''><p className='text-2xl font-bold '>My Resume</p> </div>
      
        <iframe src={pdf} width="300px " height="400px" className='my-8'></iframe>
        
    </div>
  );
}
}
