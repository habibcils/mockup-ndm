import tokenHelper from "./token.helper"

export default {
	// do something before request sent
	async requestInterceptor(config) {

		// if not '/v1/login' add auth header
		if (!config.url.includes("v1/login")) {
			const accessToken = localStorage.getItem('token')
			if (!!accessToken) {
				config.headers["Authorization"] = `Bearer ${accessToken}`
			}
		}

		// if request to '/v1/login' remove auth header
		if (config.url === "v1/login") {
			config.headers["Authorization"] = ""
		}
		return config
	},

	// do something with error request before throw
	errorReqInterceptors(err) {
		return Promise.reject(err)
	},

	// response Interceptors
	async responseInterceptor(response) {
		const { config, data, status } = response

		// set token from login API
		if (config.url.includes("v1/login") && status == 200) {
			localStorage.setItem('token', data.token);
		}

		return response
	},

	// handle response if error on response
	errorRespInterceptor(err = null) {
		if (err) {
			const accessToken = localStorage.getItem('token')
			const isExpired = tokenHelper.isExpired()
			const appStorePinia = useAppStore()
			if (isExpired) {
				if(accessToken){
					appStorePinia.runSnackbarError('Token is expired')
					setTimeout(() => {
						localStorage.clear();
						location.reload();
					}, 3500);
				}else{
					appStorePinia.runSnackbarError(`failed get data, message: ${err.response?.data?.message || err.message} `)
					return Promise.reject(err)
				}
			}else{
				appStorePinia.runSnackbarError(`failed get data, message: ${err.response?.data?.message || err.message} `)
				return Promise.reject(err)
			}
		}
	},
}