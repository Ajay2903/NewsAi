import { NextResponse } from 'next/server';
import { Article, NewsCategory } from '../../types/news';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as NewsCategory;

    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return NextResponse.json(data.articles as Article[]);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch news' },
            { status: 500 }
        );
    }
}