<script setup lang="ts">
import SearchView from '@/view/package/SearchView.vue';
import MainFooter from '@/components/MainFooter.vue';
</script>

<template>
    <div class="layout">
        <SearchView />
        <MainFooter />
    </div>
</template>

<style scoped lang="scss">
.layout {
    @apply flex flex-col gap-2;
}
</style>
