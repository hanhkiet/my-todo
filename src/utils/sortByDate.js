export default function sortByDate(array) {
    return array.sort((a, b) => {
        return Date.parse(b.created.seconds) - Date.parse(a.created.seconds);
    });
}