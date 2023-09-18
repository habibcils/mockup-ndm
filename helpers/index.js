import axios from 'axios'
import interceptorHelper from "./interceptor.helper"

const runtimeConfig = useRuntimeConfig();
console.log('runtimeConfig', runtimeConfig);

export const apiBase = new axios.create({
    baseURL: runtimeConfig.public.API_BASE_URL,
})

apiBase.interceptors.request.use(
    interceptorHelper.requestInterceptor,
    interceptorHelper.errorReqInterceptors
)
apiBase.interceptors.response.use(
    interceptorHelper.responseInterceptor,
    interceptorHelper.errorRespInterceptor
)

export const headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
}

export function createParameterURL(url, fieldName, fieldData) {
    if (Array.isArray(fieldData)) {
        if (fieldData.length == 0) {
            fieldData = null
        } else {
            var undefinedDataList = fieldData.filter((data) => data == undefined)
            if (undefinedDataList.length == fieldData.length) {
                fieldData = null
            }
        }
    }
    if (fieldData != null) {
        url = url + '&' + fieldName + '=' + encodeURIComponent(fieldData)
    }
    return url.replace('?&', '?')
}

export function createFormData(form, fieldName, fieldData, nullAllowed = false) {
    if (Array.isArray(fieldData)) {
        if (fieldData.length == 0) {
            fieldData = null
        } else {
            var undefinedDataList = fieldData.filter((data) => data == undefined)
            if (undefinedDataList.length == fieldData.length) {
                fieldData = null
            }
        }
    }
    if (nullAllowed) {
        form.append(fieldName, fieldData)
    } else {
        if (fieldData != null && fieldData != '') {
            form.append(fieldName, fieldData)
        } else if (fieldData == 0) {
            form.append(fieldName, fieldData)
        }
    }

    return form
}

function checkHeadersData(customHeaders) {
    if (customHeaders == null) {
        return headers
    }
    return customHeaders
}

function checkApiBase(customApiBase) {
    if (customApiBase == null) {
        return apiBase
    }
    return customApiBase
}

function checkResult(res) {
    if (res.status == 200 || res.status == 204) {
        if (res.data.error == undefined) {
            if (getFilename(res)) {
                return { file: res.data, filename: getFilename(res), type: getFileType(res) }
            }
            return res.data
        } else {
            throw {
                message: res.data.error,
            }
        }
    } else {
        return false
    }
}

function getFileType(res) {
    const type = res?.headers['content-type']
    return type
}

function getFilename(res) {
    let filename = null
    const disposition = res?.headers['content-disposition']
    if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        const matches = filenameRegex.exec(disposition)
        if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '')
        }
    }
    return filename
}

function checkURLData(url) {
    if(typeof(url) === "object") {
        return url.getUrl()
    }
    return url
}

export function apiPostData(url, form, customHeaders = null, customApiBase = null) {
    var urlString = checkURLData(url)
    customHeaders = checkHeadersData(customHeaders)
    customApiBase = checkApiBase(customApiBase)
    return customApiBase.post(urlString, form, { headers: customHeaders }).then((res) => {
        return checkResult(res)
    })
}

export function apiPatchData(url, form, customHeaders = null, customApiBase = null) {
    var urlString = checkURLData(url)
    customHeaders = checkHeadersData(customHeaders)
    customApiBase = checkApiBase(customApiBase)
    return customApiBase.patch(urlString, form, { headers: customHeaders }).then((res) => {
        return checkResult(res)
    })
}

export function apiGetData(url, customHeaders = null, customApiBase = null) {
    var urlString = checkURLData(url)
    customHeaders = checkHeadersData(customHeaders)
    customApiBase = checkApiBase(customApiBase)
    return customApiBase.get(urlString, { headers: customHeaders }).then((res) => {
        return checkResult(res)
    })
}

export function apiPutData(url, form, customHeaders = null, customApiBase = null) {
    var urlString = checkURLData(url)
    customHeaders = checkHeadersData(customHeaders)
    customApiBase = checkApiBase(customApiBase)
    return customApiBase.put(urlString, form, { headers: customHeaders }).then((res) => {
        return checkResult(res)
    })
}

export function apiDeleteData(url, customHeaders = null, customApiBase = null) {
    var urlString = checkURLData(url)
    customHeaders = checkHeadersData(customHeaders)
    customApiBase = checkApiBase(customApiBase)
    return customApiBase.delete(urlString, { headers: customHeaders }).then((res) => {
        return checkResult(res)
    })
}

export function checkFilterAndCreateIt(filterdata, property, operator, value) {
    if (value != null) {
        filterdata.push(createFilterUrl(property, operator, value))
    }
    return filterdata
}

function createFilterUrl(property, operator, value) {
    return {
        property: property,
        operator: operator,
        value: value,
    }
}
 
export class CustomFormData extends FormData {
    constructor() {
        super();
        this.value = new FormData()
    }

    generateFormByObj(payload) {
        for (let key in payload) {
            if (payload.hasOwnProperty(key)) {
                this.addForm(key, payload[key])
            }
        }
    }

    addForm(fieldName, fieldData, nullAllowed = false) {
        if (Array.isArray(fieldData)) {
            if (fieldData.length == 0) {
                fieldData = null
            } else {
                var undefinedDataList = fieldData.filter((data) => data == undefined)
                if (undefinedDataList.length == fieldData.length) {
                    fieldData = null
                }
            }
        }
        if (nullAllowed) {
            this.append(fieldName, fieldData)
        } else {
            if (fieldData != null && fieldData != '') {
                this.append(fieldName, fieldData)
            } else if (fieldData == 0) {
                this.append(fieldName, fieldData)
            }
        }
    }
}

export class CustomURLParameter {
    constructor(url) {
        this.url = url
    }

    generateParameterByObj(payload) {
        for (let key in payload) {
            if (payload.hasOwnProperty(key)) {
                this.addParameterData(key, payload[key])
            }
        }
    }    

    addParameterData(fieldName, fieldData) {
        if (Array.isArray(fieldData)) {
            if (fieldData.length == 0) {
                fieldData = null
            } else {
                var undefinedDataList = fieldData.filter((data) => data == undefined)
                if (undefinedDataList.length == fieldData.length) {
                    fieldData = null
                }
            }
        }
        if (fieldData != null) {
            this.url = this.url + '&' + fieldName + '=' + encodeURIComponent(fieldData)
        }
        return this.url.replace('?&', '?')
    }

    getUrl() {
        return this.url.replace('?&', '?')
    }
}

export function loopFormDataObj(payload, formData) {
    for (let key in payload) {
        if (payload.hasOwnProperty(key)) {
            formData.addForm(key, payload[key])
        }
    }
    return formData
}