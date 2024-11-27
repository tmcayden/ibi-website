<script setup>
import Button from 'primevue/button'
</script>

<template>
  <footer class="bg-black text-white p-8 text-center">
    <div class="flex flex-col md:flex-row items-center md:justify-around">
      <div class="flex flex-col items-center">
      <img :src="'/Logo_transparent_dark.png'" alt="IBI Contracting Logo" width="100px" />
        <h3 class="mt-4">IBI Contracting</h3>
      </div>
      <div class="company-info">
        <a href="tel:435-828-3309" class="m-2 block">Terran Harvey | (435) 828-3309</a>
        <a href="tel:435-219-6300" class="m-2 block">Mitch Larsen | (435) 219-6300</a>
        <a href="mailto:contracting.IBI@gmail.com?subject='Request%20From%20Website'" class="m-2 block">contracting.IBI@gmail.com</a>
        <div class="flex justify-center gap-5 text-xl">
          <a href="https://www.facebook.com/contracting.ibi" target="_blank">
            <i class="pi pi-facebook mt-3" style="font-size: x-large;"></i>
          </a>
          <a href="https://www.instagram.com/ibi_contracting/" target="_blank">
            <i class="pi pi-instagram mt-3" style="font-size: x-large;"></i>
          </a>
        </div>
      </div>
      <div class="flex md:flex-col mt-2 md:mt-0">
        <Button class="p-1 tracking-wider" link label="Home" as="router-link" :to="{name: 'home'}" />
        <Button class="p-1 tracking-wider" link label="Gallery" as="router-link" :to="{name: 'gallery'}" />
        <Button class="p-1 tracking-wider" link label="Contact" as="router-link" :to="{name: 'contact'}" />
        <Button class="p-1 tracking-wider" link label="Admin" as="router-link" :to="{name: 'admin'}" />
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
