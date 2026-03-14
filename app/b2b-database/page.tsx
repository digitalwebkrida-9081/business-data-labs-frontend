import type { Metadata } from 'next';
import B2bdatabase from '@/components/b2b/B2bdatabase';

export const metadata: Metadata = {
  title: 'List Of Businesses By Country - Leads Directory',
  description: 'Get the business leads by country. Business Data Labs provides a compiled list of businesses for your sales, marketing, analytics, and other purposes. Download the data in CSV, Excel, and JSON format.',
};

export default function B2bPage() {
  return <B2bdatabase />;
}
