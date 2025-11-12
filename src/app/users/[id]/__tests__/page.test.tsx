import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserDetailPage from '@/app/users/[id]/page';

// Mock fetch
global.fetch = jest.fn();

const mockUser = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  phone: '123-456-7890',
  website: 'johndoe.com',
  address: {
    street: 'Main St',
    suite: 'Apt 1',
    city: 'New York',
    zipcode: '10001',
    geo: { lat: '40.7128', lng: '-74.0060' },
  },
  company: {
    name: 'Acme Corp',
    catchPhrase: 'We do stuff',
    bs: 'business',
  },
};

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('UserDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(<UserDetailPage params={Promise.resolve({ id: '1' })} />, {
      wrapper: createWrapper(),
    });

    // The page should render without crashing during loading
    expect(screen.getByText(/Back to list/i)).toBeInTheDocument();
  });

  it('renders user details after loading', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    render(<UserDetailPage params={Promise.resolve({ id: '1' })} />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('johndoe.com')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('We do stuff')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('10001')).toBeInTheDocument();
  });

  it('shows error state when fetch fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to fetch user')
    );

    render(<UserDetailPage params={Promise.resolve({ id: '1' })} />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Error loading user details/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Failed to fetch user/i)).toBeInTheDocument();
    });
  });

  it('retries fetch when retry button is clicked', async () => {
    (global.fetch as jest.Mock)
      .mockRejectedValueOnce(new Error('Failed to fetch user'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

    const user = userEvent.setup();
    render(<UserDetailPage params={Promise.resolve({ id: '1' })} />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Error loading user details/i)
      ).toBeInTheDocument();
    });

    const retryButton = screen.getByRole('button', { name: /Try Again/i });
    await user.click(retryButton);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('displays all user information sections', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    render(<UserDetailPage params={Promise.resolve({ id: '1' })} />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Check section headers
    expect(screen.getByText(/CONTACT INFORMATION/i)).toBeInTheDocument();
    expect(screen.getByText(/COMPANY/i)).toBeInTheDocument();
    expect(screen.getByText(/ADDRESS/i)).toBeInTheDocument();
    expect(screen.getByText(/QUICK ACTIONS/i)).toBeInTheDocument();
  });

  it('has working back to list link', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    render(<UserDetailPage params={Promise.resolve({ id: '1' })} />, {
      wrapper: createWrapper(),
    });

    const backLink = screen.getByText(/Back to list/i);
    expect(backLink.closest('a')).toHaveAttribute('href', '/users');
  });

  it('has action buttons with correct links', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    render(<UserDetailPage params={Promise.resolve({ id: '1' })} />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const emailButton = screen.getByText(/Send Email/i);
    expect(emailButton.closest('a')).toHaveAttribute(
      'href',
      'mailto:john@example.com'
    );

    const websiteButton = screen.getByText(/Visit Website/i);
    expect(websiteButton.closest('a')).toHaveAttribute(
      'href',
      'http://johndoe.com'
    );
  });
});
