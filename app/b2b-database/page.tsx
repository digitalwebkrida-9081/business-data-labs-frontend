import type { Metadata } from 'next';
import B2bdatabase from '@/components/b2b/B2bdatabase';

export const metadata: Metadata = {
  title: 'B2B Database & Business Leads Provider | Business Data Labs',
  description: 'Access targeted B2B databases including company details, emails, and phone numbers for lead generation, marketing, and sales. Get accurate business data with Business Data Labs.',
};

export default function B2bPage() {
  return <B2bdatabase />;
}
