import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface IslamicCardProps {
  title: string;
  arabicText: string;
  translation: string;
  onRefresh: () => void;
  isLoading?: boolean;
  expandedContent?: {
    title: string;
    content: React.ReactNode;
  };
}

export const IslamicCard = ({ 
  title, 
  arabicText, 
  translation, 
  onRefresh, 
  isLoading = false,
  expandedContent 
}: IslamicCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-8 shadow-islamic bg-gradient-card backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-primary font-english">
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
      
      {/* Arabic Text */}
      <div className="mb-8 p-6 bg-secondary/30 rounded-lg border border-border/30">
        <p className="text-2xl leading-loose font-arabic text-foreground text-center">
          {arabicText}
        </p>
      </div>
      
      {/* English Translation */}
      <blockquote className="text-lg leading-relaxed text-foreground/90 mb-6 italic font-medium font-english text-center border-l-4 border-primary pl-4">
        "{translation}"
      </blockquote>
      
      {/* Expandable Content */}
      {expandedContent && (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between font-english hover:bg-primary/5 transition-colors duration-300"
            >
              {expandedContent.title}
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 animate-accordion-down">
            <div className="p-6 bg-muted/30 rounded-lg border border-border/30 font-english">
              {expandedContent.content}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </Card>
  );
};