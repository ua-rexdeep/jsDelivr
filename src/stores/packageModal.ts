import { defineStore } from 'pinia';
import { ref } from 'vue';
import PackageService from '../services/packages';

export const usePackageModal = defineStore('packageModal', () => {
    const packageService = new PackageService();
    
    const openState = ref(false);
    const packageName = ref('');
    const packageDetails = ref();

    async function OpenModal(pkgName: string) {
        openState.value = true;
        packageName.value = pkgName;
        const data = await packageService.GetPackageMeta(pkgName);
        packageDetails.value = data;
    }

    function CloseModal() {
        packageDetails.value = null;
        openState.value = false;
    }

    return {
        openState,
        packageName,
        packageDetails,

        OpenModal,
        CloseModal,
    }
});