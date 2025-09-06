import { useState, useEffect, useCallback } from "react";

interface Quote {
  text: string;
  author: string;
}

const quotes: Quote[] = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
  { text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.", author: "Unknown" },
  { text: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.", author: "Steve Jobs" },
  { text: "Experience is a hard teacher because she gives the test first, the lesson afterwards.", author: "Vernon Law" },
  { text: "To live is the rarest thing in the world. Most people just exist.", author: "Oscar Wilde" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { text: "Go confidently in the direction of your dreams! Live the life you've imagined.", author: "Henry David Thoreau" },
  { text: "When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one that has been opened for us.", author: "Helen Keller" },
  { text: "First, have a definite, clear practical ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end.", author: "Aristotle" },
  { text: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.", author: "Mark Twain" }
];

export const useQuotes = () => {
  const [quoteOfTheDay, setQuoteOfTheDay] = useState<Quote | null>(null);
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [isLoadingQOTD, setIsLoadingQOTD] = useState(false);
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);

  // Get Quote of the Day based on the current day
  const getDailyQuote = useCallback(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return quotes[dayOfYear % quotes.length];
  }, []);

  // Get a random quote (independent of Quote of the Day)
  const getRandomQuote = useCallback(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);

  // Refresh Quote of the Day
  const refreshQuoteOfTheDay = useCallback(() => {
    setIsLoadingQOTD(true);
    setTimeout(() => {
      setQuoteOfTheDay(getDailyQuote());
      setIsLoadingQOTD(false);
    }, 500);
  }, [getDailyQuote]);

  // Refresh Random Quote
  const refreshRandomQuote = useCallback(() => {
    setIsLoadingRandom(true);
    setTimeout(() => {
      setRandomQuote(getRandomQuote());
      setIsLoadingRandom(false);
    }, 500);
  }, [getRandomQuote]);

  // Initialize on mount
  useEffect(() => {
    setQuoteOfTheDay(getDailyQuote());
    setRandomQuote(getRandomQuote());
  }, [getDailyQuote, getRandomQuote]);

  // Auto-refresh every 2 hours
  useEffect(() => {
    const interval = setInterval(() => {
      refreshQuoteOfTheDay();
      refreshRandomQuote();
    }, 2 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshQuoteOfTheDay, refreshRandomQuote]);

  return {
    quoteOfTheDay,
    randomQuote,
    refreshQuoteOfTheDay,
    refreshRandomQuote,
    isLoadingQOTD,
    isLoadingRandom,
  };
};

const quotes: Quote[] = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
  { text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.", author: "Unknown" },
  { text: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.", author: "Steve Jobs" },
  { text: "Experience is a hard teacher because she gives the test first, the lesson afterwards.", author: "Vernon Law" },
  { text: "To live is the rarest thing in the world. Most people just exist.", author: "Oscar Wilde" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { text: "Go confidently in the direction of your dreams! Live the life you've imagined.", author: "Henry David Thoreau" },
  { text: "When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one that has been opened for us.", author: "Helen Keller" },
  { text: "First, have a definite, clear practical ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end.", author: "Aristotle" },
  { text: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.", author: "Mark Twain" }
];
