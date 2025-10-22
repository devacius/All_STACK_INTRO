import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog, useBlogs } from '@/lib/utils';

interface BlogItem {
  id: string;
  title: string;
  content: string;
  date?: string;
}

const Blog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: blog, isLoading } = useBlog(id??'');
    console.log("isloading",isLoading);
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 font-mono">
        <div className="text-green-400">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 font-mono">
        <div className="max-w-4xl w-full mx-auto">
          <div className="bg-black/95 border border-green-600 rounded-lg overflow-hidden shadow-lg">
            <div className="flex items-center gap-2 px-4 py-3 bg-black/80 border-b border-green-700">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="px-8 py-12 text-center">
              <h1 className="text-2xl text-green-300 mb-4">Not found</h1>
              <p className="text-sm text-green-200 mb-6">No blog matches that id.</p>
              <div>
                <Link to="/blogs" className="text-green-400 underline">← Back to blogs</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-8 font-mono">
      <div className="max-w-4xl w-full mx-auto">
        <div className="bg-black/95 border border-green-600 rounded-lg overflow-hidden shadow-lg">
          <header className="flex items-center gap-2 px-4 py-3 bg-black/80 border-b border-green-700">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </header>

          <article className="px-8 py-12 text-center">
            <h1 className="text-3xl md:text-4xl font-semibold text-green-300 mb-6">
              {blog.title}
            </h1>

            <div className="mx-auto max-w-3xl px-6">
              <p className="text-base md:text-lg text-green-200 leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </p>
            </div>

            <div className="mt-8">
              <Link to="/blogs" className="text-green-400 underline">← Back to blogs</Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
};

export default Blog;