import { useState, useEffect, useCallback } from 'react';

interface Ayat {
  arabic: string;
  translation: string;
  surah: string;
  ayahNumber: number;
  tafseer: string;
  context: string;
  lessons: string[];
}

interface Dua {
  arabic: string;
  translation: string;
  source: string;
  benefits: string[];
  context: string;
}

const ayats: Ayat[] = [
  {
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
    translation: "And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect.",
    surah: "At-Talaq",
    ayahNumber: 2,
    tafseer: "This verse emphasizes the concept of Taqwa (God-consciousness) and its profound impact on a believer's life. When one truly fears Allah and lives righteously, Allah opens doors that seemed impossible and provides sustenance from unexpected sources.",
    context: "This verse was revealed in Medina during the discussion of divorce laws, reminding believers that even in difficult circumstances, those who maintain their faith will find Allah's help.",
    lessons: [
      "Trust in Allah's provision brings peace and opens unexpected opportunities",
      "Righteousness and God-consciousness are keys to success in this life and the next",
      "Allah's help often comes from sources we never imagined"
    ]
  },
  {
    arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ ۖ إِنَّهُ لَا يَيْأَسُ مِن رَّوْحِ اللَّهِ إِلَّا الْقَوْمُ الْكَافِرُونَ",
    translation: "And do not despair of relief from Allah. Indeed, no one despairs of relief from Allah except the disbelieving people.",
    surah: "Yusuf",
    ayahNumber: 87,
    tafseer: "This verse teaches us about hope and trust in Allah's mercy. Even in the darkest times, a believer should never lose hope in Allah's help and relief. Despair is characteristic of those who do not believe in Allah's infinite mercy and power.",
    context: "These are the words of Prophet Ya'qub (Jacob) to his sons when they were going through severe hardship and had lost Yusuf (Joseph) and then Binyamin (Benjamin).",
    lessons: [
      "Hope in Allah's mercy should never be abandoned, regardless of circumstances",
      "Despair and hopelessness are signs of weak faith",
      "Allah's relief and help can come at any moment, often when least expected"
    ]
  },
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Indeed, with hardship comes ease.",
    surah: "Ash-Sharh",
    ayahNumber: 6,
    tafseer: "This powerful verse assures believers that every difficulty is accompanied by relief. The Arabic structure suggests that ease comes with hardship, not after it, indicating that even in our struggles, there are elements of comfort and hope.",
    context: "This verse was revealed to console Prophet Muhammad (peace be upon him) during a particularly difficult period of his mission, reminding him that Allah's help is always present.",
    lessons: [
      "Every hardship contains within it the seeds of its own relief",
      "Patience during difficulties is rewarded with ease and comfort",
      "This verse provides hope and strength during challenging times"
    ]
  },
  {
    arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ ۚ وَاللَّهُ بِمَا تَعْمَلُونَ بَصِيرٌ",
    translation: "And He is with you wherever you are. And Allah is Seeing of what you do.",
    surah: "Al-Hadid",
    ayahNumber: 4,
    tafseer: "This verse provides immense comfort by reminding us of Allah's constant presence and awareness. No matter where we are or what situation we face, Allah is with us through His knowledge, support, and guidance.",
    context: "This verse is part of the opening verses of Surah Al-Hadid, establishing Allah's absolute sovereignty and His intimate knowledge of all creation.",
    lessons: [
      "Allah's presence provides comfort and strength in all situations",
      "We are never truly alone when we remember Allah's constant watch over us",
      "This awareness should encourage good deeds and discourage sinful behavior"
    ]
  },
  {
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    translation: "Our Lord, give us good in this world and good in the next world and save us from the punishment of the Fire.",
    surah: "Al-Baqarah",
    ayahNumber: 201,
    tafseer: "This is one of the most comprehensive and balanced duas in the Quran. It seeks Allah's blessings for both this life and the hereafter, acknowledging the importance of both spiritual and worldly well-being while seeking protection from punishment.",
    context: "This dua is mentioned in the context of Hajj, where pilgrims from different places would make various requests, but this particular dua represents the most balanced and complete request.",
    lessons: [
      "Balance between worldly and spiritual aspirations is essential",
      "True success encompasses both this life and the hereafter",
      "Seeking Allah's protection is as important as seeking His blessings"
    ]
  }
];

