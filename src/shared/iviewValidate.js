import {
    validEmail
} from '@/utils/validator.js';
export const validateMail = (msg = '邮箱格式不正确！') => {
    return (rule, value, callback) => {
        if (value) {
            console.log(rule);
            if (validEmail(value)) {
                callback();
            } else {
                callback(new Error(msg));
            }
        }
    }
}