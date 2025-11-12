import { Metadata } from 'next';
import { ReactNode } from 'react';

async function fetchUser(id: string) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      { next: { revalidate: 60 } }
    );
    
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const user = await fetchUser(id);

  if (!user) {
    return {
      title: 'User Not Found',
    };
  }

  return {
    title: `${user.name} - User Details`,
    description: `View details for ${user.name} (@${user.username}). Email: ${user.email}, Company: ${user.company.name}`,
    openGraph: {
      title: `${user.name} - User Details`,
      description: `${user.company.catchPhrase}`,
    },
  };
}

export default function UserLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
