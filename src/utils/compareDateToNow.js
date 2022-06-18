export default function compareDateToNow(date) {
    const now = new Date(Date.now());

    const isGreater = (date.getFullYear() > now.getFullYear()) ||
        (date.getFullYear() === now.getFullYear() && date.getMonth() > now.getMonth()) ||
        (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() > now.getDate())

    if (isGreater) {
        return 1;
    }

    const isEqual = (date.getFullYear() === now.getFullYear()) && (date.getMonth() === now.getMonth()) && (date.getDate() === now.getDate());

    if (isEqual) {
        return 0;
    }

    return -1;
}