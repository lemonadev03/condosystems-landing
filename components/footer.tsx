import Link from "next/link"
import { Building2 } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8 text-[#407140]" />
              <span className="text-xl font-bold text-[#407140]">EZ BIG Realty</span>
            </div>
            <p className="text-gray-600 mb-4">
              Redefining success in real estate through innovation, support, and exceptional opportunities.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-[#407140] transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#407140] transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm5.23 15.23c-.399.4-.94.4-1.34 0l-3.89-3.89-3.89 3.89c-.4.4-.94.4-1.34 0-.4-.4-.4-.94 0-1.34l3.89-3.89-3.89-3.89c-.4-.4-.4-.94 0-1.34.4-.4.94-.4 1.34 0l3.89 3.89 3.89-3.89c.4-.4.94-.4 1.34 0 .4.4.4.94 0 1.34l-3.89 3.89 3.89 3.89c.4.4.4.94 0 1.34z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#407140] transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm-1.25 15h-2.5v-8h2.5v8zm-1.25-9c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm8.75 9h-2.5v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2V17h-2.5V9h2.5v1.5c.747-.908 1.8-1.5 3-1.5 2.209 0 4 1.791 4 4V17z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#407140] transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm5.5 7.5h-1.513c-.96 0-1.487.6-1.487 1.36v1.64h2.4l-.4 2.4h-2v6.2h-2.4v-6.2h-2v-2.4h2v-1.8c0-2 1.2-3.1 3-3.1 1.2 0 1.8.1 2.4.2v1.7z" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="text-gray-600 hover:text-[#407140] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/our-team" className="text-gray-600 hover:text-[#407140] transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-[#407140] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-600 hover:text-[#407140] transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#407140] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-[#407140] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/agent-resources" className="text-gray-600 hover:text-[#407140] transition-colors">
                  Agent Resources
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-gray-600 hover:text-[#407140] transition-colors">
                  Training
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-600 hover:text-[#407140] transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-[#407140] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-[#407140] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-600 hover:text-[#407140] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-gray-600 hover:text-[#407140] transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/gdpr" className="text-gray-600 hover:text-[#407140] transition-colors">
                  GDPR
                </Link>
              </li>
              <li>
                <Link href="/licensing" className="text-gray-600 hover:text-[#407140] transition-colors">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} EZ BIG Realty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
