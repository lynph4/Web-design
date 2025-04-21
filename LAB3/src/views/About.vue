<template>
  <section class="container">
    <Carousel :slides="carouselSlides" />
    <div class="about-text">
      <p>
        Цей сайт є онлайн калькулятором, який допомагає вирішувати складні математичні задачі та перевіряти результати.
        Ви можете скористатися ним для швидкого вирішення ваших задач! Наш сайт постійно оновлюється і розвивається,
        додаються нові функції та калькулятори, щоб зробити процес навчання і роботи з числами максимально зручним та
        ефективним.
      </p>
    </div>
  </section>
</template>

<script setup>
import Carousel from '../components/Carousel.vue';

const carouselSlides = [
  { image: '/image1.jpg', title: 'Фотографія 1', description: 'Опис першої фотографії.' },
  { image: '/image2.jpg', title: 'Фотографія 2', description: 'Опис другої фотографії.' },
  { image: '/image3.jpg', title: 'Фотографія 3', description: 'Опис третьої фотографії.' },
];
</script>
