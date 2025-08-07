'use client'
import { useUsersPaginate } from "@/hooks/users/useUsersPaginate";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Spinner from "../common/Spinner";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import UsersList from "./UsersList";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const UserPaginate = () => {
    const { t, i18n } = useTranslation(['users'])
    const [page, setPage] = useState<number>(1)
    const { data, isLoading, isError, error } = useUsersPaginate(page);

    if (!i18n.isInitialized) return <Spinner />

    useEffect(() => {
        if (isError) {
            toast.error('Error', {
                description: t('alert.errorUser', { ns: 'users' })
            });
        }
    }, [isError, error])

    return (
        <Card>
            <CardHeader>
                <CardTitle><h2 className="text-2xl font-bold">{t('title', { ns: 'users' })}</h2></CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center flex-col items-center">
                    <UsersList users={data?.data} />
                    {
                        isLoading && <Spinner showText={false} />
                    }
                    <div className="w-full mt-6 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (page > 1) setPage(page - 1);
                                        }}
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" isActive>
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (data && data.maxPage > page) setPage(page + 1);
                                        }}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

}

export default UserPaginate