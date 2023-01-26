<script setup>
import { RouterLink, RouterView } from 'vue-router';
import NavgationVue from './components/Navgation.vue';
import NavigationBottom from './components/NavigationBottom.vue';
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
<NavigationBottom />
</template>