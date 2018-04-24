import fetch from '../config/fetch'
// import { getStore } from '../config/mUtils'

export const getVerification = (username) => fetch('v1/auth/verification_code', {
    username
}, 'POST')
