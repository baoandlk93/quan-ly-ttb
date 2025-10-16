export function getUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export function setUserToLocalStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function removeUserFromLocalStorage() {
    localStorage.removeItem('user');
}
