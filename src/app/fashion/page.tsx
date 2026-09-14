import { redirect } from 'next/navigation';

export default async function FashionPage() {
  redirect('/search?category=Lawn+Mowers');
}

