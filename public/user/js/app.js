const contactForm = document.querySelector('.contact-form');
let fname = document.getElementById('fname');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let subject = document.getElementById('subject');
let message = document.getElementById('message');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = {
        fname: fname.value,
        email: email.value,
        phone: phone.value,
        subject: subject.value,
        message: message.value,
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/contact');
    xhr.setRequestHeader('contact-type', 'application/json');
    xhr.onload = function() {
        console.log(xhr.responseText);
        if (xhr.responseText == 'success'){
            alert('Email sent');
            fname.value = '';
            email.value = '';
                phone.value = '';
                subject.value = '';
                message.value = '';
        } else {
            alert('something went wrong!')
        }
    }
    xhr.send(JSON.stringify(formData));
})
