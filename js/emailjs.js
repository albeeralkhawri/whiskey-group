
// EmailJS Code to sand the Email by form
  const btn = document.getElementById('submit');
      document.getElementById('register-form')
       .addEventListener('submit', function(event) {
        event.preventDefault();
     
         btn.value = 'Sending...';
       
         const serviceID = 'default_service';
         const templateID = 'template_qfgpsuv';
      
         emailjs.sendForm(serviceID, templateID, this)
          .then(() => {
            //To clear from after submit
            event.preventDefault();
            const inputs = document.querySelectorAll('#name, #email, #phonenumber, #age, #exampleFormControlTextarea1');
            inputs.forEach(input => {
              input.value = '';
            });
            //for thanks page after submit the form
            window.location.href="thanks.html";
            btn.value = 'Send Email';
         //   alert('Sent!');                *this to show the notification on top of page*
          }, (err) => {
            btn.value = 'Send Email';
            alert(JSON.stringify(err));
          });
      });
      
// End EmailJS Code to sand the Email by form
