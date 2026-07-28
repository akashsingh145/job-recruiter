import nodemailer from "nodemailer";
// console.log("MAIL USER:", process.env.EMAIL_USER);
// console.log("MAIL PASS:", process.env.EMAIL_PASS);


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: html,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.log("Email Error:", error.message);
    }
};