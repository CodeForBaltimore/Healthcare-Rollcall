export const rootFuncs = {
    authenticateUser(response) {
    },
    setAuthCookie(response) {

    },
    getNavBarStatus() {

    },
    getAuthenticationStatus() {
    },
    getSavedToken() {
    },
    getTokenFromCookie() {
    },
    destroySession() {

    },
    apiGETRequest(endpoint, callback) {

    },
    apiPUTRequest(endpoint, payload, callback) {

    },
    apiPOSTRequest(endpoint, payload, callback) {

    },
    apiDELRequest(endpoint, callback) {
    },
    getStatuses() {
        return [
            "Spoke to owner. No follow-up needed.",
            "Spoke to owner. Follow-up needed.",
            "Spoke to someone besides owner. No follow-up needed.",
            "Spoke to someone besides owner. Follow-up needed.",
            "Called. No Answer. Left a message.",
            "Called. No Answer. Did not leave a message.",
            "Wrong number",
            "No Previous Check-in"
        ]
    }
}
