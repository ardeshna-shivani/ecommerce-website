// import sendEmail from "./emailService.js";


// const sendEmailFun = async({to,subject,text,html}) =>{
//     const result = await sendEmail(to,subject,text,html);
//     // if(result.success){
//     //     return true;
//     // }
//     // else{
//     //     return false;
//     // }

//     return result.success;
// }

// export default sendEmailFun;


import {sendEmail} from "./emailService.js";

const sendEmailFun = async ({ to, subject, text, html }) => {
  return (await sendEmail(to, subject, text, html)).success;
};

export default sendEmailFun;