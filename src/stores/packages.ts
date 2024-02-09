import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import PackageService from '../services/packages';
import { PackageT } from '../types/package';

const packageSearchLimit = 10;

export const usePackages = defineStore('packages', () => {
    const packageService = new PackageService();
    const searchText = ref('');
    const latestFoundPackages = ref<PackageT[]>([]);
    const totalPackages = ref(0);
    const currentPage = ref(1);

    const availablePages = computed(() => Math.ceil(totalPackages.value / packageSearchLimit));

    async function SearchPackages(name: string) {
        ClearSearchData();

        searchText.value = name;
        const { objects, total } = await packageService.SearchPackages(name, packageSearchLimit, 1);

        latestFoundPackages.value = objects;
        totalPackages.value = total;
    }

    async function SearchPackagesPage(page: number) {
        currentPage.value = page;
        const { objects } = await packageService.SearchPackages(searchText.value, packageSearchLimit, page);

        latestFoundPackages.value = objects;
    }

    function ClearSearchData() {
        currentPage.value = 1;
        totalPackages.value = 0;
        latestFoundPackages.value.splice(0);
    }

    return {
        latestFoundPackages,
        availablePages,
        currentPage,
        searchText,
        totalPackages,

        SearchPackages,
        SearchPackagesPage,
        ClearSearchData,
    }
})
