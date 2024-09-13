import { title, description } from "@/app/constants"

export default function TitleCard() {
    return (<div className="flex flex-col flex-nowrap items-center justify-around items-center">
        <div className='title'>{title}</div>
        <div className='slogan mb-10'>{description}</div>
    </div>)
}