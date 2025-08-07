import UserDetails from "@/components/users/UserDetails";

interface UserDetailsProps { params: { id: string } }

export default async function UserDetail({ params }: UserDetailsProps) {
    const { id } = await params
    return (
        <UserDetails id={Number(id)} />
    );
}
