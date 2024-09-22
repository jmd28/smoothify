import { keyComparator, keyDistanceNormalised } from "./distances";
const KEY_ONLY = true;

const getKey = (t) => t?.track?.features?.key

// we can optimise the algorithm for the special case of a 1D ordering function.
// this optimisation is based on the fact that:
// the best path between points on a line is always just the straight line from
// the first point to the last point on the line
//
// however - musical key is not a linear space, so the question now becomes:
// what is the best path between points in a modular space?
// to which the answer is:
// - sort the points by key (in circle of fifths space)
// - find pair of adjacent points which are furthest apart (mod 12)
// - begin and end the path with this pair of points
const smoothifyByKey = ([...tracks]) => {
    const trackComparator = (a, b) => {
        const [key1, key2] = [a, b].map(e => getKey(e))
        return keyComparator(key1, key2)
    }
    const N_TRACKS = tracks.length

    // sort the tracks by key
    const ordered = tracks.toSorted(trackComparator)
    console.log("created temp ordering: ", ordered.map(t => t.track.name + " < " + t.track.features.key * 7 % 12))

    // find the furthest pair of adjacent tracks
    var bestStartTrack = 0
    var bestEndTrack = N_TRACKS - 1
    var furthestDistance = 0

    var iEndTrack = 0
    var iStartTrack = 1
    while (iEndTrack < N_TRACKS) {
        const distance = keyDistanceNormalised(
            getKey(ordered[iStartTrack]),
            getKey(ordered[iEndTrack]),
        )
        if (distance > furthestDistance) {
            furthestDistance = distance
            bestStartTrack = iStartTrack
            bestEndTrack = iEndTrack
        }

        iEndTrack++
        iStartTrack++
        // allow startTrack to wrap back to 0
        iStartTrack %= N_TRACKS
    }

    // now build result array starting from bestStartTrack
    const res = []
    for (var i = 0; i < N_TRACKS; i++) {
        res.push(ordered[(bestStartTrack + i) % N_TRACKS])
    }
    console.log("created final ordering: ", res.map(t => t.track.name + " < " + t.track.features.key * 7 % 12))

    return res

}

export const smoothify = ([...tracks]) => {
    // if one dimensional reordering,
    // we can simply sort in that dimension
    // and this will always be the shortest path
    if (KEY_ONLY) {
        return smoothifyByKey(tracks)
    }
}
