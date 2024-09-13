'use client';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import user_img from '@/public/assets/img/user_img.svg';

function SignedIn({ profile }) {
  const { data: session } = useSession();
  return (
    <div className='mt-8 flex w-full flex-col flex-nowrap items-center justify-around'>
      <Image
        src={profile?.images?.[1]?.url || user_img}
        className='h-500 w-500 aspect-square rounded-full object-cover'
        width={120}
        height={120}
        alt='Default user image'
      />
      <p className='mb-2 mt-5 text-xl font-normal text-black'>Signed in as</p>
      <span className='bold-txt'>{session?.token?.name}</span>
      <p
        className='mb-5 mt-8 cursor-pointer underline opacity-70'
        onClick={() => signOut()}
      >
        Sign Out
      </p>
    </div>
  );
}

export default SignedIn;
