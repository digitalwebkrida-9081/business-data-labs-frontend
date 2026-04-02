"use client";

export default function PrivacyPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden mesh-gradient pt-32 pb-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="absolute inset-0 dot-pattern" />
        <div className="relative max-w-6xl mx-auto px-6 text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
               style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.2)', color: '#818CF8' }}>
            <span>Home</span>
            <span className="text-slate-600">—</span>
            <span className="text-white">Privacy Policy</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight max-w-3xl">
            Business Data Labs - <span className="gradient-text">Privacy Policy</span>
          </h1>
          <div className="mt-12 flex justify-center">
            <div className="w-7 h-12 rounded-full flex justify-center" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
              <span className="w-1.5 h-3 rounded-full mt-2 animate-bounce" style={{ background: 'var(--accent-primary)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto px-6 space-y-14" style={{ color: 'var(--text-secondary)' }}>
          <div>
            <h2 className="text-2xl font-black text-white mb-4">Privacy Notice</h2>
            <p className="mb-4">Inside this Privacy Policy document, you will find the kinds of information we gather and save in Business Data Labs, as well as how we utilize it.</p>
            <p className="mb-4">If there are any more questions or need for extra details regarding our Privacy Policy, feel free to reach out.</p>
            <p className="mb-4">This Privacy Policy is only for our online actions and is valid for visitors to our website about the data we collect in Business Data Labs. It doesn't include any details gathered offline or through means other than this website.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-4">Consent</h2>
            <p className="mb-4">When you use our website, it means that you approve of the Privacy Policy and accept the terms.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-4">Information We Collect</h2>
            <p className="mb-4">Concerning the personal details we request, we will express the purpose for asking you directly at that moment when we seek your personal information. If you contact us directly, we might get more details from you. These could include things like your name, email address and phone number, as well as the contents of a message or an attachment. During the process of Account creation, we may request details such as your name, company name, address and email address.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use the collected information in various ways, including to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Talk to you, it can be either directly or by using one of our associates for customer service, sending updates and marketing activities.</li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-4">Log Files</h2>
            <p className="mb-4">Business Data Labs employs a common practice of using log files. These files record visitors when they visit websites; this is done by all hosting companies as part of their hosting service's analytics. Log files gather information about internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time of visit/interaction, referring or exit pages as well as click counts.</p>
            <p className="mb-4">They are not associated with any personal information, but for trend analysis, site administration, tracking movement of users on the website and gathering demographic info.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-4">Cookies and Web Beacons</h2>
            <p className="mb-4">Business Data Labs applies cookies, these are used to collect and store information such as visitor's preferences, and the particular pages on the website that visitor accessed or visited. The data is utilized for improving user experience by customizing our page content according to browser type of visitors and other similar information.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-4">Google DoubleClick DART Cookie</h2>
            <p className="mb-4">Google is a third party on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based on their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-4">Advertising Partners Privacy Policies</h2>
            <p className="mb-4">This list provides the Privacy Policy for every advertising partner of Business Data Labs.</p>
            <p className="mb-4">The Services may include advertisements from third-party ad servers or networks. These ads are sent directly to your browser and the servers automatically recognize your IP address.</p>
            <p className="mb-4">(Note: Business Data Labs does not have any access or control on these cookies that are employed by third-party advertisers.)</p>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-4">Third-Party Privacy Policies</h2>
            <p className="mb-4">The Privacy Policy of Business Data Labs is not applicable to any other advertisers or websites. As a result, we are recommending that you consult the respective Privacy Policies for these third-party ad servers for more detailed information.</p>
            <p className="mb-4">Anyway, you can choose to disable cookies through your browser options.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-4">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
            <p className="mb-4">Under the CCPA, among other rights, California consumers have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ask a business that gathers data about consumer to show the types and particular parts of personal data collected.</li>
              <li>Request for a business to reveal the categories and precise pieces of personal data collected.</li>
              <li>Ask for personal data to be removed from the site.</li>
              <li>Request not to sell the consumer's data.</li>
            </ul>
            <p className="mb-4 mt-4">If you make a request, we have one month to reply. If you want to apply for any of these rights, please get in touch with us.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-4">GDPR Data Protection Rights</h2>
            <p className="mb-4">We would probably make sure that you know completely about all your data protection rights. Every user has the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access: You have the right to request copies of your data.</li>
              <li>The right to rectification: You have the right to ask for changes or corrections.</li>
              <li>The right to erasure: You have the power to ask for removal of your data.</li>
              <li>The right to restrict processing: You can ask us to limit how we handle your data.</li>
              <li>Right to object: You can object to our data processing.</li>
              <li>The right to data portability: You have the right to ask for data transfer.</li>
            </ul>
            <p className="mb-4 mt-4">We have one month for replying. Please get in touch with us if there are any rights to be requested.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-4">Children's Information</h2>
            <p className="mb-4">The most important thing is to include safety for children while using the internet. We suggest parents/guardians look at, join in and oversee their online activity.</p>
            <p className="mb-4">Business Data Labs doesn't purposely gather any Personal Identifiable Information from children under 13 years old. If you think that your child has given this type of personal information on our website, we urge you to get in touch with us.</p>
          </div>
        </div>
      </section>
    </>
  );
}
