<template>
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div v-for="(slide, index) in slides" :key="slide.image" class="carousel-item"
                :class="{ active: index === 0 }">
                <img :src="slide.image" class="d-block w-100" :alt="slide.title" />
                <div class="carousel-caption d-none d-md-block">
                    <h5>{{ slide.title }}</h5>
                    <p>{{ slide.description }}</p>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Попередній</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Наступний</span>
        </button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    slides: {
        type: Array,
        required: true,
    }
});
</script>