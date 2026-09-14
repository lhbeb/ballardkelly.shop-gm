import { redirect } from 'next/navigation';

export default async function ElectronicsPage() {
  redirect('/search?category=Outdoor+Power+Equipment');
}

