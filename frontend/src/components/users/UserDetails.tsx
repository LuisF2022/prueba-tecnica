'use client'
import { useUserDetails } from "@/hooks/users/useUserDetails";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTranslation } from "react-i18next";
import Spinner from "../common/Spinner";
import { Button } from "../ui/button";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserProps {
    id: number
}

const UserDetails = (params: UserProps) => {
    const { t, i18n } = useTranslation(['users'])
    const { data } = useUserDetails(params.id)
    const router = useRouter()

    if (!i18n.isInitialized) return <Spinner showText={false} />

    return (
        <Card className="w-auto max-w-2xl">
            <CardHeader>
                <CardTitle><h2 className="text-2xl font-bold">{data?.name}</h2></CardTitle>
                <CardAction>
                    <Button className="rounded-full" size='icon' onClick={() => {
                        router.back()
                    }}>
                        <Undo2 />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <p>
                    <span className="font-semibold">{t('name', { ns: 'users' })}: </span>{data?.username}
                </p>
                <p>
                    <span className="font-semibold">{t('email', { ns: 'users' })}: </span>{data?.email}
                </p>
                <p>
                    <span className="font-semibold">{t('phone', { ns: 'users' })}: </span>{data?.phone}
                </p>
                <p>
                    <span className="font-semibold">{t('address', { ns: 'users' })}: </span>
                    {`${data?.address.suite}, ${data?.address.street}, ${data?.address.city} - ${data?.address.zipcode}`}
                </p>
                <p>
                    <span className="font-semibold">{t('company', { ns: 'users' })}: </span>
                    {data?.company.name} — <em>{data?.company.catchPhrase}</em>
                </p>
            </CardContent>
        </Card>
    );


}

export default UserDetails