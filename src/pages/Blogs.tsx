import React from 'react';
import { useBlogs } from '@/lib/utils';
import BlogCard from '@/components/BlogCard';

interface Blog {
    id: string;
    title: string;
    content: string;
    date: string;
}

const Blogs: React.FC = () => {
    const { data:blogs, isLoading } = useBlogs();

    return (
        <div className="min-h-screen bg-black text-green-500 p-8 font-mono">
            <div className="max-w-6xl mx-auto">
                <div className="border border-green-500 p-4 rounded">
                    <div className="flex gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    
                    <div className="mb-4">
                        <span className="text-green-500">visitor@portfolio</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-500">~/blogs</span>
                        <span className="text-white">$ ls</span>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="animate-spin h-5 w-5 border-2 border-green-500 border-t-transparent rounded-full"></div>
                            <p>Loading blogs...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {blogs?.map((blog: Blog) => (
                                <BlogCard key={blog.id} title={blog.title} excerpt={blog.content} id={blog.id} date={blog.date} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
