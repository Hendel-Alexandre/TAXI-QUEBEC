export type Language = 'en' | 'fr';

export const translations = {
  en: {
    nav: {
        home: "Home",
        book: "Book a Ride",
        contact: "Contact",
        cta: "Book your ride now",
        myAccount: "My Account"
      },
      hero: {
        title: "Taxi Québec – Reliable service in Québec 24/7!",
        description: "Professional drivers and safe transport. Book online or call us for quick pickup.",
        callDirect: "Direct Call",
        pickupPlaceholder: "Enter your pickup location",
          bookButton: "Reserve",
          dropoffPlaceholder: "Enter your destination",
          outsideQuebecError: "Sorry, we only provide service in the Quebec City area.",
          carOptions: {
            standard: "Standard",
            comfort: "Comfort",
            van: "Van"
          },
          dateTime: {
            date: "Date",
            time: "Time"
          },
          modal: {
          title: "Book your ride",
          description: "Please enter your details and we will contact you shortly.",
          name: "Full Name",
          phone: "Phone Number",
          email: "Email Address",
          submit: "Confirm Booking",
          success: "A representative will contact you by phone, thank you."
        }
      },
    services: {
      title: "Our Services",
      immediateTaxi: "TAXI 24/7",
      immediateTaxiSub: "URBAN & LOCAL",
      immediateTaxiDesc: "Immediate taxi service anywhere in Quebec, day and night.",
      airport: "AIRPORT SHUTTLE",
      airportSub: "YQB JEAN-LESAGE",
      airportDesc: "Direct and punctual transfers to Jean-Lesage airport.",
      assistance: "UNLOCKING — $50",
      assistanceSub: "ROADSIDE ASSISTANCE",
      assistanceDesc: "Professional unlocking service and battery jump-start.",
      specialized: "ADAPTED TRANSPORT",
      specializedSub: "ACCESSIBILITY",
      specializedDesc: "Vehicles equipped for wheelchairs and specific needs.",
      delivery: "PARCEL DELIVERY",
      deliverySub: "EXPRESS SERVICE",
      deliveryDesc: "Fast delivery of documents and parcels throughout the territory.",
      corporate: "PRIVILEGE ACCOUNT",
      corporateSub: "CORPORATE",
      corporateDesc: "Transport solutions for businesses with monthly billing.",
      bookNow: "BOOK NOW",
      needTaxi: "NEED A TAXI IMMEDIATELY?"
    },
    whyChooseUs: {
      badge: "Why choose Taxi-Quebec?",
      title: "We connect you with nearby drivers in seconds, no long waits, no stress.",
      safe: "Trusted & Safe",
      payments: "Seamless Payments",
      availability: "24/7 Availability",
      getStarted: "Get started"
    },
    carRentals: {
      badge: "Need a car? Rent with Taxi-Quebec",
      title: "Different vehicles for your comfort and safety",
      viewMore: "View more",
      sedan: "Standard Sedan",
      sedanDesc: "Comfortable for everyday travel.",
      suv: "Executive SUV",
      suvDesc: "Spacious for business or groups.",
      van: "Family Van",
      vanDesc: "Ideal for families or group outings."
    },
    aboutUs: {
      title: "We are reimagining mobility with every smooth ride.",
      description: "Built for speed, safety, and simplicity, our platform connects riders with trusted drivers in seconds.",
      cta: "About us",
      bookingTitle: "Fast & easy booking",
      bookingDesc: "Reserve your ride in moments with just a few quick taps — easy, speedy, and stress-free.",
      trackingTitle: "Live tracking",
      trackingDesc: "Know exactly where your driver is and when they'll arrive — real-time updates, every time.",
      driversTitle: "Trusted drivers",
      driversDesc: "All our drivers are thoroughly background-checked, and ready to get you there safely."
    },
    footer: {
      headline: "Your trusted partner for safe, reliable, and on-demand city rides.",
      contactUs: "Contact us",
      subscribeTitle: "Subscribe to be in touch with latest news.",
      emailPlaceholder: "Email address*",
      subscribeButton: "Subscribe",
      rights: "© Taxi Québec. All rights reserved.",
      aboutUs: "About us",
      pricing: "Pricing",
      reviews: "Reviews",
      services: "Services",
      drivers: "Drivers",
      taxi: "Taxi"
    }
  },
  fr: {
    nav: {
        home: "Accueil",
        book: "Réserver",
        contact: "Contact",
        cta: "Réservez maintenant",
        myAccount: "Mon compte"
      },
      hero: {
        title: "Taxi Québec – Service fiable à Québec 24/7 !",
        description: "Chauffeurs professionnels et transport sécurisé. Réservez en ligne ou appelez-nous pour une prise en charge rapide.",
        callDirect: "Appel direct",
        pickupPlaceholder: "Entrez votre lieu de départ",
          bookButton: "Réserver",
          dropoffPlaceholder: "Entrez votre destination",
          outsideQuebecError: "Désolé, nous offrons nos services uniquement dans la région de Québec.",
          carOptions: {
            standard: "Standard",
            comfort: "Confort",
            van: "Van"
          },
          dateTime: {
            date: "Date",
            time: "Heure"
          },
          modal: {
          title: "Réservez votre course",
          description: "Veuillez entrer vos coordonnées et nous vous contacterons sous peu.",
          name: "Nom complet",
          phone: "Numéro de téléphone",
          email: "Adresse courriel",
          submit: "Confirmer la réservation",
          success: "Un représentant vous contactera par téléphone, merci."
        }
      },
    services: {
      title: "Nos services",
      immediateTaxi: "TAXI 24/7",
      immediateTaxiSub: "URBAIN & LOCAL",
      immediateTaxiDesc: "Service de taxi immédiat partout à Québec, jour et nuit.",
      airport: "NAVETTE AÉROPORT",
      airportSub: "YQB JEAN-LESAGE",
      airportDesc: "Transferts directs et ponctuels vers l'aéroport Jean-Lesage.",
      assistance: "DÉVERROUILLAGE — 50$",
      assistanceSub: "ASSISTANCE ROUTIÈRE",
      assistanceDesc: "Service de déverrouillage professionnel et survoltage de batterie.",
      specialized: "TRANSPORT ADAPTÉ",
      specializedSub: "ACCESSIBILITY",
      specializedDesc: "Véhicules équipés pour fauteuils roulants et besoins spécifiques.",
      delivery: "LIVRAISON COLIS",
      deliverySub: "SERVICE EXPRESS",
      deliveryDesc: "Livraison rapide de documents et colis sur tout le territoire.",
      corporate: "COMPTE PRIVILÈGE",
      corporateSub: "CORPORATIF",
      corporateDesc: "Solutions de transport pour entreprises avec facturation mensuelle.",
      bookNow: "RÉSERVER",
      needTaxi: "BESOIN D'UN TAXI IMMÉDIAT ?"
    },
    whyChooseUs: {
      badge: "Pourquoi choisir Taxi-Québec ?",
        title: "Un chauffeur à proximité en quelques minutes.",
      safe: "Fiable & Sécurisé",
      payments: "Paiements Faciles",
      availability: "Disponible 24/7",
      getStarted: "Commencer"
    },
    carRentals: {
      badge: "Besoin d'une voiture ? Louez avec Taxi-Québec",
      title: "Différents véhicules pour votre confort et votre sécurité",
      viewMore: "Voir plus",
      sedan: "Berline Standard",
      sedanDesc: "Confortable pour vos déplacements quotidiens.",
      suv: "VUS Exécutif",
      suvDesc: "Spacieux pour les affaires ou les groupes.",
      van: "Fourgonnette Familiale",
      vanDesc: "Idéal pour les familles ou les sorties de groupe."
    },
    aboutUs: {
      title: "Nous réimaginons la mobilité avec chaque trajet.",
      description: "Conçue pour la rapidité et la sécurité, notre plateforme vous connecte à des chauffeurs de confiance.",
      cta: "À propos",
      bookingTitle: "Réservation rapide",
      bookingDesc: "Réservez votre trajet en quelques instants — simple, rapide et sans stress.",
      trackingTitle: "Suivi en direct",
      trackingDesc: "Sachez exactement où se trouve votre chauffeur et quand il arrivera.",
      driversTitle: "Chauffeurs de confiance",
      driversDesc: "Tous nos chauffeurs font l'objet d'une vérification approfondie des antécédents."
    },
    footer: {
      headline: "Votre partenaire de confiance pour des trajets sûrs et fiables.",
      contactUs: "Contactez-nous",
      subscribeTitle: "Abonnez-vous pour rester informé des dernières nouvelles.",
      emailPlaceholder: "Adresse courriel*",
      subscribeButton: "S'abonner",
      rights: "© Taxi Québec. Tous droits réservés.",
      aboutUs: "À propos",
      pricing: "Tarification",
      reviews: "Avis",
      services: "Services",
      drivers: "Chauffeurs",
      taxi: "Taxi"
    }
  }
};
