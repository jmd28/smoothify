
// calculate the distance around the circle of fifths between two keys
const keyDistance = (key1, key2) => {
    const [_key1, _key2] = [key1, key2].map(x => (x * 7) % 12)

    const diff = Math.abs(_key2 - _key1)
    if (diff > 6) {
        return 12 - diff
    }
    return diff
}


// calculate the normalised harmonic distance (range=[0..1])
export const keyDistanceNormalised = (key1, key2) => {
    return keyDistance(key1, key2) / 6
}