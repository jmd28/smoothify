import Image from 'next/image';
import spoofy from '@/public/assets/img/spotify_logo_full.svg';
import { signIn } from 'next-auth/react';
import { title, description } from '@/app/constants';
import TitleCard from './TitleCard';

function NotSignedIn() {
  return (
    <div className='ml-10 mt-40 flex h-80 flex-col flex-nowrap items-center justify-around rounded-[2rem] border-4 border-solid border-white'>

      <TitleCard />

      <div>To get started:</div>
      <button
        onClick={() => signIn()}
        className='rounded-full bg-black px-4 py-2 font-bold text-white active:scale-[0.98]'
      >
        Sign In
      </button>
      <div className='my-4'></div>
      <Image src={spoofy} width={120} height={120} alt='spotify logo' />
    </div>
  );
}

export default NotSignedIn;
