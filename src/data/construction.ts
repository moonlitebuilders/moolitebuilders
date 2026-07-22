export interface HeroData {
  label: string;
  title1: string;
  titleHighlight: string;
  title2: string;
  description: string;
  primaryCTA: string;
  secondaryCTA: string;
  image: string;
}

export interface PackageFeature {
  name: string;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  bestFor: string;
  features: string[];
  icon: string;
}

export interface ComparisonRow {
  material: string;
  icon: string;
  standard: string;
  classic: string;
  premium: string;
}

export interface ComparisonCategory {
  id: string;
  name: string;
  rows: ComparisonRow[];
}

export interface Highlight {
  title: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const constructionHero: HeroData = {
  label: "CONSTRUCTION SERVICES",
  title1: "Building Spaces",
  titleHighlight: "Last.",
  title2: "That ",
  description: "From Residential Homes To Commercial And Industrial Developments, We Deliver Expertly Planned Construction Solutions Built With Premium Materials And Lasting Craftsmanship.",
  primaryCTA: "GET A FREE QUOTE",
  secondaryCTA: "EXPLORE SERVICES",
  image: "/assets/service/construction-service.jpg"
};

export const constructionPackages: Package[] = [
  {
    id: "standard",
    name: "STANDARD",
    price: "₹2,400 /Sqft",
    bestFor: "First-Time Homeowners",
    features: [
      "Quality Construction",
      "Budget-Friendly",
      "Reliable Materials",
      "Functional Finishes"
    ],
    icon: "/assets/icons/service/construction/construction pricing/standard.svg"
  },
  {
    id: "classic",
    name: "CLASSIC",
    price: "₹2,900 /Sqft",
    bestFor: "Growing Families",
    features: [
      "Better Quality Materials",
      "Enhanced Finishes",
      "Modern Design Options",
      "Balanced Of Quality & Cost"
    ],
    icon: "/assets/icons/service/construction/construction pricing/Group.svg"
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: "₹3,600 /sqft",
    bestFor: "Luxury Living",
    features: [
      "Premium Quality Materials",
      "Luxury Finishes",
      "High-End Fixtures",
      "Superior Durability"
    ],
    icon: "/assets/icons/service/construction/construction pricing/premium.svg"
  }
];

export const comparisonCategories: ComparisonCategory[] = [
  {
    id: "structural",
    name: "Structural Materials",
    rows: [
      {
        material: "Cement",
        icon: "/assets/icons/service/construction/Compare Package/Cement.svg",
        standard: "Dalmia / Chettinad",
        classic: "UltraTech / Coromandel",
        premium: "UltraTech / Coromandel / Royal"
      },
      {
        material: "Brick",
        icon: "/assets/icons/service/construction/Compare Package/Brick.svg",
        standard: "Chamber Brick",
        classic: "Chamber Brick",
        premium: "Wirecut Brick"
      },
      {
        material: "RCC Mix",
        icon: "/assets/icons/service/construction/Compare Package/RCC Mix.svg",
        standard: "M20 / M25",
        classic: "M20 / M25",
        premium: "M20 / M25"
      },
      {
        material: "Steel Rod",
        icon: "/assets/icons/service/construction/Compare Package/Steel Rod.svg",
        standard: "JSW / Suryadev",
        classic: "JSW ARS 550D",
        premium: "JSW ARS 550D"
      }
    ]
  },
  {
    id: "finishes",
    name: "Finishes",
    rows: [
      {
        material: "Interior Paint",
        icon: "/assets/icons/service/construction/Compare Package/Interior Paint.svg",
        standard: "Tractor Emulsion",
        classic: "Apcolite",
        premium: "Luxury Emulsion"
      },
      {
        material: "Exterior Paint",
        icon: "/assets/icons/service/construction/Compare Package/Exterior Paint.svg",
        standard: "Apex",
        classic: "Apex",
        premium: "Apex Ultima Emulsion / Castor"
      },
      {
        material: "Wall Tiles",
        icon: "/assets/icons/service/construction/Compare Package/Wall Tiles.svg",
        standard: "₹45 / Sqft",
        classic: "₹50 / Sqft",
        premium: "₹70-80 / Sqft"
      },
      {
        material: "Floor Tiles",
        icon: "/assets/icons/service/construction/Compare Package/Floor Tiles.svg",
        standard: "₹50 / Sqft",
        classic: "₹70 / Sqft",
        premium: "₹90-120 / Sqft"
      }
    ]
  },
  {
    id: "doors-windows",
    name: "Doors & Windows",
    rows: [
      {
        material: "Main Door",
        icon: "/assets/icons/service/construction/Compare Package/Main Door.svg",
        standard: "₹20,000 (Incl. Accessories)",
        classic: "₹25,000 Teak Wood",
        premium: "₹40,000 Teak Wood"
      },
      {
        material: "Windows",
        icon: "/assets/icons/service/construction/Compare Package/Group-1.svg",
        standard: "UPVC",
        classic: "UPVC",
        premium: "UPVC / Wood"
      }
    ]
  },
  {
    id: "electrical-plumbing",
    name: "Electrical & Plumbing",
    rows: [
      {
        material: "Electrical Wire",
        icon: "/assets/icons/service/construction/Compare Package/Electrical Wire.svg",
        standard: "ISI Brand",
        classic: "Anchor / Finolex",
        premium: "Finolex / Havells"
      },
      {
        material: "Plumbing Pipe",
        icon: "/assets/icons/service/construction/Compare Package/Plumbing Pipe.svg",
        standard: "Ashirvad / Parryware",
        classic: "Ashirvad / Finolex",
        premium: "Ashirvad / Finolex"
      },
      {
        material: "Electrical Switches",
        icon: "/assets/icons/service/construction/Compare Package/Group.svg",
        standard: "Modular",
        classic: "Anchor / L&T / G.M",
        premium: "Legrand"
      }
    ]
  },
  {
    id: "sanitary-interior",
    name: "Sanitary & Interior",
    rows: [
      {
        material: "Sanitary Fittings",
        icon: "/assets/icons/service/construction/Compare Package/Sanitary Fittings.svg",
        standard: "Parryware (Basic Model)",
        classic: "Parryware / Cera",
        premium: "Jaquar / Parryware"
      },
      {
        material: "Basic Interiors",
        icon: "/assets/icons/service/construction/Compare Package/Basic Interiors.svg",
        standard: "--",
        classic: "--",
        premium: "Included (Plywood)"
      }
    ]
  }
];

export const packageHighlights: Highlight[] = [
  {
    title: "Expert Supervision",
    icon: "/assets/icons/service/construction/package include/expert supervision.svg"
  },
  {
    title: "Quality Assurance",
    icon: "/assets/icons/service/construction/package include/quality assurance.svg"
  },
  {
    title: "On-Time Delivery",
    icon: "/assets/icons/service/construction/package include/on-time delivery.svg"
  },
  {
    title: "Complete Transparency",
    icon: "/assets/icons/service/construction/package include/complete trnsperancy.svg"
  }
];

export const constructionFAQs: FAQ[] = [
  {
    question: "What types of construction projects do you undertake?",
    answer: "We undertake residential, commercial, industrial, and interior design projects across Chennai and Tamil Nadu. Whether it's a new home, office, commercial building, or renovation, we provide end-to-end construction solutions."
  },
  {
    question: "Can I customize the construction package?",
    answer: "Yes. Our Standard, Classic, and Premium packages serve as a foundation, but materials, finishes, and specifications can be customized to suit your budget and preferences."
  },
  {
    question: "What is included in the construction cost?",
    answer: "Our pricing covers construction based on the selected package, including structural work, specified materials, workmanship, and project supervision. Additional customizations or special requirements will be discussed and quoted separately."
  },
  {
    question: "How is the construction cost calculated?",
    answer: "The total cost is calculated based on the built-up area (₹ per sq. ft.) and the package you choose. During the consultation, we provide a transparent quotation with a detailed breakdown of the specifications and inclusions."
  },
  {
    question: "How long does it take to complete a construction project?",
    answer: "Project timelines depend on the size, design complexity, and approvals required. During the planning stage, we provide an estimated completion schedule and keep you informed throughout the project."
  }
];
