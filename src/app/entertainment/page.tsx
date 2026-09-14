import { redirect } from 'next/navigation';

export default async function EntertainmentPage() {
  redirect('/search?category=Pressure+Washers');
}

