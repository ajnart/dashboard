let current = new Date();
// const dateTime = new Promise((resolve, reject) => {
//     if (current.getMonth() + 4 != (current.getMonth() + 4) % 12) {
//         cDate = (current.getFullYear() + 1) + '-' + ((current.getMonth() + 4) % 12) + '-' + current.getDate();
//     } else {
//         cDate = current.getFullYear() + '-' + (current.getMonth() + 4) + '-' + current.getDate();
//     }
//     let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
//     resolve (cDate + ' ' + cTime);
// });
const dateTime = (current.now() + 7776000000);
module.exports = dateTime;