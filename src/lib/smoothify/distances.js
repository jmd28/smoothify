// map chromatic scale to circle of fifths and vice versa
// (this function is self inverse)
// this is useful when considering the distance between two keys
//
// [C   G   D   A   E   B   Gb  Db  Ab  Eb  Bb  F]
// [0 	7 	2 	9 	4 	11 	6 	1 	8 	3 	10 	5]
//  |   |   |   |   |   |   |   |   |   |   |   |
// [0 	1 	2 	3 	4 	5 	6 	7 	8 	9 	10 	11]
const chromaticToFifths = (x) => (x * 7) % 12
const fifthsToChromatic = chromaticToFifths

// compare two keys (non-wrapping)
export const keyComparator = (k1, k2) => {
    const [key1, key2] = [k1, k2].map(chromaticToFifths)
    return key2 - key1
}

// calculate the distance around the circle of fifths between two keys
const keyDistance = (key1, key2) => {
    const diff = Math.abs(keyComparator(key1, key2))
    if (diff > 6) {
        return 12 - diff
    }
    return diff
}

// calculate the normalised harmonic distance (range=[0..1])
export const keyDistanceNormalised = (key1, key2) => {
    return keyDistance(key1, key2) / 6
}