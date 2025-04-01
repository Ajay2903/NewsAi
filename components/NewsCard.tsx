// // // "use client";

// // // import { doc, setDoc, deleteDoc } from 'firebase/firestore';
// // // import { db } from '@/lib/firebase';
// // // import { Article } from '@/types/news';
// // // import { User } from 'firebase/auth';
// // // import { useState } from 'react';

// // // interface NewsCardProps {
// // //   article: Article;
// // //   user: User | null;
// // // }

// // // export default function NewsCard({ article, user }: NewsCardProps) {
  
// // //     const [isSaved, setIsSaved] = useState(false);
// // //   const handleSave = async () => {
// // //     const articleRef = doc(db, 'users', user?.uid || 'dummy', 'savedArticles', article.url);
// // //     if (!user) return;
    
// // //     await setDoc(articleRef, {
// // //       ...article,
// // //       savedAt: new Date().toISOString(),
// // //     });
// // //   };

// // //   const handleUnsave = async () => {
// // //     const articleRef = doc(db, 'users', user?.uid || 'dummy', 'savedArticles', article.url);
// // //     if (!user) return;
// // //     await deleteDoc(articleRef);
// // //   };

// // //   return (
// // //     <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
// // //       {article.urlToImage && (
// // //         <img 
// // //           src={article.urlToImage} 
// // //           alt={article.title}
// // //           className="w-full h-48 object-cover mb-4 rounded"
// // //         />
// // //       )}
// // //       <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
// // //       <p className="text-gray-600 mb-4">{article.description}</p>
// // //       {user && (
// // //         <button
// // //           onClick={isSaved ? handleUnsave : handleSave}
// // //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // //         >
// // //           {isSaved ? 'Unsave' : 'Save'}
// // //         </button>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';
// // import { Article } from '@/types/news';
// // import { User } from 'firebase/auth';
// // import { useState, useEffect } from 'react';

// // interface NewsCardProps {
// //   article: Article;
// //   user: User | null;
// // }

// // export default function NewsCard({ article, user }: NewsCardProps) {
// //   const [isSaved, setIsSaved] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
  
// //   // Check if article is already saved when component mounts or user changes
// //   useEffect(() => {
// //     const checkIfSaved = async () => {
// //       if (!user) {
// //         setIsSaved(false);
// //         return;
// //       }
      
// //       try {
// //         // Create a safe document ID from the URL
// //         const safeDocId = encodeURIComponent(article.url);
// //         const articleRef = doc(db, 'users', user.uid, 'savedArticles', safeDocId);
// //         const docSnap = await getDoc(articleRef);
// //         setIsSaved(docSnap.exists());
// //       } catch (error) {
// //         console.error("Error checking saved status:", error);
// //       }
// //     };
    
// //     checkIfSaved();
// //   }, [article.url, user]);

// //   const handleSave = async () => {
// //     if (!user) return;
// //     setIsLoading(true);
    
// //     try {
// //       const safeDocId = encodeURIComponent(article.url);
// //       const articleRef = doc(db, 'users', user.uid, 'savedArticles', safeDocId);
      
// //       await setDoc(articleRef, {
// //         ...article,
// //         savedAt: new Date().toISOString(),
// //       });
      
