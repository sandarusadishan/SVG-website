import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useInView, animate, useMotionValue, useTransform } from "framer-motion";
import { 
    Mail, 
    Phone, 
    MapPin, 
    Send, 
    Loader, 
    Check, 
    AlertTriangle,
    ChevronDown,
    ArrowRight,
    Users,
    Code,
    Shield,
    Menu,
    X,
    Laptop,
    Cloud,
    Github,
    Linkedin,
    Twitter,
    Brain,
    CheckCircle,
    MessageSquare,
    Facebook,
    Zap,
    Layers,
    Cpu,
    ShoppingCart,
    UtensilsCrossed,
    ConciergeBell,
    Banknote,
    GraduationCap,
    HeartPulse
} from "lucide-react";
import emailjs from '@emailjs/browser';

// --- Custom Components ---

const AuroraBackground = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (event) => setMousePos({ x: event.clientX, y: event.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    return (
        <div
            className="pointer-events-none fixed inset-0 z-[-1] transition duration-300"
            style={{ background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.15), transparent 80%)` }}
        />
    );
};

const AnimatedCounter = ({ to, suffix, className }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            animate(count, to, { duration: 2, ease: "easeOut" });
        }
    }, [isInView, to, count]);

    return (
        <div ref={ref} className={`text-5xl lg:text-6xl font-bold mb-2 ${className}`}>
            <motion.span>{rounded}</motion.span>
            {suffix}
        </div>
    );
};

const ChatbotIcon = () => {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
            onClick={() => alert("Chatbot opened!")}
        >
            <MessageSquare className="w-8 h-8 text-white" />
        </motion.button>
    );
};

const SeamlessScrollingLogos = ({ items, renderItem, duration = 40, reverse = false }) => {
    const extendedItems = [...items, ...items];

    return (
        <div className="w-full overflow-hidden relative" style={{ maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)" }}>
            <motion.div
                className="flex items-center"
                animate={{
                    x: reverse ? [0, -(items[0]?.width || 150) * items.length] : [-(items[0]?.width || 150) * items.length, 0],
                }}
                transition={{
                    ease: 'linear',
                    duration: duration,
                    repeat: Infinity,
                }}
            >
                {extendedItems.map((item, index) => (
                    <div key={index} className="flex-shrink-0 px-8" style={{ width: `${item.width}px` }}>
                        {renderItem(item)}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

// --- Page Sections ---

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
                setIsVisible(false); // Hide on scroll down
            } else {
                setIsVisible(true); // Show on scroll up
            }
            lastScrollY.current = currentScrollY;
            setIsSticky(window.scrollY > 50);
        };

        const handleMouseMove = (e) => {
            if (e.clientY < 80) {
                setIsVisible(true); // Show if mouse is at the top
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "Product", href: "#product" },
        { name: "Solutions", href: "#solutions" },
        { name: "Services", href: "#services" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Contact", href: "#contact" },
        { name: "Agents", href: "#agents" },
    ];

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed w-full z-40 transition-all duration-300 ${isSticky ? "bg-slate-950/70 backdrop-blur-lg shadow-lg py-3" : "bg-transparent py-5"}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <a href="#home" className="flex items-center space-x-2">
                    <img src="/background/logo.png" alt="SoftVision IT Logo" className="h-16 w-auto" />
                    <span className="text-white font-bold text-2xl">SOFTVISION IT GROUP</span>
                </a>
                <div className="hidden md:flex space-x-6 items-center">
                    {navLinks.map((item) => (
                        <a key={item.name} href={item.href} className="text-slate-300 hover:text-blue-400 transition-colors text-lg font-medium">{item.name}</a>
                    ))}
                    <a 
                        href="https://wa.me/+94714318753" // Change to your company WhatsApp number
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-green-400 hover:text-green-300 transition-colors"
                        title="Chat on WhatsApp"
                    >
                        <MessageSquare className="w-8 h-8"/>
                    </a>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white"><AnimatePresence mode="wait">{isOpen ? <X key="x" className="w-8 h-8" /> : <Menu key="menu" className="w-8 h-8" />}</AnimatePresence></button>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden">
                        <div className="flex flex-col items-center space-y-4 py-4 bg-slate-900/95 backdrop-blur-lg">
                            {navLinks.map((item) => (
                                <a key={item.name} href={item.href} className="text-slate-300 hover:text-blue-400 text-xl py-2" onClick={() => setIsOpen(false)}>{item.name}</a>
                            ))}
                            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-full mt-4">Get a Quote</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

const HeroSection = () => {
    const GradientText = ({ children }) => (
        <motion.span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)", backgroundSize: "200% 200%" }}
            animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
            transition={{ duration: 5, ease: "linear", repeat: Infinity }}
        >
            {children}
        </motion.span>
    );

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center text-white pt-20 pb-12 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src="/background/Science and Technology.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950"></div>
            </div>
            <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg">
                    <GradientText>Innovating for a Digital World</GradientText>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto mb-10">
                    From our flagship accounting software <span className="text-blue-400 font-semibold">BUSY</span> to custom enterprise solutions, we architect the future of business technology.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col sm:flex-row gap-6 justify-center">
                    <a href="#product" className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-1 inline-flex items-center justify-center">Explore BUSY <ArrowRight className="inline-block ml-2 w-5 h-5" /></a>
                    <a href="#contact" className="flex items-center justify-center bg-slate-800/50 border border-slate-700 text-slate-300 px-8 py-3 rounded-full text-lg font-semibold hover:bg-slate-800/80 hover:text-white transition-all duration-300 transform hover:-translate-y-1">Contact Sales</a>
                </motion.div>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
                <ChevronDown className="w-10 h-10 text-blue-400/70" />
            </div>
        </section>
    );
};

const CustomerLogos = () => {
    const logos = [
        { name: 'Customer 1', path: '/background/customers/Maharaja-Food.jpg', width: 150 },
        { name: 'Customer 2', path: '/background/customers/ministry-of-com.jpg', width: 200 },
        { name: 'Customer 3', path: '/background/customers/Rhino.jpg', width: 150 },
        { name: 'Customer 4', path: '/background/customers/Premium-Auto-Parts.jpg', width: 200 },
        { name: 'Customer 5', path: '/background/customers/PMB.jpg', width: 150 },
        { name: 'Customer 6', path: '/background/customers/Zeenath-Trading.jpg', width: 200 },
        { name: 'Customer 7', path: '/background/customers/DP-packaging.jpg', width: 150 },
        { name: 'Customer 8', path: '/background/customers/CAS.jpg', width: 150 },
    ];

    const renderLogo = (logo) => (
        <img src={logo.path} alt={logo.name} className="h-16 w-auto max-w-none transition-transform duration-300 hover:scale-110 grayscale hover:grayscale-0 opacity-70 hover:opacity-100" />
    );

    return (
        <section id="customers" className="py-16 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-2xl text-slate-400 mb-12">Trusted by Leading Enterprises</h2>
                <SeamlessScrollingLogos items={logos} duration={50} renderItem={renderLogo} />
            </div>
        </section>
    );
};

const BusySoftwareSection = () => {
    const features = [
        "Comprehensive Financial Accounting",
        "Multi-Location Inventory Management",
        "GST & VAT Reports",
        "Powerful Reporting & MIS",
        "Mobile App for Business on-the-go"
    ];

    return (
        <section id="product" className="py-20 lg:py-28 bg-white text-slate-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <h3 className="text-2xl font-bold text-blue-600 mb-2">BUSY Accounting Software – Now on Cloud</h3>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">The Complete Business Management Solution</h2>
                        {/* MODIFIED: Updated description to include server information */}
                        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                            BUSY is our flagship product, a powerful and integrated business accounting software for MSMEs. With over 3,000,000 users, it is a leading solution deployable on premier cloud platforms like <b className="text-slate-700">AWS, Google Cloud, and Azure,</b> or on your own <b className="text-slate-700">private open servers.</b>
                        </p>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.15 }} className="space-y-4 mb-10">
                            {features.map(feature => (
                                <motion.div key={feature} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 }}} className="flex items-center">
                                    <Check className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" />
                                    <span className="text-slate-700 text-lg">{feature}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                        <a href="#contact" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 inline-block">Request a Demo</a>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="flex justify-center items-center">
                        <div className="bg-slate-100 p-8 rounded-3xl shadow-2xl backdrop-blur-sm border border-slate-200/50 hover:scale-105 transition-transform duration-300">
                            <motion.div
                                animate={{ y: ["0px", "-8px", "0px"] }}
                                transition={{
                                    duration: 3,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                }}
                            >
                                <img src="/background/busy.jpeg" alt="BUSY Software Logo" className="w-64 h-auto" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const SpecializedSolutionsSection = () => {
    const solutions = [
        { icon: <ShoppingCart className="w-10 h-10" />, title: "POS Systems", description: "Advanced Point-of-Sale solutions, available for both web and standalone local deployment.", color: "text-green-400" },
        { icon: <UtensilsCrossed className="w-10 h-10" />, title: "Restaurant Management", description: "Streamline your F&B operations from order taking to kitchen management and billing.", color: "text-orange-400" },
        { icon: <ConciergeBell className="w-10 h-10" />, title: "Hotel Management", description: "All-in-one platform for hotels to manage reservations, front-desk, and guest services.", color: "text-cyan-400" },
        { icon: <HeartPulse  className="w-10 h-10" />, title: "Hospital Management", description: "Comprehensive EMR and hospital administration software for patient care, billing, and operations.", color: "text-red-400" },
        { icon: <Banknote className="w-10 h-10" />, title: "Payroll Management", description: "Automate salary processing, tax compliance, and employee records with our robust payroll software.", color: "text-purple-400" },
        { icon: <GraduationCap className="w-10 h-10" />, title: "Student Management", description: "Integrated systems for academic institutions to manage student data, admissions, and records.", color: "text-yellow-400" },
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section id="solutions" className="py-20 lg:py-28 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">Industry-Specific Solutions</h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">Tailored software to meet the unique demands of your business sector.</p>
                </motion.div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ staggerChildren: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {solutions.map((solution) => (
                        <motion.div key={solution.title} variants={cardVariants} className="group bg-slate-800/50 border border-slate-700/60 rounded-2xl p-8 text-center flex flex-col items-center transition-all duration-300 hover:bg-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                            <div className={`mb-6 p-4 bg-slate-900 rounded-full transition-colors duration-300 ${solution.color} group-hover:text-blue-600`}>{solution.icon}</div>
                            <h3 className="text-2xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-slate-900">{solution.title}</h3>
                            <p className="text-slate-400 leading-relaxed transition-colors duration-300 group-hover:text-slate-600">{solution.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const ServicesSection = () => {
    const [hoveredService, setHoveredService] = useState(null);
    // MODIFIED: Updated Cloud & DevOps service details
    const services = [
      { icon: <Code className="w-8 h-8" />, title: "Software Development", description: "End-to-end software solutions tailored to your business needs.", features: ["React/Vue/Angular", "Node.js/Python", "Microservices", "API Development"], color: "from-blue-500 to-blue-600" },
      { icon: <Cloud className="w-8 h-8" />, title: "Cloud & DevOps", description: "Scalable solutions on AWS, Azure, Google Cloud, and private open servers.", features: ["AWS, Azure & Google Cloud", "On-Premise & Open Servers", "CI/CD & DevOps Automation", "Kubernetes & Docker"], color: "from-purple-500 to-purple-600" },
      { icon: <Brain className="w-8 h-8" />, title: "AI & Machine Learning", description: "Intelligent systems that learn and adapt to transform your business.", features: ["Deep Learning", "NLP", "Computer Vision", "Predictive Analytics"], color: "from-green-500 to-green-600" },
      { icon: <Laptop className="w-8 h-8" />, title: "Web & Mobile Apps", description: "Cross-platform applications that deliver exceptional user experiences.", features: ["React Native", "Flutter", "PWA", "UX/UI Design"], color: "from-orange-500 to-orange-600" },
      { icon: <Shield className="w-8 h-8" />, title: "Cybersecurity", description: "Comprehensive security solutions to protect your digital assets.", features: ["Penetration Testing", "Security Audits", "Compliance", "Threat Monitoring"], color: "from-red-500 to-red-600" },
      { icon: <Users className="w-8 h-8" />, title: "IT Consulting", description: "Expert guidance on technology strategy and digital transformation.", features: ["Architecture Review", "Tech Strategy", "Code Audits", "Team Training"], color: "from-teal-500 to-teal-600" },
    ];

    return (
        <section id="services" className="py-20 lg:py-28 relative bg-gray-900">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold gradient-text-primary mb-4">Our Custom Services</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Beyond our products, we offer a full suite of services to build your digital future.</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} key={index} className="group glass-card hover-lift hover-glow relative overflow-hidden" onMouseEnter={() => setHoveredService(index)} onMouseLeave={() => setHoveredService(null)}>
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                            <div className="relative z-10">
                                <div className="mb-6 group-hover:scale-110 transition-transform duration-300 text-primary">{service.icon}</div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                                <div className={`space-y-2 transition-all duration-500 ${hoveredService === index ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'} overflow-hidden`}>
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center text-sm text-muted-foreground"><CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" /><span>{feature}</span></div>
                                    ))}
                                </div>
                                <button className="mt-6 text-slate-300 group-hover:text-primary p-0 flex items-center">Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TechnologyLogos = () => {
    // MODIFIED: Added AWS, Google Cloud, and Azure logos
    const technologies = [
        { name: 'React', path: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', width: 120 },
        { name: 'AWS', path: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', width: 150 },
        { name: 'Google Cloud', path: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', width: 120 },
        { name: 'Azure', path: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', width: 120 },
        { name: 'Java', path: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', width: 120 },
        { name: 'PHP', path: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', width: 120 },
        { name: 'Node.js', path: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', width: 120 },
        { name: '.NET', path: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg', width: 120 },
        { name: 'Python', path: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', width: 120 },
        { name: 'Angular', path: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg', width: 120 },
        { name: 'MySQL', path: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg', width: 150 },
        { name: 'MongoDB', path: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', width: 120 },
        { name: 'Firebase', path: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', width: 120 },
    ];

    const renderLogo = (logo) => ( <img src={logo.path} alt={logo.name} className="h-12 w-auto max-w-none transition-transform duration-300 hover:scale-110" /> );

    return (
        <section id="technologies" className="py-16 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-2xl text-slate-400 mb-12">Technologies We Master</h2>
                <SeamlessScrollingLogos items={technologies} duration={40} reverse={true} renderItem={renderLogo} />
            </div>
        </section>
    );
};

const TestimonialsSection = () => {
    const testimonials = [
        { name: "Miss.Trinki", company: "TechCorp", text: "SoftVision IT transformed our operations. Their team is professional, skilled, and delivered beyond our expectations.", photo: "/background/clients/MOmeow1_square.avif" },
        { name: "Jane Smith", company: "Innovate Inc.", text: "The cloud infrastructure they built for us is robust and scalable. We couldn't be happier with the results and the support.", photo: "/background/clients/Cat6-800x800.jpg" },
        { name: "Peter Jones", company: "DataDriven LLC", text: "Their data analytics services provided us with invaluable insights, directly contributing to our business growth.", photo: "/background/clients/a252bcd6-9a10-40be-bf99-1d850d2026e4.avif" },
        { name: "Samantha Lee", company: "NextGen Solutions", text: "An incredible partner to work with. Their attention to detail and innovative approach is second to none.", photo: "/background/clients/8eb880ee-204b-4bc7-a7ae-101c8b157203.avif" },
    ];

    const renderTestimonial = (testimonial) => (
        <div className="group bg-slate-50 border border-slate-200 p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-xl hover:bg-blue-900 hover:text-white">
            <p className="text-slate-700 mb-6 italic group-hover:text-slate-200">"{testimonial.text}"</p>
            <div className="flex items-center">
                <img src={testimonial.photo} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                    <h4 className="text-slate-900 font-bold group-hover:text-white">{testimonial.name}</h4>
                    <p className="text-slate-500 group-hover:text-slate-300">{testimonial.company}</p>
                </div>
            </div>
        </div>
    );

    return (
        <section id="testimonials" className="py-20 lg:py-28 bg-white text-slate-800">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">What Our Clients Say</h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">We're proud to have earned the trust of our clients.</p>
                </motion.div>
                <SeamlessScrollingLogos items={testimonials.map(t => ({...t, width: 400}))} renderItem={renderTestimonial} duration={60} />
            </div>
        </section>
    );
};

// ADDED: A new modal component for the success message
const SuccessModal = ({ onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl text-center max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                    <Check className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Message Sent!</h3>
                <p className="text-slate-600 mb-8">Your message sent successfully. We will get back to you soon.</p>
                <button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-0.5"
                >
                    Close
                </button>
            </motion.div>
        </motion.div>
    );
};

const ContactSection = () => {
    const [status, setStatus] = useState({ submitting: false, error: false, message: '' });
    // CHANGED: State to control the new success modal visibility
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setStatus({ submitting: true, error: false, message: '' });

        const form = event.target;
        const templateParams = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value,
        };

        const serviceID = 'service_760nrad';
        const templateIDToCompany = 'template_qlbvzum';
        const templateIDToCustomer = 'template_87fcm78';
        const publicKey = 'p6uoW575AKT5hjL4J';

        emailjs.send(serviceID, templateIDToCompany, templateParams, publicKey)
            .then(() => emailjs.send(serviceID, templateIDToCustomer, templateParams, publicKey))
            .then(() => {
                setStatus({ submitting: false, error: false, message: '' });
                setShowSuccessModal(true); // Show the success modal
                form.reset();
            })
            .catch((err) => {
                console.error('EmailJS error:', err);
                setStatus({ submitting: false, error: true, message: 'Failed to send message. Please try again later.' });
            });
    };
    
    const ErrorNotification = ({ message }) => (
        <motion.div
            layout
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="flex items-center gap-3 p-3 mt-4 rounded-lg text-sm font-medium bg-red-100 text-red-800"
        >
            <AlertTriangle className="w-5 h-5" />
            <span>{message}</span>
        </motion.div>
    );

    const contactInfo = [
        { icon: <Mail />, title: "Email", value: "info@svg.lk", href: "mailto:info@svg.lk" },
        { icon: <Phone />, title: "Phone", value: "+94 777 123 456", href: "tel:+94777123456" },
        { icon: <MapPin />, title: "Address", value: "414/7-1/1, Baseline Road, Colombo-09, Sri Lanka", href: "#" },
    ];

    return (
        <>
            <section id="contact" className="py-20 lg:py-28 bg-white text-slate-800">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Let's Build Together</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">Have a project in mind? We'd love to hear from you.</p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm">
                            <h3 className="text-3xl font-bold text-slate-900 mb-6">Send us a Message</h3>
                            <form className="space-y-6" onSubmit={handleFormSubmit}>
                                <div className="relative">
                                    <input name="name" type="text" placeholder=" " required className="peer w-full bg-white text-slate-900 p-4 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                    <label className="absolute left-4 top-4 text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-slate-50 peer-focus:px-1 peer-[:not(placeholder-shown)]:-top-2.5 peer-[:not(placeholder-shown)]:left-3 peer-[:not(placeholder-shown)]:text-xs peer-[:not(placeholder-shown)]:bg-slate-50 peer-[:not(placeholder-shown)]:px-1">Your Name</label>
                                </div>
                                <div className="relative">
                                    <input name="email" type="email" placeholder=" " required className="peer w-full bg-white text-slate-900 p-4 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                    <label className="absolute left-4 top-4 text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-slate-50 peer-focus:px-1 peer-[:not(placeholder-shown)]:-top-2.5 peer-[:not(placeholder-shown)]:left-3 peer-[:not(placeholder-shown)]:text-xs peer-[:not(placeholder-shown)]:bg-slate-50 peer-[:not(placeholder-shown)]:px-1">Your Email</label>
                                </div>
                                <div className="relative">
                                    <textarea name="message" placeholder=" " rows="5" required className="peer w-full bg-white text-slate-900 p-4 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"></textarea>
                                    <label className="absolute left-4 top-4 text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-slate-50 peer-focus:px-1 peer-[:not(placeholder-shown)]:-top-2.5 peer-[:not(placeholder-shown)]:left-3 peer-[:not(placeholder-shown)]:text-xs peer-[:not(placeholder-shown)]:bg-slate-50 peer-[:not(placeholder-shown)]:px-1">Your Message</label>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={status.submitting}
                                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status.submitting ? (
                                        <><Loader className="animate-spin w-5 h-5" /><span>Sending...</span></>
                                    ) : (
                                        <><Send className="w-5 h-5" /><span>Send Message</span></>
                                    )}
                                </button>
                            </form>
                            <AnimatePresence>
                               {status.error && <ErrorNotification message={status.message} />}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-8">
                            {contactInfo.map((info) => (
                                <motion.div 
                                    key={info.title} 
                                    className="flex items-start gap-5"
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm">
                                        <div className="text-blue-600">{info.icon}</div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900">{info.title}</h4>
                                        <a href={info.href} className="text-lg text-slate-600 hover:text-blue-600 transition-colors">{info.value}</a>
                                    </div>
                                </motion.div>
                            ))}
                             <div className="overflow-hidden rounded-2xl border border-slate-200 h-[300px] w-full mt-8 shadow-md">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.597950293933!2d79.8776332152317!3d6.938781994988086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25916736270b7%3A0x2b63d27f8a7a72a3!2sSoftvision%20Global%20(PVT)%20LTD!5e0!3m2!1sen!2slk!4v1669882223838!5m2!1sen!2slk"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                              </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            <AnimatePresence>
                {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
            </AnimatePresence>
        </>
    );
};

const AgentsSection = () => {
    const [activeAgent, setActiveAgent] = useState(null);

    const agents = [
        { id: 'kandy', name: "M. FAZLY", location: "Kandy", phone: "+94 777 121 412", photo: "/public/background/agents/kandy.jpg", mapPosition: { top: '48%', left: '50%' } },
        { id: 'dambulla', name: "M.N.M. NASRULLAH", location: "Dambulla", phone: "+94 778 303 747", photo: "/public/background/agents/Dambulla.jpg", mapPosition: { top: '40%', left: '55%' } },
        { id: 'eastern', name: "M. ISHAM", location: "Eastern Province", phone: "+94 760 104 111", photo: "/public/background/agents/Batticaloa.jpg", mapPosition: { top: '45%', left: '80%' } },
        { id: 'south', name: "M. HIJAS", location: "Down South", phone: "+94 757 786 786", photo: "/public/background/agents/doun-south1.jpg", mapPosition: { top: '85%', left: '48%' } },
        { id: 'kurunegala', name: "M.A.M. MASFY", location: "Kurunegala", phone: "+94 772 544 420", photo: "/public/background/agents/Kurunegala.jpg", mapPosition: { top: '43%', left: '35%' } },
        { id: 'jaffna', name: "M. MUHUNTHAN", location: "Jaffna", phone: "+94 77 623 1295", photo: "/public/background/agents/Jaffna.jpg", mapPosition: { top: '10%', left: '30%' } },
        { id: 'chilaw', name: "CHAMARA", location: "Chilaw", phone: "+94 772 665 895", photo: "/public/background/agents/Chilaw.jpg", mapPosition: { top: '55%', left: '25%' } },
        { id: 'gampaha', name: "U. SHAFI", location: "Gampaha", phone: "+94 777 736 249", photo: "/public/background/agents/Gampaha.jpg", mapPosition: { top: '68%', left: '30%' } },
    ];
    
    useEffect(() => {
        setActiveAgent(agents[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section id="agents" className="py-20 lg:py-28 bg-slate-950 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-400 mb-4">
                        Our Sales and Service Locations
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        Hover over a location on the map to connect with our expert consultants.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center min-h-[500px]">
                    <motion.div
                        className="relative h-[500px] lg:h-[700] w-full lg:col-span-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                            <motion.div className="relative h-[800px] lg:h-[1100px] w-full lg:col-span-2">
                            <img src="/public/background/new.png" alt="Map of Sri Lanka" className="inset-x-20 relative -top-50 w-full h-full object-contain opacity-30 transform -translate-y-10" />
                            </motion.div>
                        {agents.map((agent) => (
                            <div
                                key={agent.id}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                                style={{ top: agent.mapPosition.top, left: agent.mapPosition.left }}
                                onMouseEnter={() => setActiveAgent(agent)}
                            >
                                <motion.div
                                    className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg"
                                    animate={{ scale: activeAgent?.id === agent.id ? 1.8 : 1 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                >
                                    {activeAgent?.id === agent.id && (
                                        <div className="absolute w-5 h-5 bg-blue-500 rounded-full animate-ping"></div>
                                    )}
                                </motion.div>
                            </div>
                        ))}
                    </motion.div>

                    <div className="relative h-full flex items-center justify-center">
                         <AnimatePresence mode="wait">
                            {activeAgent ? (
                                <motion.div
                                    key={activeAgent.id}
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -30, scale: 0.95 }}
                                    transition={{ duration: 0.35, ease: "easeInOut" }}
                                    className="w-full max-w-sm text-center bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8"
                                >
                                    <motion.img
                                        src={activeAgent.photo}
                                        alt={activeAgent.name}
                                        className="w-32 h-32 rounded-full object-cover mx-auto mb-5 border-4 border-slate-700 shadow-lg"
                                        initial={{scale: 0.5, opacity: 0}}
                                        animate={{scale: 1, opacity: 1}}
                                        transition={{delay: 0.2, type: 'spring', stiffness: 200}}
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/128x128/1e293b/94a3b8?text=Agent'; }}
                                    />
                                    <h3 className="text-2xl font-bold text-white">{activeAgent.name}</h3>
                                    <p className="text-md text-blue-400 uppercase tracking-wider mb-2">{activeAgent.location}</p>
                                    <p className="text-sm text-slate-400 mb-4">SYSTEM CONSULTANT</p>
                                    <a href={`tel:${activeAgent.phone.replace(/\s/g, "")}`} className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                                        <Phone size={20}/>
                                        <span>{activeAgent.phone}</span>
                                    </a>
                                </motion.div>
                            ) : (
                                <div className="text-center text-slate-500">
                                    <MapPin size={48} className="mx-auto mb-4"/>
                                    <p className="text-xl">Hover over a location on the map to view agent details.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    const socialLinks = [
        { name: 'WhatsApp', icon: <MessageSquare />, href: 'https://wa.me/94700000000' },
        { name: 'Facebook', icon: <Facebook />, href: 'https://www.facebook.com/softvisionitgroup' },
        { name: 'X', icon: <Twitter />, href: 'https://x.com' },
        { name: 'LinkedIn', icon: <Linkedin />, href: 'https://www.linkedin.com/company/107529690/admin/dashboard/' },
        { name: 'GitHub', icon: <Github />, href: 'https://github.com' },
    ];

    return (
        <footer className="bg-slate-950 border-t border-slate-800/50">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-5">
                        <div className="flex items-center space-x-2 mb-6">
                            <img src="/background/logo.png" alt="SoftVision IT Logo" className="h-12 w-auto" />
                            <span className="text-white font-bold text-2xl">SOFTVISION IT GROUP (PVT) LTD.</span>
                        </div>
                        <p className="text-slate-400 mb-8 max-w-md">Architecting the future with innovative software and intelligent solutions.</p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="w-12 h-12 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 text-slate-400 hover:text-white transform hover:scale-110">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="text-white font-bold text-lg mb-6">Explore</h4>
                            <div className="space-y-3">
                                {["Home", "Product", "Solutions", "Services", "Agents"].map((link) => (
                                    <a key={link} href={`#${link.toLowerCase()}`} className="block text-slate-400 hover:text-blue-400 transition-colors">{link}</a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg mb-6">Company</h4>
                            <div className="space-y-3">
                                {["Testimonials", "Contact", "Careers"].map((link) => (
                                    <a key={link} href={`#${link.toLowerCase()}`} className="block text-slate-400 hover:text-blue-400 transition-colors">{link}</a>
                                ))}
                            </div>
                        </div>
                         <div>
                            <h4 className="text-white font-bold text-lg mb-6">Legal</h4>
                            <div className="space-y-3">
                                {["Privacy Policy", "Terms of Service"].map((link) => (
                                    <a key={link} href="#" className="block text-slate-400 hover:text-blue-400 transition-colors">{link}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
                    <p>© {new Date().getFullYear()} SoftVision IT Group (Pvt) Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

// --- Main App Component ---
const App = () => {
    return (
        <div className="relative overflow-x-hidden bg-slate-950">
            <AuroraBackground />
            <div className="relative z-10">
                <NavBar />
                <main>
                    <HeroSection />
                    <CustomerLogos />
                    <BusySoftwareSection />
                    <SpecializedSolutionsSection />
                    <ServicesSection />
                    <TechnologyLogos />
                    <TestimonialsSection />
                     <AgentsSection />
                    <ContactSection />
                </main>
                <Footer />
            </div>
            <ChatbotIcon />
        </div>
    );
};

export default App;