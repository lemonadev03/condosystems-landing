import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - EZ BIG",
  description: "Terms of Service for EZ BIG, a sales team of EZ Homes. Learn about our terms and conditions for using our website and services.",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service for EZ BIG</h1>
          
          <p className="text-muted-foreground mb-8">
            <strong>Last Updated: May 16, 2025</strong>
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Introduction</h2>
            <p className="text-foreground leading-relaxed">
              Welcome to EZ BIG ("we," "our," or "us"), a sales team of EZ Homes. By accessing or using our website, you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, you may not access or use our website or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Services</h2>
            <p className="text-foreground leading-relaxed">
              EZ BIG provides real estate affiliate services. Through our website, we offer information about real estate opportunities and allow individuals to join our affiliate team by completing an onboarding form.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">User Eligibility</h2>
            <p className="text-foreground leading-relaxed">
              You must be at least 18 years of age to use our services or join our affiliate team. By using our website and submitting information through our onboarding form, you represent and warrant that you are at least 18 years old.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">User Accounts and Responsibilities</h2>
            <p className="text-foreground leading-relaxed mb-4">
              If you create an account or submit your information through our onboarding form:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-foreground">
              <li>You are responsible for maintaining the confidentiality of any login information.</li>
              <li>You are responsible for providing accurate and current information.</li>
              <li>You agree to notify us immediately of any unauthorized use of your account or any other breach of security.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Intellectual Property</h2>
            <p className="text-foreground leading-relaxed">
              All content on our website, including text, graphics, logos, images, and software, is the property of EZ Homes and EZ BIG and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our express written consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Prohibited Activities</h2>
            <p className="text-foreground leading-relaxed mb-4">
              You agree not to:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-foreground">
              <li>Use our website for any illegal purpose or in violation of any local, state, national, or international law</li>
              <li>Harass, abuse, or harm another person through our website</li>
              <li>Submit false or misleading information</li>
              <li>Attempt to interfere with the proper functioning of our website</li>
              <li>Make unauthorized use of our systems, including accessing data not intended for you</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Disclaimer of Warranties</h2>
            <p className="text-foreground leading-relaxed">
              Our website and services are provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the operation of our website or the information, content, or materials included on it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Limitation of Liability</h2>
            <p className="text-foreground leading-relaxed">
              To the fullest extent permitted by applicable law, EZ BIG and EZ Homes shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our website or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Indemnification</h2>
            <p className="text-foreground leading-relaxed">
              You agree to indemnify and hold harmless EZ BIG, EZ Homes, their affiliates, officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of our website or your violation of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Modification of Terms</h2>
            <p className="text-foreground leading-relaxed">
              We reserve the right to modify these Terms at any time. The updated Terms will be posted on this page with a revised "Last Updated" date. Your continued use of our website after such modifications constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Governing Law</h2>
            <p className="text-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the Philippines, without regard to its conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Termination</h2>
            <p className="text-foreground leading-relaxed">
              We reserve the right to terminate your access to our website and services at our sole discretion, without notice, for any reason, including if you violate these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Us</h2>
            <p className="text-foreground leading-relaxed mb-4">
              If you have any questions or concerns about these Terms of Service, please contact us at:
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