// //       setIsSaved(true);
// //     } catch (error) {
// //       console.error("Error saving article:", error);
// //       // Could add toast notification here
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleUnsave = async () => {
// //     if (!user) return;
// //     setIsLoading(true);
    
// //     try {
// //       const safeDocId = encodeURIComponent(article.url);
// //       const articleRef = doc(db, 'users', user.uid, 'savedArticles', safeDocId);
// //       await deleteDoc(articleRef);
// //       setIsSaved(false);
// //     } catch (error) {
// //       console.error("Error removing saved article:", error);
// //       // Could add toast notification here
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
// //       {article.urlToImage && (
// //         <img 
// //           src={article.urlToImage} 
// //           alt={article.title}
// //           className="w-full h-48 object-cover mb-4 rounded"
// //         />
// //       )}
// //       <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
// //       <p className="text-gray-600 mb-4">{article.description}</p>
// //       {user && (
// //         <button
// //           onClick={isSaved ? handleUnsave : handleSave}
// //           className={`${isSaved ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded`}
// //           disabled={isLoading}
// //         >
// //           {isLoading ? 'Processing...' : (isSaved ? 'Unsave' : 'Save')}
// //         </button>
// //       )}
// //     </div>
// //   );
// // }
// "use client";

// import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { Article } from '@/types/news';
// import { User } from 'firebase/auth';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// interface NewsCardProps {
//   article: Article;
//   user: User | null;
// }

// export default function NewsCard({ article, user }: NewsCardProps) {
//   const [isSaved, setIsSaved] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
  
//   // Check if article is already saved when component mounts or user changes
//   useEffect(() => {
//     const checkIfSaved = async () => {
//       if (!user) {
//         setIsSaved(false);
//         return;
//       }
      
//       try {
//         const safeDocId = encodeURIComponent(article.url);
//         const articleRef = doc(db, 'users', user.uid, 'savedArticles', safeDocId);
//         const docSnap = await getDoc(articleRef);
//         setIsSaved(docSnap.exists());
//       } catch (error) {
//         console.error("Error checking saved status:", error);
//       }
//     };
    
//     checkIfSaved();
//   }, [article.url, user]);

//   const handleSaveAction = async () => {
//     // If not logged in, redirect to sign in page
//     if (!user) {
//       router.push('/signin');
//       return;
//     }

//     // If logged in and article already saved, unsave it
//     if (isSaved) {
//       await handleUnsave();
//     } else {
//       // If logged in and article not saved, save it
//       await handleSave();
//     }
//   };

//   const handleSave = async () => {
//     setIsLoading(true);
    
//     try {
//       const safeDocId = encodeURIComponent(article.url);
//       const articleRef = doc(db, 'users', user!.uid, 'savedArticles', safeDocId);
      
//       await setDoc(articleRef, {
//         ...article,
//         savedAt: new Date().toISOString(),
//       });
      
//       setIsSaved(true);
//     } catch (error) {
//       console.error("Error saving article:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleUnsave = async () => {
//     setIsLoading(true);
    
//     try {
//       const safeDocId = encodeURIComponent(article.url);
//       const articleRef = doc(db, 'users', user!.uid, 'savedArticles', safeDocId);
//       await deleteDoc(articleRef);
//       setIsSaved(false);
//     } catch (error) {
//       console.error("Error removing saved article:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//       {article.urlToImage && (
//         <img 
//           src={article.urlToImage} 
//           alt={article.title}
//           className="w-full h-48 object-cover mb-4 rounded"
//         />
//       )}
//       <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
//       <p className="text-gray-600 mb-4">{article.description}</p>
//       <button
//         onClick={handleSaveAction}
//         className={`${isSaved ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded`}
//         disabled={isLoading}
//       >
//         {isLoading ? 'Processing...' : (isSaved ? 'Unsave' : 'Save')}
//       </button>
//     </div>
//   );
// }

"use client";

import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Article } from '@/types/news';
import { User } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface NewsCardProps {
  article: Article;
  user: User | null;
}

export default function NewsCard({ article, user }: NewsCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // Check if article is already saved when component mounts or user changes
  useEffect(() => {
    const checkIfSaved = async () => {
      if (!user) {
        setIsSaved(false);
        return;
      }
      
      try {
        const safeDocId = encodeURIComponent(article.url);
        const articleRef = doc(db, 'users', user.uid, 'savedArticles', safeDocId);
        const docSnap = await getDoc(articleRef);
        setIsSaved(docSnap.exists());
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };
    
    checkIfSaved();
  }, [article.url, user]);

  const handleSaveAction = async () => {
    // If not logged in, redirect to sign in page
    if (!user) {
      router.push('/signin');
      return;
    }

    // If logged in and article already saved, unsave it
    if (isSaved) {
      await handleUnsave();
    } else {
      // If logged in and article not saved, save it
      await handleSave();
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const safeDocId = encodeURIComponent(article.url);
      const articleRef = doc(db, 'users', user!.uid, 'savedArticles', safeDocId);
      
      await setDoc(articleRef, {
        ...article,
        savedAt: new Date().toISOString(),
      });
      
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsave = async () => {
    setIsLoading(true);
    
    try {
      const safeDocId = encodeURIComponent(article.url);
      const articleRef = doc(db, 'users', user!.uid, 'savedArticles', safeDocId);
      await deleteDoc(articleRef);
      setIsSaved(false);
    } catch (error) {
      console.error("Error removing saved article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative h-48 overflow-hidden">
        {article.urlToImage ? (
          <img 
            src={article.urlToImage} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-[#197BBD] to-[#D8E4FF] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-1M8 7h1v3H8V7zm3 0h1v3h-1V7z" />
            </svg>
          </div>
        )}
        {article.source?.name && (
          <span className="absolute top-3 left-3 bg-[#197BBD] text-white px-2 py-1 rounded-md text-xs font-medium">
            {article.source.name}
          </span>
        )}
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">
            {formatDate(article.publishedAt)}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2 text-[#00120B] line-clamp-2 h-14">{article.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm h-16">{article.description}</p>
      </div>
      
      <div className="p-4 border-t border-gray-100 flex gap-3">
        <button
          onClick={handleSaveAction}
          className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md transition-colors duration-300 ${
            isSaved 
              ? 'bg-[#DC136C] hover:bg-[#B30D5D] text-white' 
              : 'bg-[#197BBD] hover:bg-[#0E5A9A] text-white'
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isSaved ? 'mr-2' : 'mr-2'}`} fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {isSaved ? 'Unsave' : 'Save'}
            </span>
          )}
        </button>
        
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#D8E4FF] hover:bg-[#B3CDFF] text-[#00120B] px-4 py-2 rounded-md transition-colors duration-300 text-center flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Read More
        </a>
      </div>
    </div>
  );
}