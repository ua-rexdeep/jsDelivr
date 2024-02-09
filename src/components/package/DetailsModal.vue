<template>
    <div class="detailsModalBack" @click.self="closeModal()" v-if="isActive">
        <div class="detailsModal" :class="{ '!opacity-100': isDataLoaded }">
            <div class="detailsModal__header">
                <div>Package details</div>
                <div class="exitButton" @click="closeModal()">
                    <font-awesome-icon :icon="faXmark" />
                </div>
            </div>
            <div class="detailsModal__repo">
                <a target="_blank" :href="`https://github.com/${RepositoryName}`">
                    <font-awesome-icon :icon="faLink" />
                    <div class="text-blue-500">{{ RepositoryName }}</div>
                </a>
                <a target="_blank" :href="PackageDetails?.links.stats">
                    <div class="detailsModal__stats">
                        <font-awesome-icon :icon="faArrowUpRightFromSquare" />
                        <div>{{ popularity }}% popularity</div>
                    </div>
                </a>
            </div>
            <div class="detailsModal__content">
                <div class="detailsModal__desc">
                    <div class="detailsModal__desc__title">Description</div>
                    <div class="detailsModal__desc__text">{{ PackageMeta?.package.description }}</div>
                </div>
                <div class="detailsModal__tags">
                    <div class="detailsModal__tags__title">Tags</div>
                    <div class="detailsModal__tags__list">
                        <div v-for="[tag, version] in Object.entries(PackageDetails.tags)" :key="tag"
                             class="detailsModal__tags__item">
                            <div>{{ tag }}:</div>
                            <div class="detailsModal__tags__version">{{ version }}</div>
                        </div>
                    </div>
                </div>
                <div class="detailsModal__links">
                    <div class="detailsModal__links__title">Links</div>
                    <div class="detailsModal__links__list">
                        <a target="_blank" :href="link" class="detailsModal__links__item" :key="name"
                           v-for="[name, link] in Object.entries(Links)">
                            <font-awesome-icon :icon="faArrowUpRightFromSquare" />
                            <div>{{ name[0].toLocaleUpperCase() + name.slice(1) }}</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLink, faXmark, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { usePackageModal } from '../../stores/packageModal';
import { computed } from 'vue';
import { usePackages } from '../../stores/packages';

const packageStore = usePackages();
const packageModal = usePackageModal();

const isActive = computed(() => packageModal.openState);
const PackageMeta = computed(() => packageStore.GetFromLatest(packageModal.packageName));
const PackageDetails = computed(() => packageModal.packageDetails);
const isDataLoaded = computed(() => PackageDetails.value != null);
const RepositoryName = computed(() => {
    if (PackageMeta.value) {
        return `${PackageMeta.value.package.publisher.username}/${PackageMeta.value.package.name}`;
    } else return '';
});
const popularity = computed(() => {
    if (PackageMeta.value?.score.detail.popularity != null) {
        return (PackageMeta.value.score.detail.popularity * 100) ^ 0;
    } else return 0;
})
const Links = computed(() => {
    return PackageMeta.value?.package.links || [];
})

function closeModal() {
    packageModal.CloseModal();
}

</script>

<style scoped lang="scss">
.detailsModalBack {
    @apply w-full h-full;
    @apply absolute top-0 left-0;
    @apply bg-[#00000031];
    @apply flex justify-center items-center;
    @apply z-20;
}

.detailsModal {
    @apply w-full mx-20 md:mx-0 lg:mx-0 md:w-[500px] lg:w-[500px];
    @apply h-[600px];
    @apply bg-[#eee] rounded-md shadow-lg;
    @apply flex flex-col gap-4;
    @apply p-4;
    @apply opacity-0;
    @apply transition-opacity;

    &__content {
        @apply flex flex-col gap-4;
        @apply overflow-y-scroll;
    }

    &__header {
        @apply flex justify-between items-center;
        @apply font-bold;
    }

    &__repo {
        @apply flex justify-between items-center;

        a {
            @apply flex gap-1 cursor-pointer;
        }
    }

    &__stats {
        @apply px-2.5 py-2 rounded-md cursor-pointer;
        @apply text-white bg-blue-500 text-sm;
        @apply flex gap-2 items-center;
    }

    &__desc {
        &__title {
            @apply font-bold;
        }

        &__text {
            @apply text-sm text-gray-800;
        }
    }

    &__tags {
        &__title {
            @apply font-bold;
        }

        &__list {
            @apply flex flex-col gap-1 px-1 py-2;
        }

        &__item {
            @apply flex gap-1 items-center;
        }

        &__version {
            @apply px-2 py-1 text-sm bg-gray-200 rounded-md ml-2;
        }
    }

    &__links {
        &__title {
            @apply font-bold;
        }

        &__list {
            @apply flex flex-col gap-2 px-1 py-2;
        }

        &__item {
            @apply flex gap-1.5 items-center cursor-pointer tracking-wide w-fit;
        }
    }
}

.exitButton {
    @apply w-8 h-8;
    @apply rounded-full;
    @apply flex justify-center items-center;
    @apply cursor-pointer;
}
</style>