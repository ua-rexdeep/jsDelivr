<template>
    <div class="pagination">
        <div 
            class="pagination__btn" 
            :class="{ 'pagination__btn--selected': currentPage == 1 }" 
            v-show="showFirstPage"
            @click="onPageClick(1)">1</div>

        <div v-show="showFirstDots" class="px-1 py-2 font-bold tracking-wider text-sm">...</div>

        <div 
            class="pagination__btn" 
            v-for="offset in (totalPages > 5 ? 5 : totalPages)" 
            :key="offset" 
            @click="onPageClick(calcOffsetPage(offset))"
            :class="{ 'pagination__btn--selected': currentPage == calcOffsetPage(offset) }"
        >
            {{ calcOffsetPage(offset) }}
        </div>

        <div v-show="showLastDots" class="px-1 py-2 font-bold tracking-wider text-sm">...</div>

        <div 
            class="pagination__btn" 
            :class="{ 'pagination__btn--selected': currentPage == totalPages }"
            @click="onPageClick(totalPages)"
            v-show="totalPages > 5">
            {{ totalPages }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePackages } from '../../stores/packages';

const packageStore = usePackages();
const currentPage = computed(() => packageStore.currentPage);
const showFirstPage = computed(() => currentPage.value > 3);
const totalPages = computed(() => packageStore.availablePages);
const showFirstDots = computed(() => currentPage.value > 4);
const showLastDots = computed(() => totalPages.value - ( currentPage.value + 2 ) > 1);

const diffIndex = computed(() => {
    if(currentPage.value < 3) return 3 - currentPage.value;
    if(packageStore.availablePages - currentPage.value < 3) return (packageStore.availablePages - currentPage.value) - 3;
    return 0;
})

function calcOffsetPage(offset: number) {
    return currentPage.value + diffIndex.value + (offset - 3);
}

function onPageClick(page: number) {
    packageStore.SearchPackagesPage(page);
}

</script>

<style scoped lang="scss">
.pagination {
    @apply flex gap-2 select-none;

    &__btn {
        @apply cursor-pointer;
        @apply flex items-center justify-center;
        @apply px-2.5 py-2;
        @apply border border-gray-400 rounded-md;

        &--selected {
            @apply font-bold;
        }
    }
}
</style>