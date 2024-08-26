(function() {
  // Function to get script parameters
  function getScriptParams() {
    const scriptTag = document.currentScript;
    return {
      headingText: scriptTag.getAttribute('data-headingText') || "Sign up for our exclusive newsletter!",
      descriptionText: scriptTag.getAttribute('data-descriptionText') || "Join the community and stay updated on the latest events and offers.",
      buttonText: scriptTag.getAttribute('data-buttonText') || "Join Now",
      backgroundColor: scriptTag.getAttribute('data-bgColor') || "#6e00ff",
      scriptURL: scriptTag.getAttribute('data-scriptURL') || "YOUR_GOOGLE_SCRIPT_WEB_APP_URL"
    };
  }

  // Create the widget dynamically and inject it into the page
  function createWidget() {
    const params = getScriptParams();

    // Create the container div
    const container = document.createElement('div');
    container.setAttribute('id', 'newsletterContainer');
    container.setAttribute('style', `background-color: ${params.backgroundColor}; padding: 20px; border-radius: 10px; max-width: 500px; margin: auto; text-align: center; color: white;`);

    // Create the heading
    const heading = document.createElement('h2');
    heading.innerText = params.headingText;

    // Create the description
    const description = document.createElement('p');
    description.innerText = params.descriptionText;

    // Create the form
    const form = document.createElement('form');
    form.setAttribute('id', 'signupForm');
    form.setAttribute('style', 'display: flex; border-radius: 5px; overflow: hidden;');

    const input = document.createElement('input');
    input.setAttribute('type', 'email');
    input.setAttribute('name', 'email');
    input.setAttribute('placeholder', 'Enter your email address');
    input.setAttribute('required', true);
    input.setAttribute('style', 'flex: 1; padding: 15px; font-size: 16px; border: none;');

    const button = document.createElement('button');
    button.setAttribute('id', 'formButton');
    button.setAttribute('type', 'submit');
    button.innerText = params.buttonText;
    button.setAttribute('style', 'background-color: #ff6b00; border: none; padding: 15px 30px; color: white; font-size: 16px; font-weight: bold; cursor: pointer; transition: background-color 0.3s ease;');

    button.addEventListener('mouseover', function() {
      button.style.backgroundColor = '#ff9a00';
    });
    
    button.addEventListener('mouseout', function() {
      button.style.backgroundColor = '#ff6b00';
    });

    form.appendChild(input);
    form.appendChild(button);

    // Handle form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const email = formData.get('email');

      // Use the user-provided Google Apps Script URL
      fetch(params.scriptURL, { method: 'POST', body: formData })
        .then(response => response.text())
        .then(result => alert('Thank you for signing up!'))
        .catch(error => console.error('Error:', error));

      form.reset(); // Clear the form
    });

    // Append elements to the container
    container.appendChild(heading);
    container.appendChild(description);
    container.appendChild(form);

    // Inject the container into the body of the webpage
    document.body.appendChild(container);
  }

  // Initialize widget creation when the page loads
  createWidget();
})();
