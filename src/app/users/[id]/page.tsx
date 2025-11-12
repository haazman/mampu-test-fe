'use client';

import { useQuery } from '@tanstack/react-query';
import { User } from '@/types/user';
import Link from 'next/link';
import { use } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      { next: { revalidate: 60 } }
    );
    
    if (!response.ok) {
      return { title: 'User Not Found' };
    }
    
    const user = await response.json();
    
    return {
      title: `${user.name} - User Details`,
      description: `View details for ${user.name} (@${user.username}). Email: ${user.email}, Company: ${user.company.name}`,
      openGraph: {
        title: `${user.name} - User Details`,
        description: `${user.company.catchPhrase}`,
      },
    };
  } catch {
    return { title: 'User Details' };
  }
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorState({ message, retry }: { message: string; retry: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="text-red-600 mb-4">
        <svg
          className="w-16 h-16 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg font-semibold">Error loading user details</p>
        <p className="text-sm text-gray-600 mt-2">{message}</p>
      </div>
      <button
        onClick={retry}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: user, isLoading, error, refetch } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/users"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to list
          </Link>
        </div>

        {isLoading ? (
          <DetailSkeleton />
        ) : error ? (
          <ErrorState
            message={error instanceof Error ? error.message : 'An error occurred'}
            retry={() => refetch()}
          />
        ) : user ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user.name}
              </h1>
              <p className="text-gray-600">@{user.username}</p>
            </div>

            {/* User Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <InfoCard title="Contact Information">
                <InfoRow label="Email" value={user.email} />
                <InfoRow label="Phone" value={user.phone} />
                <InfoRow label="Website" value={user.website} />
              </InfoCard>

              {/* Company Information */}
              <InfoCard title="Company">
                <InfoRow label="Name" value={user.company.name} />
                <InfoRow label="Catchphrase" value={user.company.catchPhrase} />
                <InfoRow label="Business" value={user.company.bs} />
              </InfoCard>

              {/* Address */}
              <InfoCard title="Address">
                <InfoRow
                  label="Street"
                  value={`${user.address.street}, ${user.address.suite}`}
                />
                <InfoRow label="City" value={user.address.city} />
                <InfoRow label="Zipcode" value={user.address.zipcode} />
                <InfoRow
                  label="Coordinates"
                  value={`${user.address.geo.lat}, ${user.address.geo.lng}`}
                />
              </InfoCard>

              {/* Quick Actions */}
              <InfoCard title="Quick Actions">
                <div className="space-y-3">
                  <a
                    href={`mailto:${user.email}`}
                    className="block px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Email
                  </a>
                  <a
                    href={`http://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm font-medium text-center text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Visit Website
                  </a>
                </div>
              </InfoCard>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
