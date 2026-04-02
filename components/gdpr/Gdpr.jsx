"use client";

export default function GdprPage() {
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
            <span className="text-white">GDPR</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight max-w-3xl">
            Business Data Labs - <span className="gradient-text">GDPR Compliance</span>
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
          <p className="text-lg leading-relaxed">
            At Business Data Labs, we prioritize data privacy and security. The General Data Protection Regulation (GDPR) is a comprehensive European Union legislation designed to safeguard the rights of individuals concerning their personal data. We are fully committed to GDPR compliance and ensuring that our services meet its stringent requirements.
          </p>

          <div>
            <h2 className="text-2xl font-black text-white mb-4">Our Pledge</h2>
            <p className="mb-4">As a leading web scraping provider, we collect, process, and store data from various sources on behalf of our clients. We understand the immense responsibility that comes with handling personal data and are dedicated to maintaining full GDPR compliance. Here's how we ensure compliance throughout our operations:</p>
            <ul className="list-decimal pl-6 space-y-2">
              <li>We maintain transparency about our data handling practices, both in our interactions with clients and through our comprehensive privacy policy.</li>
              <li>We implement state-of-the-art security measures to protect data from breaches, unauthorized access, and loss. Our systems undergo rigorous and regular security audits.</li>
              <li>We respect the rights of data subjects, including the right to access, rectify, and erase their personal data.</li>
              <li>We obtain clear, informed consent when necessary and provide easy mechanisms for data subjects to withdraw their consent.</li>
              <li>We maintain meticulous records of all data processing activities, ensuring the highest levels of accountability and transparency.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-4">How Our Services Ensure GDPR Compliance</h2>
            <p className="mb-4">At Business Data Labs, we understand the critical importance of data protection and privacy compliance, particularly in the context of the GDPR. Our web scraping services have been meticulously designed with GDPR compliance at the core.</p>
            <ul className="list-decimal pl-6 space-y-2">
              <li>Clients have full control over the data they wish to collect, empowering them to determine the types of personal data to be processed.</li>
              <li>Clients can set custom data retention periods, ensuring that data is not stored longer than absolutely necessary.</li>
              <li>We employ advanced encryption techniques to secure data both in transit and at rest, significantly reducing the risk of data breaches.</li>
              <li>We offer seamless API integration, allowing clients to extract data from websites in full compliance with GDPR regulations easily.</li>
              <li>Access to our services is protected through robust user authentication, ensuring that only authorized users can access and manage data.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-4">Collection of Data</h2>
            <p className="mb-4">Ensuring the privacy and security of your data is our utmost priority at Business Data Labs. Here's how we handle various types of data collected through our website and services.</p>
            <ul className="list-decimal pl-6 space-y-2">
              <li>Our website uses a self-hosted, privacy-focused analytics solution to collect anonymized data.</li>
              <li>Videos available on our website are hosted on our own secure servers.</li>
              <li>When you download or purchase a dataset, we store minimal information required for internal data analysis purposes only.</li>
              <li>We utilize a self-hosted email delivery service to send transactional emails to registered users.</li>
              <li>As required by law, we share only the necessary transactional data with our accountants and relevant tax authorities.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-4">Contact Us</h2>
            <p className="mb-4">If you have any questions or concerns about GDPR compliance at our web scraping company, please don't hesitate to reach out to us. We are deeply committed to protecting your data privacy and ensuring that our services align with the highest standards of compliance.</p>
            <p>We continuously monitor GDPR developments and proactively adjust our practices to maintain the highest level of data protection.</p>
          </div>
        </div>
      </section>
    </>
  );
}
