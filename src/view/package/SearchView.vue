<template>
    <div class="searchView">
        <SearchInput />
        <SearchResultTable />
        <PackagesPagination />
    </div>
</template>

<script setup lang="ts">
import SearchInput from '@/components/package/SearchInput.vue';
import SearchResultTable from '../../components/package/SearchResultTable.vue';
import PackagesPagination from '../../components/package/PackagesPagination.vue';
</script>

<style scoped lang="scss">
.searchView {
    @apply flex flex-col gap-8;
    @apply lg:mx-40 my-10 md:mx-20 mx-10;
}
</style>