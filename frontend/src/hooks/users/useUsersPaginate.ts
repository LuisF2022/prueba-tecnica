import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "@/services/users/usersService"
import { UsersListPaginate } from "@/types/users/user"

export function useUsersPaginate(page: number) {
    return useQuery<UsersListPaginate, Error>({
        queryKey: ["users-list-paginate", page],
        queryFn: () => fetchUsers({ pageParam: page }),
    })
}
