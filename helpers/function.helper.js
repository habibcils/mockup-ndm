import dayjs from 'dayjs'

export default {
    formatStringDate(date, ISOdate = false){
        const year = this.padTo2Digits(date.getFullYear());
        const month = this.padTo2Digits(date.getMonth() + 1);
        const day = this.padTo2Digits(date.getDate());
        const hour = this.padTo2Digits(date.getHours());
        const min = this.padTo2Digits(date.getMinutes());
        const sec = this.padTo2Digits(date.getSeconds());
        return ISOdate ? `${year}-${month}-${day}T${hour}:${min}:${sec}` : `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    },
    isObject(val){
        if(typeof val === 'object' && val !== null){
            return true
        }else{
            return false
        }
    },
    isString(val){
        if(typeof val === 'string'){
            return true
        }else{
            return false
        }
    },
    padTo2Digits(num){
        return String(num).padStart(2, '0');
    },
    updateObjValue(obj, val = null){
        for (const key in obj) {
            obj[key] = val;
        }
        return obj
    },
    dateNow(){
        const date = dayjs().format('YYYY-MM-DDTHH:mm:ss')
		return date
    },
    dateSubtract(val, type){
		let decreaseDateFilter = dayjs()
		decreaseDateFilter = decreaseDateFilter.subtract(val, type)
		return decreaseDateFilter.format('YYYY-MM-DDTHH:mm:ss')
    }
}
