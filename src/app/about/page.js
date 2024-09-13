import TitleCard from "../components/TitleCard"
import { title } from "../constants"

export default function AboutPage() {
    return <div>
        <TitleCard />
        <div className="mx-12 text-justify">
            <p>
                {title} is a tool for re-ordering Spotify playlists, to maximise the smoothness of transitions between songs. It uses an algorithm which aims to minimise the &quotdistance&quot between songs,
                using a metric calculated using various features of the music.

                You can then save the generated playlist to your Spotify playlists library!

                <br />
                <br />

                The metric includes audio features such as key, energy, bpm and acousticness.
                The optimum ordering is of course subjective, so the default parameters are just my personal preference.
                You will be able to vary the individual influence of these features on the metric in a future version.

                <br />
                <br />

                Whether you&aposre a DJ looking to automate your playlist transitions,
                or a casual listener who just wants rid of those jolts between songs, {title} has you covered.

                <br />
                <br />

                {title} is powered by the Spotify Web API.

            </p>
        </div>
    </div>
}