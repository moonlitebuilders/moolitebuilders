import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home, Sun, Building2, HelpCircle } from 'lucide-react'

export const NotFound: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = "404 - Page Not Found | Moonlite Builders & Promoters"
  }, [])

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(232, 190, 91, 0.4) 0%, rgba(15, 34, 71, 0) 70%)',
        }}
      />

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* 404 Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-sm font-semibold tracking-wide uppercase mb-6">
          <HelpCircle className="w-4 h-4" />
          <span>Error 404</span>
        </div>

        {/* Large 404 Title */}
        <h1 className="text-6xl sm:text-8xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500 mb-4 tracking-tight">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
          The page you are looking for doesn't exist, has been moved, or the link may be broken. Explore our main sections below:
        </p>

        {/* Navigation Quick Links Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
          <Link
            to="/"
            className="group p-4 rounded-xl bg-navy-800/80 border border-navy-700 hover:border-gold-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/10"
          >
            <div className="w-10 h-10 rounded-lg bg-gold-400/10 flex items-center justify-center text-gold-400 mb-3 group-hover:scale-110 transition-transform">
              <Home className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-white text-base group-hover:text-gold-400 transition-colors">
              Home
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Return to main overview
            </p>
          </Link>

          <Link
            to="/services/solar"
            className="group p-4 rounded-xl bg-navy-800/80 border border-navy-700 hover:border-gold-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/10"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-white text-base group-hover:text-gold-400 transition-colors">
              Rooftop Solar
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              MNRE-approved solar setup
            </p>
          </Link>

          <Link
            to="/services/construction"
            className="group p-4 rounded-xl bg-navy-800/80 border border-navy-700 hover:border-gold-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/10"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-white text-base group-hover:text-gold-400 transition-colors">
              Construction
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Residential & commercial
            </p>
          </Link>
        </div>

        {/* Back to Home Main CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-heading font-bold text-navy-950 bg-gradient-to-r from-gold-400 to-amber-400 hover:from-gold-300 hover:to-amber-300 transition-all shadow-lg shadow-gold-400/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
