import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BlogCardProps {
    title: string;
    excerpt: string;
    date?: string;
    id:string;
    // author: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id,title, excerpt, date}) => {
    const navigate=useNavigate();
    return (
        <div className="blog-card">
            <h2 className="blog-title hover:text-white cursor-pointer" onClick={()=>navigate(`/blog/${id}`)}>{title}</h2>
            <p className="blog-excerpt">{excerpt}</p>
            <div className="blog-meta">
                <span className="blog-date">{date}</span>
                {/* <span className="blog-author">{author}</span> */}
            </div>
        </div>
    );
};

export default BlogCard;