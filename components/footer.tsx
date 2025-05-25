import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 lg:gap-24">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative h-8 w-24">
                <Image src="/ez-big-banner-logo.png" alt="EZ BIG" fill sizes="96px" style={{ objectFit: "contain" }} />
              </div>
              {/* <span className="text-xl font-bold text-azure-500">EZ BIG</span> */}
            </div>
            <p className="text-gray-600 mb-4 max-w-sm">
              Redefining success in real estate through innovation, support, and exceptional opportunities.
            </p>
          </div>

          <div className="md:justify-self-center">
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
                <Link href="/contact" className="text-gray-600 hover:text-azure-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:justify-self-end">
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
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} EZ BIG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
