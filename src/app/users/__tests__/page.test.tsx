import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UsersPage from '@/app/users/page';


jest.mock('@/services/userService', () => ({
  userService: {
    getUsers: jest.fn(),
  },
}));

import { userService } from '@/services/userService';

const mockUsers = [
  {
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
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    phone: '098-765-4321',
    website: 'janesmith.com',
    address: {
      street: 'Oak Ave',
      suite: 'Suite 5',
      city: 'Los Angeles',
      zipcode: '90001',
      geo: { lat: '34.0522', lng: '-118.2437' },
    },
    company: {
      name: 'Tech Inc',
      catchPhrase: 'Innovation',
      bs: 'tech stuff',
    },
  },
];

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

describe('UsersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (userService.getUsers as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(<UsersPage />, { wrapper: createWrapper() });

    // Should show heading
    expect(screen.getAllByText(/Users/i)[0]).toBeInTheDocument();
  });

  it('renders user rows after loading', async () => {
    (userService.getUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

    render(<UsersPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('filters users by search term', async () => {
    (userService.getUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

    const user = userEvent.setup();
    render(<UsersPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/Search by name or email/i);
    await user.type(searchInput, 'Jane');

    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('shows empty state when no users match search', async () => {
    (userService.getUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

    const user = userEvent.setup();
    render(<UsersPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/Search by name or email/i);
    await user.type(searchInput, 'nonexistent');

    await waitFor(() => {
      expect(screen.getByText(/No users found/i)).toBeInTheDocument();
    });
  });

  it('sorts users by name', async () => {
    (userService.getUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

    const user = userEvent.setup();
    render(<UsersPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const rows = screen.getAllByRole('row');

    expect(rows[1]).toHaveTextContent('Jane Smith');

    const sortButton = screen.getByRole('button', { name: /Sort by name/i });
    await user.click(sortButton);

    await waitFor(() => {
      const updatedRows = screen.getAllByRole('row');
      expect(updatedRows[1]).toHaveTextContent('John Doe');
    });
  });

  it('shows error state when fetch fails', async () => {
    (userService.getUsers as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to fetch users')
    );

    render(<UsersPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/Error loading users/i)).toBeInTheDocument();
      expect(screen.getByText(/Failed to fetch users/i)).toBeInTheDocument();
    });
  });

  it('retries fetch when retry button is clicked', async () => {
    (userService.getUsers as jest.Mock)
      .mockRejectedValueOnce(new Error('Failed to fetch users'))
      .mockResolvedValueOnce(mockUsers);

    const user = userEvent.setup();
    render(<UsersPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/Error loading users/i)).toBeInTheDocument();
    });

    const retryButton = screen.getByRole('button', { name: /Try Again/i });
    await user.click(retryButton);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('displays result count', async () => {
    (userService.getUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

    render(<UsersPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/Showing 2 of 2 users/i)).toBeInTheDocument();
    });
  });
});
