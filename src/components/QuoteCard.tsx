import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface QuoteCardProps {
  title: string;
  quote: string;
  author: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

export const QuoteCard = ({ title, quote, author, onRefresh, isLoading = false }: QuoteCardProps) => {
  return (
    <Card className="p-8 shadow-quote bg-card/95 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold bg-gradient-sky bg-clip-text text-transparent">
          {title}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      
      <blockquote className="text-lg leading-relaxed text-foreground/90 mb-6 italic font-medium">
        "{quote}"
      </blockquote>
      
      <footer className="text-primary font-semibold text-right">
        — {author}
      </footer>
    </Card>
  );
};