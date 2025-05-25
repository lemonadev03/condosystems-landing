import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - EZ BIG Realty",
  description: "Privacy Policy for EZ BIG, a sales team of EZ Homes. Learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy for EZ BIG</h1>
          
          <p className="text-muted-foreground mb-8">
            <strong>Last Updated: May 16, 2025</strong>
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Introduction</h2>
            <p className="text-foreground leading-relaxed">
              Welcome to EZ BIG ("we," "our," or "us"), a sales team of EZ Homes. We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Information We Collect</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We collect the following personal information when you complete our onboarding form:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Social Media Links (optional)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">How We Use Your Information</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We use your personal information for the following purposes:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-foreground">
              <li>To communicate with you about our services</li>
              <li>To send you updates and notifications</li>
              <li>To process your application to join our team</li>
              <li>To respond to your inquiries</li>
              <li>To improve our website and services</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Cookies and Tracking Technologies</h2>
            <p className="text-foreground leading-relaxed">
              We use cookies and similar tracking technologies on our website to enhance your browsing experience and analyze website traffic. You can set your browser to refuse all or some browser cookies, but this may prevent some parts of our website from functioning properly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Information Sharing</h2>
            <p className="text-foreground leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to outside parties. All information collected is used internally within EZ BIG and EZ Homes only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Data Security</h2>
            <p className="text-foreground leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Age Restriction</h2>
            <p className="text-foreground leading-relaxed">
              Our services are not available to individuals under the age of 18. By using our website and submitting your information, you represent that you are at least 18 years old.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Changes to This Privacy Policy</h2>
            <p className="text-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Your Rights Under Philippine Data Privacy Laws</h2>
            <p className="text-foreground leading-relaxed mb-4">
              In accordance with the Data Privacy Act of 2012 (Republic Act No. 10173) of the Philippines, you have the right to:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-foreground">
              <li>Be informed about how your personal information is being processed</li>
              <li>Access your personal information</li>
              <li>Object to the processing of your personal information</li>
              <li>Have your personal information corrected or rectified</li>
              <li>Have your personal information erased or blocked</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Us</h2>
            <p className="text-foreground leading-relaxed mb-4">
              If you have any questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-foreground">
                [Your contact email/phone]<br />
                [Your physical address if applicable]<br />
                <br />
                EZ BIG, a sales team of EZ Homes
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
