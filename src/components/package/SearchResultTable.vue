<template>
    <div class="flex flex-col gap-4">
        <div class="packagesCounter" v-show="totalPackages > 0">{{ totalPackages }} packages found</div>
        <PackageCard 
            v-for="pkg in packages" 
            :key="pkg.name" 
            :package="pkg" 
            :exactmatch="pkg.name == searchText" 
            @openDetails = "() => openPackageDetails(pkg)" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePackages } from '../../stores/packages';
import PackageCard from './PackageCard.vue';
import { usePackageModal } from '../../stores/packageModal';
import { PackageDataT } from '../../types/package';

const packageStore = usePackages();
const packageModalStore= usePackageModal();

const packages = computed(() => packageStore.latestFoundPackages.map(({ package: pkg }) => pkg));
const totalPackages = computed(() => packageStore.totalPackages);
const searchText = computed(() => packageStore.searchText.trim());

function openPackageDetails(pkg: PackageDataT) {
    packageModalStore.OpenModal(pkg.name);
}

</script>

<style scoped>
.packagesCounter {
    @apply font-bold text-gray-700 bg-gray-100 py-3 px-3 rounded-md tracking-wide;
}
</style>