const duas: Dua[] = [
  {
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي",
    translation: "My Lord, expand for me my breast and ease for me my task and untie the knot from my tongue that they may understand my speech.",
    source: "Quran 20:25-28 (Dua of Prophet Musa)",
    context: "This was the dua made by Prophet Musa (Moses) when Allah assigned him the tremendous task of confronting Pharaoh and calling him to Islam.",
    benefits: [
      "Helps in gaining confidence and courage for difficult tasks",
      "Improves communication and public speaking abilities",
      "Removes anxiety and expands the chest (brings peace)",
      "Particularly beneficial before important meetings or presentations"
    ]
  },
  {
    arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا",
    translation: "Our Lord, do not impose blame upon us if we forget or make mistakes.",
    source: "Quran 2:286",
    context: "This is part of the final verses of Surah Al-Baqarah, containing supplications that seek Allah's mercy and forgiveness for human weaknesses.",
    benefits: [
      "Seeks forgiveness for unintentional mistakes and forgetfulness",
      "Acknowledges human limitations and Allah's mercy",
      "Provides comfort when we err despite good intentions",
      "Strengthens the relationship between servant and Creator"
    ]
  },
  {
    arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    translation: "O Allah, help me to remember You, to thank You, and to worship You in the best manner.",
    source: "Hadith - Sahih Abu Dawud",
    context: "This dua was taught by Prophet Muhammad (peace be upon him) to Muadh ibn Jabal, emphasizing the three fundamental aspects of a believer's relationship with Allah.",
    benefits: [
      "Strengthens remembrance of Allah throughout the day",
      "Cultivates gratitude and appreciation for Allah's blessings",
      "Improves the quality and sincerity of worship",
      "Creates a comprehensive spiritual routine"
    ]
  },
  {
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    translation: "My Lord, increase me in knowledge.",
    source: "Quran 20:114",
    context: "Allah commanded Prophet Muhammad (peace be upon him) to recite this dua, emphasizing the importance of continuous learning and seeking knowledge.",
    benefits: [
      "Opens doors to beneficial knowledge and wisdom",
      "Protects from ignorance and misguidance",
      "Increases understanding of religion and worldly matters",
      "Particularly beneficial for students and teachers"
    ]
  },
  {
    arabic: "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
    translation: "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.",
    source: "Quran 18:10 (Dua of the People of the Cave)",
    context: "This was the dua made by the young believers known as the People of the Cave when they sought refuge in the cave to protect their faith.",
    benefits: [
      "Seeks Allah's special mercy and divine guidance",
      "Helps in making correct decisions and choices",
      "Provides protection during times of trial and confusion",
      "Brings clarity and wisdom in complex situations"
    ]
  }
];

export const useIslamicContent = () => {
  const [ayatOfTheDay, setAyatOfTheDay] = useState<Ayat>(ayats[0]);
  const [duaOfTheDay, setDuaOfTheDay] = useState<Dua>(duas[0]);
  const [isLoadingAyat, setIsLoadingAyat] = useState(false);
  const [isLoadingDua, setIsLoadingDua] = useState(false);

  const getAyatOfTheDay = useCallback(() => {
    const now = new Date();
    // Calculate hours since epoch and divide by 12 to get 12-hour cycles
    const twelveHourCycles = Math.floor(now.getTime() / (1000 * 60 * 60 * 12));
    return ayats[twelveHourCycles % ayats.length];
  }, []);

  const getDuaOfTheDay = useCallback(() => {
    const now = new Date();
    // Calculate hours since epoch and divide by 12, offset by 6 hours for different rotation
    const twelveHourCycles = Math.floor((now.getTime() + (6 * 60 * 60 * 1000)) / (1000 * 60 * 60 * 12));
    return duas[twelveHourCycles % duas.length];
  }, []);

  const refreshAyat = useCallback(async () => {
    setIsLoadingAyat(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAyatOfTheDay(getAyatOfTheDay());
    setIsLoadingAyat(false);
  }, [getAyatOfTheDay]);

  const refreshDua = useCallback(async () => {
    setIsLoadingDua(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDuaOfTheDay(getDuaOfTheDay());
    setIsLoadingDua(false);
  }, [getDuaOfTheDay]);

  // Initialize content on mount
  useEffect(() => {
    setAyatOfTheDay(getAyatOfTheDay());
    setDuaOfTheDay(getDuaOfTheDay());
  }, [getAyatOfTheDay, getDuaOfTheDay]);

  // Auto-refresh every 12 hours
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAyat();
      refreshDua();
    }, 12 * 60 * 60 * 1000); // 12 hours in milliseconds

    return () => clearInterval(interval);
  }, [refreshAyat, refreshDua]);

  return {
    ayatOfTheDay,
    duaOfTheDay,
    refreshAyat,
    refreshDua,
    isLoadingAyat,
    isLoadingDua
  };
};