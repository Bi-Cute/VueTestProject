<script setup>
import { RouterLink, RouterView } from 'vue-router';
import NavgationVue from './components/Navgation.vue';
</script>

<template>
    <header>
        <NavgationVue />
        <!-- <div class="wrapper">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </div> -->
    </header>
    <RouterView />
</template>