import { User, UsersListPaginate } from "@/types/users/user"

const limit = 5 // Limite de registros por pagina

/**
 * Funcion que retorna el listado de usuarios segun la pagina especificada
 * 
 * @param pageParam
 */
export const fetchUsers = async ({ pageParam = 1 }: { pageParam: number }): Promise<UsersListPaginate> => {
    if (process.env.NEXT_PUBLIC_URL_API) {
        const res = await fetch(process.env.NEXT_PUBLIC_URL_API)
        if (!res.ok) throw new Error('No se pudo cargar los datos de los usuarios')

        const allUsers: User[] = await res.json();

        const start = (pageParam - 1) * limit
        const end = start + limit

        return {
            data: allUsers.slice(start, end),
            page: pageParam,
            maxPage: (allUsers.length / limit),
            limit: limit,
            totalUsers: allUsers.length
        }
    } else {
        throw new Error('Se debe definir la URL de la Api')
    }
}

export const userDetails = async (id: number): Promise<User> => {
    if (process.env.NEXT_PUBLIC_URL_API) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/${id}`)
        if (!res.ok) throw new Error('No se pudo cargar los datos de los usuarios')
        return res.json()
    } else {
        throw new Error('Se debe definir la URL de la Api')
    }
}