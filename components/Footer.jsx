import Link from 'next/link';
import { Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-50 text-gray-800 mt-20 border-t">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-[#E7F0FA] p-2 rounded-lg group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="h-6 w-6 text-[#1A79CE]" />
            </div>
            <span className="text-xl font-bold text-slate-900">EduPortal</span>
          </Link>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your gateway to world-class education. Discover, explore, and apply
            to top universities around the globe.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/colleges" className="hover:text-blue-600">
                Colleges
              </Link>
            </li>
            <li>
              <Link href="/admission" className="hover:text-blue-600">
                Admission
              </Link>
            </li>
            <li>
              <Link href="/my-college" className="hover:text-blue-600">
                My College
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-600 cursor-pointer">
              College Search
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              Application Support
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              Student Reviews
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              Research Database
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              info@eduportal.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              123 Education St, Learning City
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-blue-100 text-center py-4 text-sm text-gray-700 px-4">
        © 2024 EduPortal. All rights reserved. |{' '}
        <Link href="/privacy" className="hover:text-blue-600">
          Privacy Policy
        </Link>{' '}
        |{' '}
        <Link href="/terms" className="hover:text-blue-600">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
