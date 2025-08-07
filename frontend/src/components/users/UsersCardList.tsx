'use client'
import Spinner from "../common/Spinner"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useTranslation } from "react-i18next"
import UsersList from "./UsersList"
import { useUsersInfinite } from "@/hooks/users/useUsersInfinite"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useEffect } from "react"

interface UsersCardListProps {
    paginate?: boolean
}

const UsersCardList = ({ paginate = false }: UsersCardListProps) => {
    const { t, i18n } = useTranslation(['users'])
    const { data, isLoading, fetchNextPage, hasNextPage, isError, error } = useUsersInfinite();

    if (!i18n.isInitialized) return <Spinner />

    useEffect(() => {
        if (isError) {
            toast.error(t('alert.errorUser', { ns: 'users' }));
        }
    }, [isError])

    return (
        <Card>
            <CardHeader>
                <CardTitle><h2 className="text-2xl font-bold">{t('title', { ns: 'users' })}</h2></CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center flex-col items-center">
                    <UsersList users={data?.pages.flatMap((page) => page.data)} />
                    {
                        hasNextPage && !isLoading && !paginate &&
                        <Button onClick={() => { fetchNextPage() }}>
                            {t('buttons.viewMore', { ns: 'commons' })}
                        </Button>
                    }
                    {
                        isLoading && <Spinner showText={false} />
                    }
                </div>
            </CardContent>
        </Card>
    )
}

export default UsersCardList