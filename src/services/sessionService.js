export const saveSession = (user) => {
    const userLogged = JSON.stringify(user)
    sessionStorage.setItem("user", userLogged)
}

export const getSession = () => {
    const loggedUser = JSON.parse(sessionStorage.getItem("user")) || {}
    return loggedUser
}