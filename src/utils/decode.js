export function decodeUsername(token) {
    const arr = token.split('.');
    const decodedUsername = atob(arr[1]);
    return JSON.parse(decodedUsername).username;
}