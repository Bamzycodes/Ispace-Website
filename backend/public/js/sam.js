function sendMail(){
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone_number: document.getElementById("phone_number").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    }
}

const serviceID = "service_t0l0pch"
const templateId = "template_6zo3nng"

email.js.send(serviceID, templateId, params)
.then((res) => {
    document.getElementById("name").value,
    document.getElementById("email").value,
    document.getElementById("phone_number").value,
    document.getElementById("subject").value,
    document.getElementById("message").value
    console.log(res)
})
.catch((err) => console.log(err));