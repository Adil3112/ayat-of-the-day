import { QuoteCard } from "@/components/QuoteCard";
import { useQuotes } from "@/hooks/useQuotes";
import { Sparkles } from "lucide-react";

const Index = () => {
  const {
    quoteOfTheDay,
    randomQuote,
    refreshQuoteOfTheDay,
    refreshRandomQuote,
    isLoadingQOTD,
    isLoadingRandom
  } = useQuotes();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <header className="text-center py-16 px-4">
        <div className="inline-flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
          <h1 className="text-5xl font-bold bg-gradient-sky bg-clip-text text-transparent">
            Daily Inspiration
          </h1>
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Discover wisdom and motivation with our carefully curated collection of inspiring quotes. 
          Refreshed automatically every two hours to keep your spirit elevated.
        </p>
      </header>

      {/* Quotes Section */}
      <main className="container mx-auto px-4 pb-16">
        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          <QuoteCard
            title="Quote of the Day"
            quote={quoteOfTheDay.text}
            author={quoteOfTheDay.author}
            onRefresh={refreshQuoteOfTheDay}
            isLoading={isLoadingQOTD}
          />
          
          <QuoteCard
            title="Random Inspiration"
            quote={randomQuote.text}
            author={randomQuote.author}
            onRefresh={refreshRandomQuote}
            isLoading={isLoadingRandom}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-4 border-t border-border/30">
        <p className="text-muted-foreground">
          Auto-refreshes every 2 hours • Click refresh for new quotes anytime
        </p>
      </footer>
    </div>
  );
};

export default Index;