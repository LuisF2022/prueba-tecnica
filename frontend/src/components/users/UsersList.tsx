import { User } from "@/types/users/user";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";


const UsersList = ({ users }: { users: User[] | undefined }) => {
    const { t } = useTranslation(['users', 'commons']);

    /**
     * Funcion para formatear los telefonos de la forma (***) *** - **** ext. ***
     * 
     * @param phone 
     * @returns 
     */
    const formatPhone = (phone: string): string => {
        // Separar por extension si existe
        const [phonePart, extension] = phone.split(/x|ext/i);

        // Extraer solo numeros del telefono
        const digits = phonePart.replace(/\D/g, '');

        // Validar que tenga almenos 10 digitos
        if (digits.length < 10) return phone;

        // Segmentar el numero de telefono de la forma (***)-***-****
        const part1 = digits.slice(-10, -7);
        const part2 = digits.slice(-7, -4);
        const part3 = digits.slice(-4);

        const newPhone = `(${part1}) ${part2}-${part3}`;
        return extension
            ? `${newPhone} ext. ${extension.trim()}`
            : newPhone;
    }

    return (<Table>
        <TableHeader>
            <TableRow>
                <TableHead>{t('name', { ns: 'users' })}</TableHead>
                <TableHead>{t('username', { ns: 'users' })}</TableHead>
                <TableHead>{t('email', { ns: 'users' })}</TableHead>
                <TableHead>{t('address', { ns: 'users' })}</TableHead>
                <TableHead>{t('phone', { ns: 'users' })}</TableHead>
                <TableHead>...</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {users && users.map((user) => (
                <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{`${user.address.city} ${user.address.street} ${user.address.zipcode}`}</TableCell>
                    <TableCell>{formatPhone(user.phone)}</TableCell>
                    <TableCell>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button size='icon' className="rounded-full hover:cursor-pointer" asChild>
                                    <Link href={`/users/${user.id}`}>
                                        <Eye />
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t('buttons.userDetails', { ns: 'commons' })}</p>
                            </TooltipContent>
                        </Tooltip>

                    </TableCell>
                </TableRow>
            ))
            }
        </TableBody>
    </Table>)
}

export default UsersList