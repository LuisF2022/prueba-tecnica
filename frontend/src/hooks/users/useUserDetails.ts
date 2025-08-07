import { userDetails } from "@/services/users/usersService";
import { useQuery } from "@tanstack/react-query";

export function useUserDetails(id: number) {
    return useQuery({
        queryKey: ['users-detail', id],
        queryFn: () => userDetails(id),
        enabled: !!id
    })
}