import { Metadata } from 'next';
import ClientProfilesPage from '@/components/ClientProfilesPage';

export const metadata: Metadata = {
  title: 'Fighter & Wrestler Profiles | Who Was Champ',
  description: 'Explore comprehensive profiles of legendary fighters and wrestlers across WWE, UFC, and boxing history.',
};

export default function ProfilesPage() {
  return <ClientProfilesPage />;
}