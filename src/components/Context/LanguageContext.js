import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const LanguageContext = createContext(null);

const translations = {
    bn: {
        nav: {
            home: "হোম",
            events: "ইভেন্টস",
            about: "আমাদের সম্পর্কে",
            members: "সদস্য",
            gallery: "গ্যালারি",
            contact: "যোগাযোগ"
        },

        hero: {
            intro: "আমরা সবাই মিলেই",
            nameFirst: "‘আমরা-",
            nameSecond: "আমরা’",

            description:
                "সুইডেনে বসবাসরত বাংলাদেশি বংশোদ্ভূত জনগোষ্ঠীর দেশীয় সংস্কৃতি, ঐতিহ্য এবং নতুন প্রজন্মকে একসাথে নিয়ে আমাদের পথচলা।",

            aboutButton: "আমাদের সম্পর্কে জানুন",
            memberButton: "সদস্য হোন"
        },

        aboutHome: {
            titleFirst: "আমরা-আমরা",
            titleSecond: "কী?",

            description:
                "‘আমরা-আমরা’ একটি অলাভজনক সামাজিক সংগঠন। সুইডেনে বসবাসরত বাংলাদেশি বংশোদ্ভূত মানুষের জন্য একটি উন্মুক্ত মঞ্চ, যেখানে আমরা সবাই সমান, সবাই আমাদের।",

            readMore: "আরও পড়ুন",

            openTitle: "সবার জন্য উন্মুক্ত",
            openText: "আমি, আপনি, সবাই মিলেই আমরা-আমরা",

            equalityTitle: "কোনো বৈষম্য নেই",
            equalityText: "অস্বচ্ছতা, হিংসা ও বিদ্বেষের কোনো স্থান নেই",

            cultureTitle: "দেশীয় সংস্কৃতি",
            cultureText: "বাংলাদেশি সংস্কৃতির ধারণ, চর্চা ও উদযাপন",

            generationTitle: "নতুন প্রজন্ম",
            generationText: "নতুন প্রজন্মকে বাংলাদেশের সংস্কৃতির সাথে পরিচয় করিয়ে দেওয়া"
        },

        eventsHome: {
            titleFirst: "আমাদের",
            titleSecond: "আয়োজন",

            upcoming: "আসন্ন আয়োজন",
            past: "বিগত আয়োজন",

            viewAll: "সকল আয়োজন দেখুন",
            details: "বিস্তারিত দেখুন",
            register: "নিবন্ধন করুন",
            memories: "ছবি ও বিস্তারিত",

            noUpcomingTitle: "নতুন আয়োজনের প্রস্তুতি চলছে",
            noUpcomingText:
                "আমাদের পরবর্তী আয়োজনের তথ্য শীঘ্রই প্রকাশ করা হবে।",

            upcoming: "আসন্ন আয়োজন",
            upcomingSubtitle: "শিগগিরই অনুষ্ঠিত হতে যাচ্ছে এমন আয়োজনগুলো।",

            nextEvent: "পরবর্তী আয়োজন",

            past: "বিগত আয়োজন",

            pastSubtitle:
                "ইতোমধ্যে অনুষ্ঠিত হয়ে যাওয়া আমাদের সাম্প্রতিক আয়োজনগুলো।",

            memories: "ছবি ও বিস্তারিত দেখুন",

            viewAll: "সকল আয়োজন দেখুন",

            noPast: "এখনও কোনো বিগত আয়োজন পাওয়া যায়নি।",

            loading: "আয়োজন লোড হচ্ছে...",
            error: "আয়োজনের তথ্য লোড করা যায়নি।"
        },

        objectivesHome: {
            titleFirst: "আমাদের",
            titleSecond: "লক্ষ্য ও উদ্দেশ্য",

            intro:
                "বাংলাদেশি সংস্কৃতি ও ঐতিহ্যকে সুইডেনে ধারণ, চর্চা এবং নতুন প্রজন্মের কাছে পৌঁছে দেওয়াই আমাদের অন্যতম লক্ষ্য।",

            cultureTitle: "সংস্কৃতি ও ঐতিহ্য",
            cultureText:
                "বাংলাদেশের ঐতিহ্যবাহী উৎসব ও সাংস্কৃতিক আয়োজনের মাধ্যমে আমাদের সংস্কৃতির ধারণ, চর্চা ও উদযাপন।",

            picnicTitle: "বার্ষিক বনভোজন",
            picnicText:
                "পরিবার, বন্ধু ও কমিউনিটির সবাইকে নিয়ে বার্ষিক গ্রীষ্মকালীন বনভোজন ও মিলনমেলার আয়োজন।",

            generationTitle: "নতুন প্রজন্ম",
            generationText:
                "সুইডেনে বেড়ে ওঠা নতুন প্রজন্মকে বাংলাদেশের সংস্কৃতি, ঐতিহ্য ও শিকড়ের সঙ্গে পরিচিত করা।",

            learnMore: "আমাদের সম্পর্কে জানুন"
        },

        memberHome: {
            title: "এই সংগঠন আমাদের সবার।",
            description:
                "আপনিও যুক্ত হোন আমরা-আমরা পরিবারের সাথে।",
            joinButton: "সদস্য হোন"
        },

        footer: {
            tagline: "একতা • সংস্কৃতি • সবার জন্য",

            quickLinks: "দ্রুত লিংক",
            home: "হোম",
            events: "আয়োজন",
            about: "আমাদের সম্পর্কে",
            members: "সদস্য",
            gallery: "গ্যালারি",
            contact: "যোগাযোগ",

            location: "সুইডেন",

            copyright: "আমরা-আমরা। সকল অধিকার সংরক্ষিত।"
        },

        aboutPage: {
            label: "আমাদের সম্পর্কে",

            heroFirst: "আমরা সবাই মিলেই",
            heroSecond: "আমরা-আমরা",
            heroDescription:
                "সুইডেনে বসবাসরত বাংলাদেশি বংশোদ্ভূত মানুষের একটি উন্মুক্ত, সমতাভিত্তিক ও অলাভজনক সামাজিক সংগঠন।",

            whatTitleFirst: "আমরা-আমরা",
            whatTitleSecond: "কী?",

            whatTitle: "‘আমরা-আমরা’ কী?",
            whatText:
                "‘আমরা-আমরা’ একটি অলাভজনক সামাজিক সংগঠন।",

            whoTitle: "কে / কারা?",
            whoText:
                "আমি, আপনি, সবাই মিলেই ‘আমরা-আমরা’। সুইডেনে বসবাসরত বাংলাদেশি বংশোদ্ভূত যে কেউ এখানে যোগ দিতে পারে, অন্যদের আমন্ত্রণ জানাতে পারে এবং ‘আমরা-আমরা’র সকল কার্যক্রমে সক্রিয়ভাবে সময়, শ্রম ও পরিকল্পনা দিয়ে সহযোগিতা করতে পারে। ‘আমরা-আমরা’ সমানভাবে আমাদের সবার।",

            valuesTitle: "কী নেই এখানে?",
            valuesText:
                "‘আমরা-আমরা’ এমন একটি মঞ্চ যেখানে কোনো বৈষম্য নেই, অস্বচ্ছতা নেই, হিংসা-বিদ্বেষ নেই এবং কোনো প্রকার খারাপ আচরণের স্থান নেই।",

            goalLabel: "আমাদের লক্ষ্য",
            goalTitle: "দেশীয় সংস্কৃতি, ঐতিহ্য ও নতুন প্রজন্ম",
            goalText:
                "সুইডেনে বসবাসরত বাংলাদেশি বংশোদ্ভূত জনগোষ্ঠীর দেশীয় সংস্কৃতি ধারণ ও চর্চা করার পাশাপাশি পরবর্তী প্রজন্মকে বাংলাদেশি সংস্কৃতির সঙ্গে পরিচয় করিয়ে দেওয়াই ‘আমরা-আমরা’র মূল লক্ষ্য।",

            objectivesFirst: "আমাদের",
            objectivesSecond: "উদ্দেশ্য",
            objectivesIntro:
                "সংস্কৃতি, মিলন এবং নতুন প্রজন্মকে নিজেদের শিকড়ের সঙ্গে যুক্ত রাখার জন্য আমরা বিভিন্ন কার্যক্রম আয়োজন করি।",

            festivalTitle: "দেশীয় উৎসব",
            festivalText:
                "বাংলাদেশের ঐতিহ্যবাহী ও দেশীয় বিভিন্ন উৎসব পালন এবং সাংস্কৃতিক আয়োজন করা।",

            picnicTitle: "বার্ষিক বনভোজন",
            picnicText:
                "প্রতি বছর গ্রীষ্মকালে পরিবার, বন্ধু ও কমিউনিটির সবাইকে নিয়ে বনভোজন ও মিলনমেলার আয়োজন করা।",

            generationTitle: "নতুন প্রজন্ম",
            generationText:
                "সুইডেনে বেড়ে ওঠা নতুন প্রজন্মকে বাংলাদেশের সংস্কৃতি, ঐতিহ্য ও শিকড়ের সঙ্গে পরিচয় করিয়ে দেওয়া।",

            joinTitle: "এই সংগঠন আমাদের সবার।",
            joinText:
                "আপনিও যুক্ত হোন আমরা-আমরা পরিবারের সাথে।",
            joinButton: "সদস্য হোন"
        },
    },

    en: {
        nav: {
            home: "Home",
            events: "Events",
            about: "About Us",
            members: "Members",
            gallery: "Gallery",
            contact: "Contact"
        },

        hero: {
            intro: "Together, we are",
            nameFirst: "‘Amra-",
            nameSecond: "Amra’",

            description:
                "Bringing together the Bangladeshi community in Sweden to celebrate our culture and heritage while connecting the next generation with their roots.",

            aboutButton: "About Us",
            memberButton: "Become a Member"
        },

        aboutHome: {
            titleFirst: "What is",
            titleSecond: "Amra-Amra?",

            description:
                "Amra-Amra is a nonprofit social organization and an open community for people of Bangladeshi origin living in Sweden. Everyone is equal, everyone belongs, and together we are Amra-Amra.",

            readMore: "Read More",

            openTitle: "Open to Everyone",
            openText: "You, me and all of us together make Amra-Amra",

            equalityTitle: "No Discrimination",
            equalityText: "No place for discrimination, opacity, hatred or hostility",

            cultureTitle: "Our Culture",
            cultureText: "Preserving, practicing and celebrating Bangladeshi culture",

            nextEvent: "Upcoming Event",

            past: "Past Events",

            pastSubtitle:
                "Take a look at our most recent community events.",

            memories: "Photos & Details",

            viewAll: "View All Events",

            noPast: "No past events are available yet.",

            generationTitle: "Next Generation",
            generationText: "Introducing the next generation to Bangladeshi culture"
        },

        eventsHome: {
            titleFirst: "Our",
            titleSecond: "Events",

            upcoming: "Upcoming Events",
            past: "Past Events",

            viewAll: "View All Events",
            details: "View Details",
            register: "Register",
            memories: "Photos & Details",

            noUpcomingTitle: "Something new is coming",
            noUpcomingText:
                "Details of our next event will be announced soon.",

            upcoming: "Upcoming Event",
            upcomingSubtitle: "Our next community event coming up soon.",

            loading: "Loading events...",
            error: "Could not load event information."
        },

        objectivesHome: {
            titleFirst: "Our",
            titleSecond: "Goals & Objectives",

            intro:
                "Our goal is to preserve and practice Bangladeshi culture and heritage in Sweden while passing it on to the next generation.",

            cultureTitle: "Culture & Heritage",
            cultureText:
                "Preserving, practicing and celebrating Bangladeshi culture through traditional festivals and cultural activities.",

            picnicTitle: "Annual Summer Picnic",
            picnicText:
                "Bringing families, friends and the community together through our annual summer picnic and gathering.",

            generationTitle: "Next Generation",
            generationText:
                "Introducing the next generation growing up in Sweden to Bangladeshi culture, heritage and roots.",

            learnMore: "Learn About Us"
        },

        memberHome: {
            title: "This organization belongs to all of us.",
            description:
                "Join the Amra-Amra family and be part of our community.",
            joinButton: "Become a Member"
        },

        footer: {
            tagline: "Unity • Culture • For Everyone",

            quickLinks: "Quick Links",
            home: "Home",
            events: "Events",
            about: "About Us",
            members: "Members",
            gallery: "Gallery",
            contact: "Contact",

            location: "Sweden",

            copyright: "Amra-Amra. All rights reserved."
        },

        aboutPage: {
            label: "About Us",

            heroFirst: "Together We Are",
            heroSecond: "Amra-Amra",
            heroDescription:
                "An open, equal and nonprofit social organization for people of Bangladeshi origin living in Sweden.",

            whatTitleFirst: "What is",
            whatTitleSecond: "Amra-Amra?",

            whatTitle: "What is Amra-Amra?",
            whatText:
                "Amra-Amra is a nonprofit social organization.",

            whoTitle: "Who Are We?",
            whoText:
                "You, me and all of us together make Amra-Amra. Anyone of Bangladeshi origin living in Sweden can join, invite others and actively contribute time, effort and ideas to our activities. Amra-Amra belongs equally to all of us.",

            valuesTitle: "What Has No Place Here?",
            valuesText:
                "Amra-Amra is a community where there is no place for discrimination, lack of transparency, hatred, hostility or inappropriate behavior.",

            goalLabel: "Our Goal",
            goalTitle: "Culture, Heritage & the Next Generation",
            goalText:
                "Our main goal is to preserve and practice Bangladeshi culture among people of Bangladeshi origin living in Sweden while introducing the next generation to Bangladeshi culture and heritage.",

            objectivesFirst: "Our",
            objectivesSecond: "Objectives",
            objectivesIntro:
                "We organize activities that celebrate our culture, bring the community together and connect the next generation with their roots.",

            festivalTitle: "Traditional Festivals",
            festivalText:
                "Celebrating traditional Bangladeshi festivals and organizing cultural activities that keep our heritage alive.",

            picnicTitle: "Annual Summer Picnic",
            picnicText:
                "Bringing families, friends and the community together every summer through our annual picnic and gathering.",

            generationTitle: "Next Generation",
            generationText:
                "Introducing the next generation growing up in Sweden to Bangladeshi culture, heritage and roots.",

            joinTitle: "This organization belongs to all of us.",
            joinText:
                "Join the Amra-Amra family and become part of our community.",
            joinButton: "Become a Member"
        },

    }
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem("amra-language") || "bn";
    });

    useEffect(() => {
        localStorage.setItem(
            "amra-language",
            language
        );

        document.documentElement.lang =
            language === "bn" ? "bn" : "en";
    }, [language]);

    const t = (path) => {
        const keys = path.split(".");

        let value = translations[language];

        for (const key of keys) {
            value = value?.[key];
        }

        return value || path;
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            "useLanguage must be used inside LanguageProvider"
        );
    }

    return context;
}