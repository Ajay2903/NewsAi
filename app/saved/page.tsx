// // "use client";

// // import { useEffect, useState } from 'react';
// // import { useAuth } from '@/context/AuthContext';
// // import { db } from '@/lib/firebase';
// // import { collection, query, where, onSnapshot } from 'firebase/firestore';
// // import NewsCard from '@/components/NewsCard';
// // import { Article } from '@/types/news';

// // export default function Saved() {
// //   const { user } = useAuth();
// //   const [savedArticles, setSavedArticles] = useState<Article[]>([]);

// //   useEffect(() => {
// //     if (!user) return;

// //     const q = query(
// //       collection(db, 'users', user.uid, 'savedArticles')
// //     );
    
// //     const unsubscribe = onSnapshot(q, (snapshot) => {
// //       const articles = snapshot.docs.map((doc) => doc.data() as Article);
// //       setSavedArticles(articles);
// //     });

// //     return () => unsubscribe();
// //   }, [user]);

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-3xl font-bold mb-8">Saved Articles</h1>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //         {savedArticles.map((article) => (
// //           <NewsCard 
// //             key={article.url}
// //             article={article}
// //             user={user}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import { db } from '@/lib/firebase';
// import { collection, query, onSnapshot } from 'firebase/firestore';
// import NewsCard from '@/components/NewsCard';
// import { Article } from '@/types/news';
// import { useRouter } from 'next/navigation';

// export default function Saved() {
//   const { user, loading: authLoading } = useAuth();
//   const [savedArticles, setSavedArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     // Wait for auth to finish loading
//     if (authLoading) return;
    
//     // Redirect if not logged in
//     if (!authLoading && !user) {
//       router.push('/signin');
//       return;
//     }

//     if (user) {
//       try {
//         const q = query(
//           collection(db, 'users', user.uid, 'savedArticles')
//         );
        
//         const unsubscribe = onSnapshot(q, 
//           (snapshot) => {
//             const articles = snapshot.docs.map((doc) => doc.data() as Article);
//             setSavedArticles(articles);
//             setLoading(false);
//           },
//           (err) => {
//             console.error("Error fetching saved articles:", err);
//             setError("Failed to load your saved articles. Please try again later.");
//             setLoading(false);
//           }
//         );

//         return () => unsubscribe();
//       } catch (err) {
//         console.error("Error setting up snapshot:", err);
//         setError("An error occurred while trying to fetch your saved articles.");
//         setLoading(false);
//       }
//     }
//   }, [user, authLoading, router]);

//   if (authLoading || loading) {
//     return (
//       <div className="container mx-auto p-4 flex justify-center items-center min-h-[60vh]">
//         <div className="text-xl text-gray-600">Loading your saved articles...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto p-4">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//           <span className="block sm:inline">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-8">Saved Articles</h1>
      
//       {savedArticles.length === 0 ? (
//         <div className="text-center py-10">
//           <p className="text-xl text-gray-600">You haven't saved any articles yet.</p>
//           <p className="text-gray-500 mt-2">Browse articles and click "Save" to keep them for later.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {savedArticles.map((article) => (
//             <NewsCard 
//               key={article.url} 
//               article={article} 
//               user={user}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import NewsCard from '@/components/NewsCard';
import { Article } from '@/types/news';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SavedArticles() {
  const { user } = useAuth();
  const router = useRouter();
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If user is not logged in, redirect to sign in page
    if (user === null) {
      router.push('/signin');
      return;
    }

    const fetchSavedArticles = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const savedRef = collection(db, 'users', user.uid, 'savedArticles');
        const savedSnapshot = await getDocs(query(savedRef));
        
        const articles: Article[] = [];
        savedSnapshot.forEach((doc) => {
          articles.push(doc.data() as Article);
        });
        
        // Sort by saved date, newest first
        // articles.sort((a, b) => {
        //   return new Date(b.savedAt as string).getTime() - new Date(a.savedAt as string).getTime();
        // });
        
        setSavedArticles(articles);
      } catch (error) {
        console.error('Error fetching saved articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedArticles();
  }, [user, router]);

  return (
    <div className="min-h-screen bg-[#D8E4FF]">
      <header className="bg-[#197BBD] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">News Explorer</h1>
          <div className="flex gap-4 items-center">
            <Link 
              href="/" 
              className="bg-[#D8E4FF] hover:bg-white text-[#00120B] px-4 py-2 rounded-md transition-colors duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
              </svg>
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#00120B]">Saved Articles</h2>
          <p className="text-gray-600 mt-2">Your personal collection of saved news articles.</p>
        </div>

        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#197BBD]"></div>
          </div>
        ) : savedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedArticles.map((article, index) => (
              <NewsCard key={`${article.url}-${index}`} article={article} user={user} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-xl font-semibold text-[#00120B] mb-2">No Saved Articles</h3>
            <p className="text-gray-600 mb-4">You haven&apos;t saved any articles yet.</p>
            <Link 
              href="/" 
              className="inline-flex items-center bg-[#197BBD] hover:bg-[#0E5A9A] text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Browse News
            </Link>
          </div>
        )}
      </main>

      <footer className="bg-[#00120B] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p> Developed by Ajay Tibrewal </p>
        </div>
      </footer>
    </div>
  );
}