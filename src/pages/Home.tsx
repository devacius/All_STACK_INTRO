import { CardCom } from "@/components/CardCom";
import image from "../../public/heyimage.gif";
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react";
import { useTheme } from '../components/theme-provider';

export default function Home() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const{theme,setTheme}=useTheme();
 const[value,setValue]=useState('bg-slate-200');
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
  useEffect(() => {
    
    if(theme==="dark"){
      setValue('bg-gray-400');
    }
  
  },[theme]);

  return (
    <div className='min-h-screen min-w-full flex flex-col justify-between '>
      <div className='flex flex-col  m-2 py-14 lg: my-4 justify-center items-center '>
        <div className={`py-4  md: p-2 rounded-lg w-full text-center ${value}`}>
          <div className='space-y-2 flex flex-col text-left'>
            <p className='text-5xl justify-between md:text-6xl font-sans font-bold my-4'>Oh!! hello there,</p>
            <div className="flex flex-col text-center justify-center md:flex-row space-y-4 md:space-x-5 items-center">
              <p className="text-3xl md:text-4xl font-sans"> Myself </p>
              <p className='font-semibold text-5xl'>Deepansh Gupta.</p>
            </div>
          </div>
        </div>
        <div className="my-2">
          <div className="mb-2 text-center">
            <p className="text-xl underline decoration-red-600">Featured Projects</p>
          </div>

          <div className="flex flex-row space-x-2">
            {
              isLargeScreen ? (
                <>
                  <CardCom title={"Paytm App"} link1={"https://github.com/devacius/paytm"} border={"border-red-500 border-4"} techstack={"React | Tailwind Css | Node Js | Prisma | JWT Authentication | PostgreSQL"} desc={"A simple paytm clone created using MERN stack with virtual money provided upon your signup . This project is created by me to learn about mongodb , creating backend, user authentication and understanding HTTP server requests. (It is not linked to you bank account No need to worry😅)."} link2={"#"} />
                  <CardCom title={"Diabetes Prediction Model"} link1={"https://github.com/devacius/DiabetesPrediction-Model"} link2={"https://diabetespredictiondevacius.streamlit.app/"} border={"border-green-500 border-4"} techstack={"Python | Google Collab | Streamlit | Numpy | scikit_learn | pickle "} desc={"It tells whether a person is diabetic or not based on Pregnancies , Glucose , BloodPressure ,etc. Uses streamlit for the ui and frontend part and is trained on the diabetes.csv file"} />
                  <CardCom title={"Desktop Search Engine"} link1={"https://github.com/devacius/DesktopSearchEngine"} border={"border-red-500 border-4"} techstack={"python | os | system | Text_extractor | Pdf Reader | pypdf"} desc={"A simple Desktop search engine application that allows to search for your specific words in text, pdf, image files in your desktop storage within a reduced time complexity and greater efficiency."} link2={"#"} />
                  <CardCom title={"Blockchain Voting System"} link1={"https://github.com/devacius/blockchain-voting-main"} border={"border-red-500 border-4"} techstack={"react | metamask | tailwind css | Solidity | Polygon | Ethereum"} desc={"Our final year project - A blockchain-based voting system revolutionizes democratic processes, leveraging Ethereum and Polygon for secure, transparent, and accessible elections. Powered by smart contracts , our solution ensures integrity and inclusivity in governance."} link2={"#"} />
                </>) : (<>
                  <Carousel className="w-96 h-auto px-4">
                    <CarouselContent>
                      <CarouselItem>                  <CardCom title={"Paytm App"} link1={"https://github.com/devacius/paytm"} border={"border-red-500 border-4"} techstack={"React | Tailwind Css | Node Js | Prisma | JWT Authentication | PostgreSQL"} desc={"A simple paytm clone created using MERN stack with virtual money provided upon your signup . This project is created by me to learn about mongodb , creating backend, user authentication and understanding HTTP server requests. (It is not linked to you bank account No need to worry😅)."} link2={"#"} />
                      </CarouselItem>
                      <CarouselItem>                  <CardCom title={"Diabetes Prediction Model"} link1={"https://github.com/devacius/DiabetesPrediction-Model"} link2={"https://diabetespredictiondevacius.streamlit.app/"} border={"border-green-500 border-4"} techstack={"Python | Google Collab | Streamlit | Numpy | scikit_learn | pickle "} desc={"It tells whether a person is diabetic or not based on Pregnancies , Glucose , BloodPressure ,etc. Uses streamlit for the ui and frontend part and is trained on the diabetes.csv file"} />
                      </CarouselItem>
                      <CarouselItem>                  <CardCom title={"Desktop Search Engine"} link1={"https://github.com/devacius/DesktopSearchEngine"} border={"border-red-500 border-4"} techstack={"python | os | system | Text_extractor | Pdf Reader | pypdf"} desc={"A simple Desktop search engine application that allows to search for your specific words in text, pdf, image files in your desktop storage within a reduced time complexity and greater efficiency."} link2={"#"} />
                      </CarouselItem>
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
        <div className='flex flex-col  justify-center items-center  md:w-4/6 '>
          <p className='text-lg md:text-xl'>Connect with me:</p>
          <div className='flex flex-row space-x-4 pt-4'>
            <a href="https://github.com/devacius" ><FaGithub className='h-8 w-8 md:h-12 md:w-12' /></a>
            <a href="https://www.linkedin.com/in/deepansh-gupta-1227591b9/"><FaLinkedin className='h-8 w-8 md:h-12 md:w-12' /></a>
            <a href="https://twitter.com/devacius"><FaTwitter className='h-8 w-8 md:h-12 md:w-12' /></a>
          </div>
        </div>
      </div>

      <footer className="text-xs md:text-base text-center"> "I am just a good Developer on my journey to be a Great Developer!!"</footer>
    </div>
  )
}
