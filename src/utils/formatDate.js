export default function formatDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date(Date.now());
    return `${months[date.getMonth()]} ${date.getDate()} ${now.getMonth() === date.getMonth() ? '' : date.getMonth()} ${now.getFullYear() !== date.getFullYear() ? date.getFullYear() : ''}`;
}