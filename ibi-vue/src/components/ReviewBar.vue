<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

const toast = useToast();

const reviews = ref([
    {
        customerName: 'John Doe',
        source: 'Google',
        review: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        rating: 4.4
    },
    {
        customerName: 'Jane Smith',
        source: 'Yelp',
        review: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        rating: 4.8
    },
    {
        customerName: 'Alice Johnson',
        source: 'Facebook',
        review: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        rating: 4.2
    },
    {
        customerName: 'Bob Brown',
        source: 'TripAdvisor',
        review: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        rating: 4.6
    }
])


function getStarIcons(rating)
{
    const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;

      return {
        fullStars,
        halfStars: hasHalfStar ? 1 : 0
      };
}

function addReview() {
    toast.add({severity: 'info', summary: 'Add Review', detail: 'This feature is not yet implemented', life: 1000});
}
</script>

<template>
    <div class="flex flex-wrap justify-around bg-white">
        <Card v-for="review in reviews" class="w-96 m-3 bg-zinc-800">
            <template #footer>
                <Divider />
                <div class="flex">
                    <div class="text-white w-full pl-2">
                        <p>
                            {{ review.customerName }}
                        </p>
                        <p class="text-slate-500">
                            {{ review.source }}
                        </p>
                    </div>
                    <div class="flex gap-2 items-center">
                        <p class="text-slate-500">({{ review.rating }})</p>
                        <!-- Full stars -->
                        <i v-for="n in getStarIcons(review.rating).fullStars" :key="'full-' + n" class="pi pi-star-fill" style="color: goldenrod"></i>
                        <!-- half star -->
                        <i v-if="getStarIcons(review.rating).halfStars" class="pi pi-star-half-fill" style="color: goldenrod"></i>
                    </div>
                </div>
            </template>
            <template #content>
                <div class="flex items-center text-slate-300">
                    <p>{{ review.review }}</p>
                </div>
            </template>
        </Card>
    </div>
    <div class="w-full text-center bg-white pb-2">
        <Button label="Add Review" icon="pi pi-plus" class="w-48" @click="addReview"/>
    </div>
</template>
