<template>
    <div class="classInput" @click="onSearchClick">
        <input placeholder="Search NPM package" ref="searchRef" @input="onSearchInput" v-model="searchText" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePackages } from '../../stores/packages';

const packageStore = usePackages();

const searchRef = ref();
const searchText = ref('');

const searchDebounce = ref();
const debounceTime = 800;

function onSearchClick() {
    searchRef.value.focus();
}

function onSearchInput() {
    clearTimeout(searchDebounce.value);
    searchDebounce.value = setTimeout(searchPackage, debounceTime, searchText.value);
}

function searchPackage(name: string){
    if(name.length >= 2) return packageStore.SearchPackages(name);
}

</script>

<style scoped lang="scss">
.classInput {
    @apply cursor-text;
    @apply rounded-md;
    @apply border border-solid border-gray-300;
    @apply p-3 py-3 w-full h-full;
    @apply shadow-md;
    @apply transition-colors;

    &:has(input:focus) {
        @apply border-orange-400;
    }
}
</style>