import Image from 'next/image';
import defaultImg from '@/public/assets/img/defaultPlaylistImg.png';
import { useRouter } from 'next/navigation';

function Playlist({ content }) {
  const router = useRouter()
  return (
    <div className='ml-10 pb-8 text-xl sm:text-3xl hover:scale-[0.99]' onClick={() => router.push(`/reorder/${content.id}`)}>
      <h1 className='primary-title'>{content.name}</h1>
      <div className=' items-end justify-start'>
        <Image
          // className='aspect-square mr-4 h-32 w-32 sm:mr-8 sm:h-60 sm:w-60 '
          src={content.images?.[0] ? content.images[0]?.url : defaultImg}
          width={213}
          height={213}
          alt='Playlist image'
        />
        <div>
          {/* <label>Owner</label> */}
          <p>{content?.owner.display_name}</p>
          {/* <label>Description</label> */}
          <p>{content?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Playlist;
