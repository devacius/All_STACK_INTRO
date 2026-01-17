import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BlogCardProps {
    title: string;
    excerpt: string;
    date?: string;
    id: string;
    // author: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, excerpt, date }) => {
    const navigate = useNavigate();
    return (
        <div className="group border border-border border-dashed p-4 hover:border-foreground transition-colors cursor-pointer bg-card" onClick={() => navigate(`/blog/${id}`)}>
            <div className="flex justify-between items-start mb-2">
                <h2 className="font-mono text-lg font-bold text-green-500 group-hover:text-green-400">
                    &gt; {title}
                </h2>
                <span className="font-mono text-xs text-muted-foreground">[{date}]</span>
            </div>
            <p className="font-mono text-sm text-muted-foreground line-clamp-3">
                {excerpt}
            </p>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-mono text-xs bg-foreground text-background px-1 font-bold">READ_MORE</span>
            </div>
        </div>
    );
};

export default BlogCard;