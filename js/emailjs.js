
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
            btn.value = 'Send Email';
            alert('Sent!');
          }, (err) => {
            btn.value = 'Send Email';
            alert(JSON.stringify(err));
          });
      });
      
// End EmailJS Code to sand the Email by form
