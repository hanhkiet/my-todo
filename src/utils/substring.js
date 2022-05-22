export function substring(string, minlength) {
    if (string.length <= minlength) {
        return string;
    }

    return string.substring(0, minlength - 3) + '...';
}