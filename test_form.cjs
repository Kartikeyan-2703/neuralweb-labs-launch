const formData = new URLSearchParams();
formData.append('entry.200735690', 'Test Name');
formData.append('entry.1612063088', 'test@example.com');
formData.append('entry.1818063459', '1234567890');
formData.append('entry.1401290427', 'Test Org');
formData.append('entry.794342549', ''); // Emulate not clicking a button
formData.append('entry.1972350427', 'Test project details');

fetch('https://docs.google.com/forms/d/e/1FAIpQLSdpkyQ6EtV8VQmVP5isYZVKrNCA1rypVNpVyGD78jhrUmLXvA/formResponse', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: formData.toString()
})
.then(res => {
  console.log("Status:", res.status);
  return res.text();
})
.then(text => {
  if (text.includes('Your response has been recorded')) {
    console.log("Success string found in response.");
  } else {
    console.log("Failed! Response text contains error:");
    if (text.includes('is a required question')) {
      console.log("FOUND ERROR: 'is a required question'");
    }
  }
})
.catch(err => console.error("Error:", err));
