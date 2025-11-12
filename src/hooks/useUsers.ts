import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { User } from '@/types/user';
import { userService } from '@/services/userService';
import { QUERY_KEYS } from '@/constants/queryKeys';


export function useUsers(): UseQueryResult<User[], Error> {
  return useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: userService.getUsers,
  });
}

export function useUser(id: string): UseQueryResult<User, Error> {
  return useQuery({
    queryKey: QUERY_KEYS.USER(id),
    queryFn: () => userService.getUserById(id),
  });
}
