<template>
  <footer class="footer">
    <div class="footer-content">
      <img :src="'/Logo_transparent_dark.png'" alt="IBI Contracting Logo" class="logo" />
      <div class="company-info">
        <h3>IBI Contracting</h3>
        <a href="tel:435-828-3309" class="contact-info block">Terran Harvey | (435) 828-3309</a>
        <a href="tel:435-219-6300" class="contact-info block">Mitch Larsen | (435) 219-6300</a>
        <a href="mailto:contracting.IBI@gmail.com?subject='Request%20From%20Website'" class="contact-info">contracting.IBI@gmail.com</a>
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
