'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import NotSignedIn from '@/app/components/NotSignedIn';

export default function SigninPage() {

    const { data: session } = useSession();
    const router = useRouter();
    if (session) {
        router.push("/playlists")
    }
    return (
        <NotSignedIn />
    )
}