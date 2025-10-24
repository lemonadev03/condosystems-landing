import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo | Text Blurb | All Rights Reserved */}
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="relative h-8 w-56 flex-shrink-0">
            <Image src="/condo-systems-text.svg" alt="Condo Systems" fill sizes="224px" style={{ objectFit: "contain" }} />
          </div>

          {/* Text Blurb */}
          <p className="text-gray-700 text-sm leading-relaxed flex-1">
            Redefining success in real estate through innovation, support, and exceptional opportunities.
          </p>

          {/* All Rights Reserved */}
          <p className="text-gray-600 text-xs whitespace-nowrap flex-shrink-0">
            &copy; {new Date().getFullYear()} EZ BIG. All rights reserved.
          </p>
        </div>

        {/* Commented out - old multi-column layout
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="relative h-8 w-24">
                <Image src="/ez-big-banner-logo.png" alt="EZ BIG" fill sizes="96px" style={{ objectFit: "contain" }} />
              </div>
            </div>
            <p className="text-gray-700 mb-4 max-w-sm leading-relaxed">
              Redefining success in real estate through innovation, support, and exceptional opportunities.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900 mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about-us" className="text-gray-700 hover:text-azure-600 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/our-team" className="text-gray-700 hover:text-azure-600 transition-colors duration-200">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-azure-600 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900 mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-gray-700 hover:text-azure-600 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-700 hover:text-azure-600 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} EZ BIG. All rights reserved.</p>
        </div>
        */}
      </div>
    </footer>
  )
}
