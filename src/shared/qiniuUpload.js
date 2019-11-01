import CryptoJS from 'crypto-js';
import * as qiniu from 'qiniu-js';
/** 
 * @desc 七牛秘钥AccessKey
 */
const AccessKey = 'EOSFuLq9zXVnAOCYsuYdto9RxnIsObhac2e8pNZ7';

/**
 * @desc 七牛秘钥SecretKey
 */
const SecretKey = 'GrsCVU8EUY2JUZSZ1ezqIrOb3VX7CZ4nv2WFJsmC';

/**
 * @desc 上传策略-Bucket
 */
const scope = 'file-2698747225';
const timestamp = parseInt(+new Date() / 1000) + 36000

export function getToken() {
    let putPolicy = {
        'scope': scope,
        'deadline': timestamp
    }
    let encodedPutPolicy = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(putPolicy)))
    console.log('==================encodedPutPolicy', encodedPutPolicy)
    let encodedSign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(encodedPutPolicy, SecretKey)) // 第一个参数为加密字符串，第二个参数为公共秘钥
    console.log('==================encodedSign', encodedSign)
    return AccessKey + ':' + encodedSign + ':' + encodedPutPolicy;
}

export function qiniuUpload(file) {
    qiniu.upload(file, '测试', getToken(), {
        fname: file.name
    }, {
        region: 'qiniu.region.z2'
    }).subscribe({
        next: (result) => {
            console.log(result);
        },
        error: (err) => {
            console.log(err);
        },
        complete: (result) => {
            console.log(result);
        }
    })
}