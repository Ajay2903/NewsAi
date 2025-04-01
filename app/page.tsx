

"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import NewsCard from '../components/NewsCard';
import { NewsCategory } from '@/types/news';
import { Article } from '@/types/news';
import Link from 'next/link';

const categories: NewsCategory[] = ['general', 'technology', 'business', 'sports', 'entertainment'];

export default function Home() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('general');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async (category: NewsCategory) => {
    setLoading(true);
    try {
      const res = await fetch(`../api/news?category=${category}`);
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#D8E4FF]">
      <header className="bg-[#197BBD] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">News.AI </h1>
          <h2 className='flex items-center'> {user && (
        <span className="text-2xl font-bold ">
          Hello, {user.displayName || user.email}
        </span>
      )}</h2>
          <div className="flex gap-4 items-center">
            <Link 
              href="/saved" 
              className="bg-[#DC136C] hover:bg-[#B30D5D] text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Saved Articles
            </Link>
            {!user && (
              <Link href="/signin" className="text-white hover:underline">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#00120B]">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md transition-colors duration-300 font-medium ${
                  selectedCategory === cat
                    ? 'bg-[#197BBD] text-white shadow-md'
                    : 'bg-[#D8E4FF] text-[#00120B] hover:bg-[#B3CDFF]'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#197BBD]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCard key={`${article.url}-${index}`} article={article} user={user} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-[#00120B] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p> Developed by Ajay Tibrewal</p>
        </div>
      </footer>
    </div>
  );
}