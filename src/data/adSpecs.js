export const adSpecs = {
    meta: {
        id: 'meta',
        name: "Meta Ads",
        description: "Facebook & Instagram",
        bestPractices: [
            "Gebruik hoge resolutie afbeeldingen (jpg of png) en video's (mp4 of mov).",
            "Houd tekst op afbeeldingen minimaal (minder dan 20% tekst) voor maximaal bereik.",
            "Voor Stories en Reels: houd de bovenste en onderste 14% vrij van tekst/logo's om overlap met UI te voorkomen.",
            "Gebruik 4:5 aspect ratio voor feed posts om schermruimte op mobiel te maximaliseren."
        ],
        specs: [
            {
                id: 'meta-feed',
                name: "Feed Image",
                ratio: "1:1",
                dimensions: "1440 x 1440",
                type: "image",
                notes: "Standaard vierkant formaat voor FB/IG Feed.",
                safeZones: "Houd belangrijke content binnen de centrale 1152x1152px (80%)."
            },
            {
                id: 'meta-story',
                name: "Story",
                ratio: "9:16",
                dimensions: "1080 x 1920",
                type: "video",
                notes: "Volledig scherm verticale video.",
                safeZones: "Boven: 270px, Onder: 380px, Links/Rechts: 65px.",
                safeZoneOverlay: { top: '14%', bottom: '20%', left: '6%', right: '6%' }
            },
            {
                id: 'meta-reel',
                name: "Reel",
                ratio: "9:16",
                dimensions: "1080 x 1920",
                type: "video",
                notes: "Reels hebben grotere onveilige zones onderaan.",
                safeZones: "Boven: 270px, Onder: 670px, Links/Rechts: 65px.",
                safeZoneOverlay: { top: '14%', bottom: '35%', left: '6%', right: '6%' }
            },
            {
                id: 'meta-landscape',
                name: "Landscape / In-Stream",
                ratio: "16:9",
                dimensions: "1920 x 1080",
                type: "video",
                notes: "Voor in-stream video advertenties."
            },
            {
                id: 'meta-portrait',
                name: "Portrait",
                ratio: "4:5",
                dimensions: "1080 x 1350",
                type: "image",
                notes: "Geoptimaliseerd voor mobiele feed.",
                safeZones: "Veilige zone: 864 x 1134 px."
            }
        ]
    },
    tiktok: {
        id: 'tiktok',
        name: "TikTok",
        description: "TikTok Ads",
        bestPractices: [
            "Ontwerp voor sound-on omgevingen.",
            "Houd video's tussen 21-34 seconden voor optimale prestaties.",
            "Gebruik verticaal volledig scherm (9:16) assets.",
            "Plaats belangrijke elementen in de 'veilige zone' om overlap met UI knoppen te voorkomen."
        ],
        specs: [
            {
                id: 'tiktok-vertical',
                name: "Vertical Video",
                ratio: "9:16",
                dimensions: "1080 x 1920",
                type: "video",
                notes: "Standaard volledig scherm ervaring.",
                safeZones: "Boven: 130px, Onder: 367-440px, Links: 60px, Rechts: 120px.",
                safeZoneOverlay: { top: '6.8%', bottom: '20%', left: '5.5%', right: '11%' }
            },
            {
                id: 'tiktok-feed',
                name: "News Feed",
                ratio: "1:1",
                dimensions: "1200 x 1200",
                type: "image",
                notes: "Voor Pangle plaatsingen."
            },
            {
                id: 'tiktok-landscape',
                name: "Landscape",
                ratio: "16:9",
                dimensions: "1920 x 1080",
                type: "video",
                notes: "Horizontale video plaatsing."
            }
        ]
    },
    linkedin: {
        id: 'linkedin',
        name: "LinkedIn",
        description: "LinkedIn Ads",
        bestPractices: [
            "Houd koppen onder 70 tekens om afkapping te voorkomen.",
            "Gebruik professionele beelden van hoge kwaliteit.",
            "Voor video: voeg ondertiteling toe omdat veel gebruikers zonder geluid kijken.",
            "Vierkante (1:1) afbeeldingen presteren goed op mobiele feeds."
        ],
        specs: [
            {
                id: 'li-single-image',
                name: "Single Image",
                ratio: "1.91:1",
                dimensions: "1200 x 627",
                type: "image",
                notes: "Standaard gesponsorde content."
            },
            {
                id: 'li-square',
                name: "Square Image",
                ratio: "1:1",
                dimensions: "1200 x 1200",
                type: "image",
                notes: "Effectief voor mobiele feed."
            },
            {
                id: 'li-vertical-video',
                name: "Vertical Video",
                ratio: "9:16",
                dimensions: "1080 x 1920",
                type: "video",
                notes: "Mobile-first video advertenties.",
                safeZones: "Houd rekening met UI elementen onderaan.",
                safeZoneOverlay: { top: '0%', bottom: '20%', left: '0%', right: '0%' }
            },
            {
                id: 'li-landscape-video',
                name: "Landscape Video",
                ratio: "16:9",
                dimensions: "1920 x 1080",
                type: "video",
                notes: "Desktop en mobiele feed."
            }
        ]
    },
    pinterest: {
        id: 'pinterest',
        name: "Pinterest",
        description: "Pinterest Ads",
        bestPractices: [
            "Gebruik verticale beelden (2:3 ratio) om op te vallen in de feed.",
            "Voeg je logo subtiel toe op elke pin.",
            "Gebruik tekstoverlays voor context maar houd het schoon.",
            "Toon je product of dienst in actie."
        ],
        specs: [
            {
                id: 'pin-standard',
                name: "Standard Pin",
                ratio: "2:3",
                dimensions: "1000 x 1500",
                type: "image",
                notes: "Aanbevolen standaardformaat.",
                safeZones: "Boven: 270px, Onder: 440px, Zijkanten: 65px.",
                safeZoneOverlay: { top: '18%', bottom: '29%', left: '6.5%', right: '6.5%' }
            },
            {
                id: 'pin-square',
                name: "Square Pin",
                ratio: "1:1",
                dimensions: "1000 x 1000",
                type: "image",
                notes: "Voor carrousel of standaard pins."
            },
            {
                id: 'pin-video',
                name: "Video Pin",
                ratio: "9:16",
                dimensions: "1080 x 1920",
                type: "video",
                notes: "Verticale video pins.",
                safeZones: "Boven: 270px, Onder: 440px, Zijkanten: 65px.",
                safeZoneOverlay: { top: '14%', bottom: '23%', left: '6%', right: '6%' }
            }
        ]
    },
    youtube: {
        id: 'youtube',
        name: "YouTube",
        description: "Google Video Ads",
        bestPractices: [
            "Trek de aandacht in de eerste 5 seconden.",
            "Ontwerp voor mobiele zichtbaarheid (grote tekst, duidelijke visuals).",
            "Gebruik zowel landschap (16:9) als verticaal (9:16) voor maximaal bereik (Shorts).",
            "Voeg een duidelijke Call to Action (CTA) toe."
        ],
        specs: [
            {
                id: 'yt-landscape',
                name: "Standard Video",
                ratio: "16:9",
                dimensions: "1920 x 1080",
                type: "video",
                notes: "Skippable/Non-skippable advertenties.",
                safeZones: "Houd belangrijke elementen in het midden, vermijd randen (10% marge)."
            },
            {
                id: 'yt-shorts',
                name: "Shorts",
                ratio: "9:16",
                dimensions: "1080 x 1920",
                type: "video",
                notes: "YouTube Shorts plaatsing.",
                safeZones: "Boven: 288px, Onder: 672px, Links: 48px, Rechts: 192px.",
                safeZoneOverlay: { top: '15%', bottom: '35%', left: '4.5%', right: '18%' }
            },
            {
                id: 'yt-companion',
                name: "Companion Banner",
                ratio: "Custom",
                dimensions: "300 x 60",
                type: "image",
                notes: "Alleen desktop, verschijnt naast video."
            }
        ]
    },
    google: {
        id: 'google',
        name: "Google Display",
        description: "Google Display Network",
        bestPractices: [
            "Voeg een duidelijk merklogo en CTA-knop toe.",
            "Houd animaties simpel en onder de 30 seconden.",
            "Zorg dat tekst leesbaar is op kleine formaten.",
            "Gebruik de best presterende formaten (300x250, 728x90, 300x600, 320x50)."
        ],
        specs: [
            {
                id: 'gdn-medium-rect',
                name: "Medium Rectangle",
                ratio: "1.2:1",
                dimensions: "300 x 250",
                type: "image",
                notes: "Best presterende advertentieformaat."
            },
            {
                id: 'gdn-large-rect',
                name: "Large Rectangle",
                ratio: "Custom",
                dimensions: "336 x 280",
                type: "image",
                notes: "Goed voor embedded content."
            },
            {
                id: 'gdn-leaderboard',
                name: "Leaderboard",
                ratio: "Custom",
                dimensions: "728 x 90",
                type: "image",
                notes: "Banner bovenaan de pagina."
            },
            {
                id: 'gdn-half-page',
                name: "Half Page",
                ratio: "Custom",
                dimensions: "300 x 600",
                type: "image",
                notes: "Grote verticale banner."
            },
            {
                id: 'gdn-mobile-banner',
                name: "Mobile Banner",
                ratio: "Custom",
                dimensions: "320 x 50",
                type: "image",
                notes: "Standaard mobiele banner."
            }
        ]
    },
    reddit: {
        id: 'reddit',
        name: "Reddit",
        description: "Reddit Ads",
        bestPractices: [
            "Gebruik authentieke, 'native' content die past bij de subreddit.",
            "Houd headlines kort en krachtig (onder 300 tekens).",
            "Schakel reacties in voor hogere betrokkenheid (indien mogelijk).",
            "Gebruik 1200x628 of 1:1 afbeeldingen voor de beste weergave."
        ],
        specs: [
            {
                id: 'reddit-card',
                name: "Card Image",
                ratio: "1.91:1",
                dimensions: "1200 x 628",
                type: "image",
                notes: "Standaard gepromote post afbeelding."
            },
            {
                id: 'reddit-square',
                name: "Square Image",
                ratio: "1:1",
                dimensions: "1200 x 1200",
                type: "image",
                notes: "Goed voor mobiele feed."
            },
            {
                id: 'reddit-video',
                name: "Video Ad",
                ratio: "16:9",
                dimensions: "1920 x 1080",
                type: "video",
                notes: "Autoplay video in feed."
            },
            {
                id: 'reddit-vertical',
                name: "Vertical Video",
                ratio: "4:5",
                dimensions: "1080 x 1350",
                type: "video",
                notes: "Mobile-first video formaat."
            }
        ]
    },
    twitter: {
        id: 'twitter',
        name: "X (Twitter)",
        description: "X Ads",
        bestPractices: [
            "Houd video's kort (onder 15 seconden) voor maximale impact.",
            "Gebruik duidelijke branding in de eerste 3 seconden.",
            "Optimaliseer voor mobiel (80%+ van gebruik).",
            "Gebruik 1:1 of 16:9 assets voor de meeste veelzijdigheid."
        ],
        specs: [
            {
                id: 'x-image-landscape',
                name: "Landscape Image",
                ratio: "1.91:1",
                dimensions: "1200 x 628",
                type: "image",
                notes: "Standaard website card."
            },
            {
                id: 'x-image-square',
                name: "Square Image",
                ratio: "1:1",
                dimensions: "1200 x 1200",
                type: "image",
                notes: "Maximale zichtbaarheid in timeline."
            },
            {
                id: 'x-video-landscape',
                name: "Landscape Video",
                ratio: "16:9",
                dimensions: "1920 x 1080",
                type: "video",
                notes: "Standaard video formaat."
            },
            {
                id: 'x-video-square',
                name: "Square Video",
                ratio: "1:1",
                dimensions: "1200 x 1200",
                type: "video",
                notes: "1:1 video presteert vaak beter op mobiel."
            }
        ]
    },
    snapchat: {
        id: 'snapchat',
        name: "Snapchat",
        description: "Snapchat Ads",
        bestPractices: [
            "Maak content die 'native' en niet te gepolijst aanvoelt.",
            "Houd video's kort (3-5 seconden) en 'snappy'.",
            "Plaats belangrijke elementen in de veilige zone (buffer boven/onder).",
            "Gebruik geluid! Snapchat is een sound-on platform."
        ],
        specs: [
            {
                id: 'snap-single-image',
                name: "Single Image / Video",
                ratio: "9:16",
                dimensions: "1080 x 1920",
                type: "video",
                notes: "Full screen vertical ad.",
                safeZones: "Boven: 150px, Onder: 330px.",
                safeZoneOverlay: { top: '8%', bottom: '17%', left: '0%', right: '0%' }
            },
            {
                id: 'snap-story',
                name: "Story Ad Tile",
                ratio: "Custom",
                dimensions: "360 x 600",
                type: "image",
                notes: "Tegel in Discover sectie.",
                safeZones: "Boven: 175px, Onder: 269px."
            }
        ]
    }
}
