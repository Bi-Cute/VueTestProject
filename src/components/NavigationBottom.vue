<template>
    <div class="bottom_nav">
        <div
            class="nav_item"
            v-for="(item, index) in items"
            :key="index"
            :class="{ selected: item.selected == true }"
            @click="select(item)">
            <component :is="item.component" class="mx-auto block h-6 w-6" aria-hidden="true" />
            <div style="font-size: 0.625rem">{{ item.name }}</div>
        </div>
    </div>
</template>

<script>
import {
    HomeIcon,
    HashtagIcon,
    ChatBubbleOvalLeftIcon,
    AtSymbolIcon,
    ArrowUturnUpIcon,
} from '@heroicons/vue/24/outline';


export default {
    components: {
        HomeIcon,
        HashtagIcon,
        ChatBubbleOvalLeftIcon,
        AtSymbolIcon,
        ArrowUturnUpIcon,
    },
    data() {
        return {
            items: [
                { component: HomeIcon, name: '홈', path: '/' },
                { component: HashtagIcon, name: '내작업', path: '/myworks' },
                { component: ChatBubbleOvalLeftIcon, name: '채팅', path: '/chat' },
                { component: AtSymbolIcon, name: '알림', path: '/messages' },
                { component: ArrowUturnUpIcon, name: '휴지통', path: '/trash' },
            ],
        };
    },
    computed: {
        routePath() {
            return this.$route.path;
        },
    },
    mounted() {
        let isSelected = false;
        this.items.forEach(item => {
            if (item.path === this.routePath) {
                item.selected = true;
                isSelected = true;
            }
        });
        if (!isSelected) {
            this.items[0].selected = true;
        }
    },
    methods: {
        select(item) {
            this.items.forEach(item => (item.selected = false));
            item.selected = true;
            this.$router.push({
                path: item.path,
                params: {
                    reload: true,
                },
            });
        },
    },
};
</script>

<style>
.bottom_nav {
    width: 100%;
    height: 52px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    bottom: 0;
    background-color: #f9f9f9;
    cursor: pointer;
}

.nav_item {
    flex: 1;
    text-align: center;
    padding: 10px;
    color: #a1a1a1;
    font-weight: 600;
}

.nav_item.selected {
    color: #007aff;
}

/* 리플 이펙트 */
.ripple-effect {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    animation: ripple 0.5s ease-out;
    pointer-events: none;
}

@keyframes ripple {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    20% {
        transform: scale(25);
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: scale(40);
    }
}


</style>
