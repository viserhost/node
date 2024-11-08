const ENDPOINTS = {
    GENERAL_SETTINGS: '/api/general-setting',
    SEO: '/api/seo',
    GOOGLE_RECAPTCHA: '/api/get-extension',
    LOGIN: '/api/login',
    LOGOUT: '/api/logout',
    REGISTER: '/api/register',
    RESET_EMAIL: '/api/password/email',
    RESET_EMAIL_VERIFICATION: '/api/password/verify-code',
    RESET_PASSWORD: '/api/password/reset',
    LANG_KEYS: '/api/language',
    POLICY_PAGES: '/api/policies',
    POLICY: '/api/policy',
    COUNTRIES: '/api/get-countries',
    UPDATE_USER_DATA: '/api/user-data-submit',
    USER_INFO: '/api/user-info',
    AUTHORIZATION: '/api/authorization',
    SEND_CODE: '/api/authorization',
    RESEND_CODE: '/api/resend-verify',
    VERIFY_CODE: '/api/verify',
    UPDATE_PROFILE: '/api/profile-setting',
    CHANGE_PASSWORD: '/api/change-password',
    TWO_FA_SETUP: '/api/twofactor',
    TWO_FA_ENABLE: '/api/twofactor/enable',
    TWO_FA_DISABLE: '/api/twofactor/disable',
    WITHDRAW_HISTORY: '/api/withdraw/history',
    WITHDRAWAL_METHODS: '/api/withdraw-method',
    WITHDRAW_REQUEST: '/api/withdraw-request',
    WITHDRAW_CONFIRM: '/api/withdraw-request/confirm',
    KYC_FORM: '/api/kyc-form',
    KYC_SUBMIT: '/api/kyc-submit',
    KYC_DATA: '/api/kyc-data',
    DOWNLOAD_FILE: '/api/download-attachments',
    PAYMENT_METHODS: '/api/deposit/methods',
    PAYMENT_REQUEST: '/api/deposit/insert',
    DEPOSIT_HISTORY: '/api/deposit/history',
    SOCIAL_LOGIN: '/api/social-login',
    FCM_STORE_TOKEN: '/api/add-device-token',
    TRANSACTIONS: '/api/transactions',
    TICKETS: '/api/ticket',
    CREATE_TICKET: '/api/ticket/create',
    VIEW_TICKET: '/api/ticket/view',
    REPLY_TICKET: '/api/ticket/reply',
    CLOSE_TICKET: '/api/ticket/close',
    DOWNLOAD_TICKET_ATTACHMENT: '/api/ticket/download',
    CONTACT_US: '/api/contact',


    IPN: {
        stripe: '/ipn/stripe',
    },

    COOKIE: '/api/cookie',

    CUSTOM_PAGES: '/api/custom-pages',
    CUSTOM_PAGE: '/api/custom-page',

}

export default ENDPOINTS