import Link from "next/link"
import { Building2 } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8 text-azure-500" />
              <span className="text-xl font-bold text-azure-500">EZ BIG Realty</span>
            </div>
            <p className="text-gray-600 mb-4">
              Redefining success in real estate through innovation, support, and exceptional opportunities.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="text-gray-600 hover:text-azure-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/our-team" className="text-gray-600 hover:text-azure-500 transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-azure-500 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-600 hover:text-azure-500 transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-azure-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-azure-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/agent-resources" className="text-gray-600 hover:text-azure-500 transition-colors">
                  Agent Resources
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-gray-600 hover:text-azure-500 transition-colors">
                  Training
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-600 hover:text-azure-500 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-azure-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-azure-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-600 hover:text-azure-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-gray-600 hover:text-azure-500 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/gdpr" className="text-gray-600 hover:text-azure-500 transition-colors">
                  GDPR
                </Link>
              </li>
              <li>
                <Link href="/licensing" className="text-gray-600 hover:text-azure-500 transition-colors">
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
