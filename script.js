document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navCenter = document.querySelector('.nav-center');

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navCenter.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navCenter.contains(e.target)) {
            navToggle.setAttribute('aria-expanded', 'false');
            navCenter.classList.remove('show');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking a link
                navToggle.setAttribute('aria-expanded', 'false');
                navCenter.classList.remove('show');
            }
        });
    });

    // Add scroll event listener for header
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add counter animation for loan amounts
    const loanAmount = document.querySelector('.term-item:first-child p');
    if (loanAmount) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loanAmount.style.opacity = '1';
                    loanAmount.style.transform = 'translateY(0)';
                }
            });
        });
        observer.observe(loanAmount);
    }

    // Language Switcher
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageOptions = document.querySelectorAll('.language-dropdown a');
    let currentLang = 'de';

    // Translations object
    const translations = {
        en: {
            // Navigation
            'nav.about': 'About Us',
            'nav.services': 'Services',
            'nav.terms': 'Terms',
            'nav.process': 'Process',
            'nav.contact': 'Contact',
            
            // Hero Section
            'hero.title': 'Private Cash Loans with Discretion & Speed',
            'hero.subtitle': 'Fast, confidential, and hassle-free lending solutions',
            'hero.cta': 'Get Started',
            
            // Welcome Section
            'welcome.title': 'About Us',
            'welcome.description': 'At BridgeLine Lending, we specialize in providing private, in-person cash loans with fast turnaround and full confidentiality. Whether you need emergency funds, short-term capital, or flexible financing without the bank hassle — we\'re here to help.',
            
            // Services Section
            'services.title': 'What We Offer',
            'services.personal.title': 'Private Personal Loans',
            'services.personal.cash': 'Cash-in-hand',
            'services.personal.mailing': 'Cash Mailing',
            'services.approval.title': 'Fast Approval',
            'services.approval.time': 'Same-Day or Next-Day',
            'services.credit.title': 'No Credit Check',
            'services.credit.note': 'In most cases',
            'services.terms.title': 'Simple Terms',
            'services.terms.flexible': 'Flexible Repayment Options',
            
            // Why Choose Us Section
            'why.title': 'Why Choose Us?',
            'why.cash.title': 'Cash Loans When You Need It Most',
            'why.cash.desc': 'Quick access to funds when you need them most, without the traditional banking delays.',
            'why.speed.title': 'No Banks',
            'why.speed.subtitle': 'No Delays',
            'why.speed.desc': 'Skip the lengthy bank processes and get your loan approved quickly and efficiently.',
            'why.privacy.title': 'Discreet & Professional',
            'why.privacy.desc': 'Your privacy is our priority. All transactions are handled with the utmost confidentiality.',
            'why.people.title': 'Real People & Real Help',
            'why.people.desc': 'We\'ve helped hundreds of clients get back on track with direct, personal lending options that suit real-life situations.',
            
            // Terms Section
            'terms.title': 'Loan Terms',
            'terms.amount.title': 'Loan Amounts',
            'terms.amount.range': '€500 – €10,000+',
            'terms.repayment.title': 'Repayment',
            'terms.repayment.options': 'Weekly or Monthly Options',
            'terms.id.title': 'Identification',
            'terms.id.required': 'Valid ID Required',
            'terms.application.title': 'Application',
            'terms.application.process': 'Simple Interview or Form',
            
            // Process Section
            'process.title': 'How It Works',
            'process.step1.title': 'Apply Online or Contact Us',
            'process.step2.title': 'Quick Review',
            'process.step2.note': 'No Hard Credit Checks',
            'process.step3.title': 'Meet In Person',
            'process.step3.delivery': 'Approval & Cash Delivery',
            'process.step3.mailing': 'Direct Cash Mailing',
            'process.step4.title': 'Sign Simple Agreement',
            'process.step5.title': 'Leave with Your Loan',
            'process.step5.note': 'It\'s That Easy',
            
            // Contact Section
            'contact.title': 'Contact Us',
            'contact.phone.title': 'Call/Text',
            'contact.phone.number': '+44 7400 000 000',
            'contact.email.title': 'Email',
            'contact.email.address': 'info@bridgelinelending.com',
            'contact.location.title': 'Location',
            'contact.location.area': 'Available in Europe',
            'contact.location.note': 'Available by Appointment',
            
            // Footer
            'footer.logo': 'BridgeLine Lending',
            'footer.services': 'Private Lending Services | © 2015',
            'footer.disclaimer': 'All loans are subject to terms and verification. We comply with all applicable local lending laws.',
            
            // WhatsApp
            'whatsapp.tooltip': 'Chat with us'
        },
        de: {
            // Navigation
            'nav.about': 'Über Uns',
            'nav.services': 'Dienstleistungen',
            'nav.terms': 'Konditionen',
            'nav.process': 'Prozess',
            'nav.contact': 'Kontakt',
            
            // Hero Section
            'hero.title': 'Private Barkredite mit Diskretion & Geschwindigkeit',
            'hero.subtitle': 'Schnelle, vertrauliche und unkomplizierte Kreditlösungen',
            'hero.cta': 'Jetzt Starten',
            
            // Welcome Section
            'welcome.title': 'Über Uns',
            'welcome.description': 'Bei BridgeLine Lending sind wir spezialisiert auf private, persönliche Barkredite mit schneller Bearbeitung und vollständiger Vertraulichkeit. Ob Sie Notfallmittel, kurzfristiges Kapital oder flexible Finanzierung ohne Bankstress benötigen — wir sind für Sie da.',
            
            // Services Section
            'services.title': 'Unsere Angebote',
            'services.personal.title': 'Private Kredite',
            'services.personal.cash': 'Bargeld vor Ort',
            'services.personal.mailing': 'Bargeld per Post',
            'services.approval.title': 'Schnelle Genehmigung',
            'services.approval.time': 'Am selben oder nächsten Tag',
            'services.credit.title': 'Keine Bonitätsprüfung',
            'services.credit.note': 'In den meisten Fällen',
            'services.terms.title': 'Einfache Konditionen',
            'services.terms.flexible': 'Flexible Rückzahlungsoptionen',
            
            // Why Choose Us Section
            'why.title': 'Warum uns wählen?',
            'why.cash.title': 'Barkredite wenn Sie sie am meisten brauchen',
            'why.cash.desc': 'Schneller Zugang zu Mitteln, wenn Sie sie am dringendsten benötigen, ohne die üblichen Bankverzögerungen.',
            'why.speed.title': 'Keine Banken',
            'why.speed.subtitle': 'Keine Verzögerungen',
            'why.speed.desc': 'Überspringen Sie die langwierigen Bankprozesse und erhalten Sie Ihren Kredit schnell und effizient.',
            'why.privacy.title': 'Diskret & Professionell',
            'why.privacy.desc': 'Ihre Privatsphäre hat Priorität. Alle Transaktionen werden mit größter Vertraulichkeit behandelt.',
            'why.people.title': 'Echte Menschen & Echte Hilfe',
            'why.people.desc': 'Wir haben Hunderten von Kunden geholfen, mit direkten, persönlichen Kreditoptionen, die zu realen Lebenssituationen passen.',
            
            // Terms Section
            'terms.title': 'Kreditkonditionen',
            'terms.amount.title': 'Kredithöhe',
            'terms.amount.range': '€500 – €10.000+',
            'terms.repayment.title': 'Rückzahlung',
            'terms.repayment.options': 'Wöchentliche oder monatliche Optionen',
            'terms.id.title': 'Identifikation',
            'terms.id.required': 'Gültiger Ausweis erforderlich',
            'terms.application.title': 'Antrag',
            'terms.application.process': 'Einfaches Gespräch oder Formular',
            
            // Process Section
            'process.title': 'So funktioniert\'s',
            'process.step1.title': 'Online bewerben oder uns kontaktieren',
            'process.step2.title': 'Schnelle Prüfung',
            'process.step2.note': 'Keine harte Bonitätsprüfung',
            'process.step3.title': 'Persönliches Treffen',
            'process.step3.delivery': 'Genehmigung & Bargeldauszahlung',
            'process.step3.mailing': 'Direkte Bargeldzustellung',
            'process.step4.title': 'Einfache Vereinbarung unterschreiben',
            'process.step5.title': 'Mit Ihrem Kredit gehen',
            'process.step5.note': 'So einfach ist das',
            
            // Contact Section
            'contact.title': 'Kontakt',
            'contact.phone.title': 'Anrufen/Texten',
            'contact.phone.number': '+44 7400 000 000',
            'contact.email.title': 'E-Mail',
            'contact.email.address': 'info@bridgelinelending.com',
            'contact.location.title': 'Standort',
            'contact.location.area': 'Verfügbar in Europa',
            'contact.location.note': 'Nach Vereinbarung verfügbar',
            
            // Footer
            'footer.logo': 'BridgeLine Lending',
            'footer.services': 'Private Kreditdienstleistungen | © 2015',
            'footer.disclaimer': 'Alle Kredite unterliegen den Bedingungen und der Verifizierung. Wir halten uns an alle geltenden lokalen Kreditgesetze.',
            
            // WhatsApp
            'whatsapp.tooltip': 'Chatten Sie mit uns'
        }
    };

    // Toggle language dropdown
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!languageBtn.contains(e.target)) {
            languageDropdown.classList.remove('show');
        }
    });

    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.dataset.lang;
            if (lang !== currentLang) {
                currentLang = lang;
                updateLanguage(lang);
                languageOptions.forEach(opt => opt.classList.remove('active'));
                e.target.classList.add('active');
                languageBtn.querySelector('span').textContent = lang.toUpperCase();
                languageDropdown.classList.remove('show');
            }
        });
    });

    // Update page content based on selected language
    function updateLanguage(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Store language preference
        localStorage.setItem('preferredLanguage', lang);
    }

    // Initialize language based on stored preference
    function initializeLanguage() {
        const storedLang = localStorage.getItem('preferredLanguage');
        const initialLang = storedLang || 'de'; // Default to German if no stored preference
        
        currentLang = initialLang;
        updateLanguage(initialLang);
        languageBtn.querySelector('span').textContent = initialLang.toUpperCase();
        languageOptions.forEach(opt => {
            if (opt.dataset.lang === initialLang) {
                opt.classList.add('active');
            }
        });
    }

    // Initialize language when page loads
    initializeLanguage();
}); 