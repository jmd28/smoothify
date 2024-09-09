import Image from 'next/image';
import spoofy from '@/public/assets/img/spotify_logo_full.svg';
import { signIn } from 'next-auth/react';

function NotSignedIn() {
  return (
    <div className='ml-10 mt-10 flex h-80 max-w-[19rem] flex-col flex-nowrap items-center justify-around rounded-[2rem] border-4 border-solid border-white'>
      <div>To get started:</div>
      <button
        onClick={() => signIn()}
        className='rounded-full bg-black px-4 py-2 font-bold text-white active:scale-[0.98]'
      >
        Sign In
      </button>
      <Image src={spoofy} width={120} height={120} alt='spotify logo' />
    </div>
  );
}

export default NotSignedIn;
