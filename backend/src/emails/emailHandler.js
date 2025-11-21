import {resendClient,sender} from "../lib/resend.js"
import {createWelcomeEmailTemplate} from "./emailtempelate.js"

export const sendWelcomeEmail = async (email,name) => {
    const {data, error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Chatapp_2!",
        html: createWelcomeEmailTemplate(name),
    });

    if(error){
        console.error("Error Sending welcome email: ",error);
        throw new Error("Failed to send welcome email");
    }

    console.log("Welcome Email sent successfully",data);
}