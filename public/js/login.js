const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    //password send
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  };



  
  document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);
    const signupFormHandler = async (event) => {
      event.preventDefault();
    
      // Gather the data from the form elements on the page
      const email = document.querySelector('#email-signup').value.trim();
      const password = document.querySelector('#password-signup').value.trim();
      const username = document.querySelector('#username-signup').value.trim();
    
      //password send
      if (email && password) {
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to log in');
        }
      }
    };
    
  
  
    
    document
      .querySelector('#login-form')
      .addEventListener('submit', loginFormHandler);



