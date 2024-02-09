<template>
    <div class="packageCard">
        <div class="packageCard__title">
            <div class="packageCard__titlename" @click="onCardClick">{{ package.name }}</div>
            <div class="packageCard__exactname" v-if="exactmatch">exact match</div>
        </div>
        <div class="packageCard__desc">{{ package.description }}</div>
        <div class="packageCard__keywords" v-if="package.keywords?.length > 0">
            <div class="packageCard__keyword" v-for="keyword in package.keywords.slice(0, 6)" :key="keyword">
                {{ keyword }}
            </div>
        </div>
        <div class="packageCard__footer">
            <div class="packageCard__publisher">{{ package.publisher.username }}</div>
            <div class="packageCard__version">v{{ package.version }}</div>
            <div>•</div>
            <div class="packageCard__date">{{ publishDate }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['openDetails'])
const props = defineProps({
    package: {
        required: true,
        type: Object,
    },
    exactmatch: {
        default: false,
        type: Boolean,
    }
});

const publishDate = computed(() => new Date(props.package.date).toLocaleDateString());

function onCardClick() {
    emit('openDetails');
}

</script>

<style scoped lang="scss">
.packageCard {
    @apply flex flex-col gap-2;
    @apply py-2 px-1;
    @apply border-b border-gray-200;

    &__title {
        @apply flex gap-2 items-center;
    }

    &__titlename {
        @apply font-bold;
        @apply text-gray-800 border-b-2 border-b-transparent hover:border-b-black;
        @apply cursor-pointer;
    }

    &__exactname {
        @apply text-sm tracking-wide;
        @apply text-gray-500;
        @apply bg-[#efe7fc] rounded-md;
        @apply px-2 py-0.5 ml-3;
    }

    &__desc {
        @apply text-sm text-gray-400;
    }

    &__keywords {
        @apply flex gap-1;
        @apply w-full flex-wrap;
    }

    &__keyword {
        @apply p-1 px-2 text-xs tracking-wide;
        @apply rounded-md bg-gray-100;
    }

    &__footer {
        @apply flex gap-2 items-center;
        @apply text-gray-500 text-sm;
    }

    &__publisher {
        @apply tracking-wide text-base;
    }
}
</style>