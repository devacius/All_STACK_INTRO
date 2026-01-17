
import { Github } from 'lucide-react';
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

export function CardCom(props: { title: string, description: string, link: string, border?: string, techstack?: string, link2?: string }) {
  // Added optional props to match usage in Home.tsx if I map over projects
  return (
    <Card className="h-full bg-card border border-border shadow-none rounded-none hover:border-foreground transition-colors duration-300 group relative overflow-hidden"
      onClick={() => window.open(props.link, '_blank')}
    >
      <CardHeader className="p-4 border-b border-border border-dashed">
        <CardTitle className="font-mono text-lg text-green-500 group-hover:text-green-400">
          &gt; {props.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 font-mono text-sm text-muted-foreground">
        <p className="line-clamp-4">{props.description}</p>

        {props.techstack && (
          <div className="mt-4 pt-2 border-t border-border border-dashed text-xs text-muted-foreground/70">
            <span className="text-yellow-500/80">$ imports:</span> {props.techstack}
          </div>
        )}
      </CardContent>
      <div className="absolute bottom-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="bg-foreground text-background text-xs px-1 font-bold block">OPEN</span>
      </div>
    </Card>
  )
}
