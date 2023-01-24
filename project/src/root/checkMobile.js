/**
 * Check if the device is mobile.
 * @param {function} validators - The validators to run if it is not mobile.
 */
function checkMobile(validators){
    if (detectMob()) transformToMobile();
    else validators();
}