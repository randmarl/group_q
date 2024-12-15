<template>
    <div class="contact">
      <h1>Contact Us</h1>
      <p class="contact-info1">We'd love to hear from you! Here's how you can reach us:</p>
      <h2>Email</h2>
      <p class="contact-info">info@yourwebsite.com</p>
      <h2>Phone</h2>
      <p class="contact-info">+1 (123) 456-7890</p>
      <h2>Address</h2>
      <p class="contact-info">Narva mnt 18, 51009 Tartu</p>
      <h2>Office Hours</h2>
      <p class="contact-info">Monday - Friday: 9:00 AM - 5:00 PM</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "ContactView",
  }
  </script>
  
  <style>
  
  .contact {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
  }
  
  h2 {
    margin-top: 20px;
    text-align: left;
  }
  .contact-info {
    text-align: center;
  }
  .contact-info {
    line-height: 1.6;
    text-align: left;
  }
  </style>