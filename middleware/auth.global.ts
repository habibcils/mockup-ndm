// https://masteringnuxt.com/blog/protecting-routes-in-nuxt-3
import tokenHelper from "@/helpers/token.helper"

// [route manager]
export default defineNuxtRouteMiddleware(async (to, from) => {
    const pathContainLogin = to.fullPath.includes("/login")
    const pathContainRegis = to.fullPath.includes("/register")
    if(pathContainRegis){
        return true
    }

    // if already login
    if (isUserExist()) {
        // contain login
        if (pathContainLogin) {
            return navigateTo('/')
        }
    }

    // redirect if not logged
    if (!isUserExist() && !pathContainLogin) {
        return navigateTo('/login')
    }
})

// check token
function isUserExist() {
    const tokenInfo = tokenHelper.decodeUserToken()
    if (tokenInfo) {
        const isExpired = tokenHelper.isExpired()
        if (isExpired) {
            localStorage.clear();
            return false
        }
    }

    return !!tokenInfo
}