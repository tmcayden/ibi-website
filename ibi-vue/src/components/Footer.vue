<template>
  <footer class="footer">
    <div class="footer-content">
      <img :src="'/Logo_transparent_dark.png'" alt="IBI Contracting Logo" class="logo" />
      <div class="company-info">
        <h3>IBI Contracting</h3>
        <p class="contact-info">Phone: (123) 456-7890</p>
        <p class="contact-info">Email: info@ibicontracting.net</p>
      </div>
      <div class="social-media">
        <a href="https://www.facebook.com" target="_blank" class="social-icon">
          <i class="pi pi-facebook"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" class="social-icon">
          <i class="pi pi-instagram"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const logoSrc = 'path/to/your/logo.png' // Replace with the actual path to your logo image
</script>

<style scoped>
.footer {
  background-color: black;
  color: white;
  padding: 20px;
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 100px; /* Adjust as needed */
  margin-bottom: 10px;
}

.company-info {
  margin: 10px 0;
}

.contact-info {
  margin: 5px 0;
}

.social-media {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.social-icon {
  color: white;
  font-size: 24px; /* Adjust as needed */
  margin: 0 10px;
  text-decoration: none;
}

.social-icon:hover {
  color: #ccc; /* Change color on hover */
}
</style>
