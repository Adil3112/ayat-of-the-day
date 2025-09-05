import { IslamicCard } from "@/components/IslamicCard";
import { useIslamicContent } from "@/hooks/useIslamicContent";
import { Building2, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const {
    ayatOfTheDay,
    duaOfTheDay,
    refreshAyat,
    refreshDua,
    isLoadingAyat,
    isLoadingDua
  } = useIslamicContent();

  const ayatExpandedContent = {
    title: "Detailed Explanation",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-primary mb-2">Tafseer (Detailed Explanation)</h4>
          <p className="text-foreground/80 leading-relaxed">{ayatOfTheDay.tafseer}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-primary mb-2">Historical Context</h4>
          <p className="text-foreground/80 leading-relaxed">{ayatOfTheDay.context}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-primary mb-2">Key Lessons</h4>
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            {ayatOfTheDay.lessons.map((lesson, index) => (
              <li key={index} className="leading-relaxed">{lesson}</li>
            ))}
          </ul>
        </div>
        
        <div className="pt-4 border-t border-border/30">
          <p className="text-sm text-muted-foreground italic">
            Surah {ayatOfTheDay.surah}, Ayah {ayatOfTheDay.ayahNumber}
          </p>
        </div>
      </div>
    )
  };

  const duaExpandedContent = {
    title: "Explanation",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-primary mb-2">Context & Source</h4>
          <p className="text-foreground/80 leading-relaxed">{duaOfTheDay.context}</p>
          <p className="text-sm text-muted-foreground mt-2 italic">Source: {duaOfTheDay.source}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-primary mb-2">Benefits of Reciting</h4>
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            {duaOfTheDay.benefits.map((benefit, index) => (
              <li key={index} className="leading-relaxed">{benefit}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  };

  const handleGlobalRefresh = async () => {
    await Promise.all([refreshAyat(), refreshDua()]);
  };

  const isGlobalLoading = isLoadingAyat || isLoadingDua;

  return (
    <div className="min-h-screen bg-gradient-islamic">
      {/* Header Section */}
      <header className="relative text-center py-16 px-4">
        {/* Global Refresh Button */}
        <div className="absolute top-8 right-8">
          <Button
            onClick={handleGlobalRefresh}
            disabled={isGlobalLoading}
            className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/50 transition-all duration-300 font-english"
            size="lg"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${isGlobalLoading ? 'animate-spin' : ''}`} />
            {isGlobalLoading ? 'Refreshing...' : 'Refresh All'}
          </Button>
        </div>

        <div className="inline-flex items-center gap-3 mb-6">
          <Building2 className="w-10 h-10 text-primary" />
          <h1 className="text-5xl font-bold text-foreground font-english">
            Ayat & Dua of the Day
          </h1>
          <Sparkles className="w-8 h-8 text-islamic-gold" />
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-english">
          Daily spiritual nourishment from the Quran and Sunnah. Discover the profound wisdom, 
          detailed explanations, and practical guidance that will illuminate your path towards Allah.
        </p>
        <div className="mt-4 text-sm text-muted-foreground font-english">
          ✨ Content refreshes automatically every 12 hours
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 pb-16">
        <div className="grid gap-12 lg:grid-cols-2 max-w-7xl mx-auto">
          <IslamicCard
            title="Ayat of the Day"
            arabicText={ayatOfTheDay.arabic}
            translation={ayatOfTheDay.translation}
            onRefresh={refreshAyat}
            isLoading={isLoadingAyat}
            expandedContent={ayatExpandedContent}
          />
          
          <IslamicCard
            title="Dua of the Day"
            arabicText={duaOfTheDay.arabic}
            translation={duaOfTheDay.translation}
            onRefresh={refreshDua}
            isLoading={isLoadingDua}
            expandedContent={duaExpandedContent}
          />
        </div>
      </main>

      {/* Footer Section */}
      <footer className="text-center py-8 px-4 border-t border-border/30 bg-card/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground font-english mb-2">
            <span className="text-primary font-semibold">Powered by Quran & Sunnah</span>
          </p>
          <p className="text-sm text-muted-foreground font-english">
            May Allah bless you with knowledge, guidance, and spiritual growth through these daily reminders.
          </p>
          <div className="mt-4 text-xs text-muted-foreground font-english">
            Content refreshes every 12 hours • Individual refresh buttons on each card • Global refresh button at top right
          </div>
        </div>
        
        {/* Subtle Islamic Pattern */}
        <div className="mt-8 opacity-10">
          <div className="flex justify-center items-center space-x-4">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-4 h-4 bg-primary transform rotate-45"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-4 h-4 bg-primary transform rotate-45"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;