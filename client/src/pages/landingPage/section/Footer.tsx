import finexaiLogo from '../../../assets/logo/finexai-logo.png';

const Footer = () => {
    return (
<footer className="bg-black text-gray-300 relative overflow-hidden">
  {/* Background accent */}
  <div className="absolute top-0 left-1/2 w-64 h-64 bg-violet-700/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-blob" />
  
  <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left relative z-10">
    
    {/* About Section */}
    <div>
      {/* <h3 className="text-xl font-bold text-violet-500 mb-4">FinexAI</h3> */}
      <div className="flex items-center gap-2 cursor-pointer">
  <img 
    src={finexaiLogo} 
    alt="FinexAI Logo" 
    className="w-6 h-6 object-contain" 
  />
  <span className="text-xl font-bold text-violet-500">FinexAI</span>
</div>
      <p className="text-gray-400 text-sm">
        AI-powered tools to optimize your finances, investments, and planning.
        Trusted by thousands of users worldwide.
      </p>
    </div>
    
    {/* Quick Links */}
    <div>
      <h3 className="text-xl font-bold text-violet-500 mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li><a href="#features" className="hover:text-violet-400 transition-colors">Features</a></li>
        <li><a href="#pricing" className="hover:text-violet-400 transition-colors">Pricing</a></li>
        <li><a href="#about" className="hover:text-violet-400 transition-colors">About</a></li>
        <li><a href="#contact" className="hover:text-violet-400 transition-colors">Contact</a></li>
      </ul>
    </div>
    
    {/* Contact / Social */}
    <div>
      <h3 className="text-xl font-bold text-violet-500 mb-4">Connect</h3>
      <p className="text-gray-400 text-sm mb-4">Email: <a href="mailto:support@finexai.com" className="hover:text-violet-400 transition-colors">support@finorai.com</a></p>
      <div className="flex justify-center md:justify-start gap-4 text-violet-500">
        <a href="#" className="hover:text-violet-400 transition-colors">Twitter</a>
        <a href="#" className="hover:text-violet-400 transition-colors">LinkedIn</a>
        <a href="#" className="hover:text-violet-400 transition-colors">GitHub</a>
      </div>
    </div>

  </div>

  {/* Bottom copyright */}
  <div className="border-t border-violet-700 mt-6 py-4 text-center text-gray-500 text-sm relative z-10">
    © {new Date().getFullYear()} FinoraAI. All rights reserved.
  </div>
</footer>

    )
}

export default Footer