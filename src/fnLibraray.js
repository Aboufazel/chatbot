export const formatNumbers = function (string) {
    return string?.toString()?.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (c) {
        return c.charCodeAt(0) - 1632;
    })?.replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (c) {
        return c.charCodeAt(0) - 1776;
    });
}
