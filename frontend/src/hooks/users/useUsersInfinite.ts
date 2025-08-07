import { fetchUsers } from "@/services/users/usersService";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useUsersInfinite() {
    return useInfiniteQuery({
        queryKey: ['users-list'],
        queryFn: fetchUsers,
        initialPageParam: 1,
        getNextPageParam: (lastPage, Allpage) => {
            return lastPage.page < lastPage.maxPage ? lastPage.page + 1 : undefined
        }
    })
}