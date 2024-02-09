<template>
    <div class="layout" :class="{ 'overflow-hidden': isModalActive }">
        <SearchView />
        <MainFooter />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import SearchView from '@/view/package/SearchView.vue';
import MainFooter from '@/components/MainFooter.vue';

import { usePackageModal } from '@/stores/packageModal';
const packageModal = usePackageModal();
const isModalActive = computed(() => packageModal.openState);
</script>

<style scoped lang="scss">
.layout {
    @apply flex flex-col gap-2 h-screen;
}
</style>
