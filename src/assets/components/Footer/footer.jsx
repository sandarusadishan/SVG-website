// eslint-disable-next-line react-refresh/only-export-components
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
