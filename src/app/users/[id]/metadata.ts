import { Metadata } from 'next';

async function fetchUser(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    { next: { revalidate: 60 } } // ISR: cache for 60 seconds
  );
  if (!response.ok) return null;
  return response.json();
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
