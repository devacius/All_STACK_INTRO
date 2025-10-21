
import {Github} from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Link, useNavigate } from "react-router-dom";

export function CardCom(props: { title: string, description: string, link: string ,border:string }) {
  const navigate=useNavigate();
  return (
    <Card className="max-w-[330px] border-4 overflow-hidden md: h-auto cursor-pointer" style={{borderColor:'#31363F'}} onClick={()=>window.location.href=props?.link}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        
          <div className="flex items-center gap-2 md: h-auto ">
            {props.description}
          </div>
        
      </CardContent>
      <CardFooter className="flex justify-between pb-3 ">
      
      </CardFooter>
    </Card>
  )
}
