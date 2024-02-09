<template>
    <div class="footer">
        <div class="footer__left">
            <div>@ReXDeep</div>
        
            <div class="flex gap-2">
                <div class="github_logo"></div>
                <a target="_black" href="https://github.com/ua-rexdeep/jsDelivr">GitHub</a>
            </div>
        </div>
        <div class="footer__right">
            <a target="_black" href="https://steamcommunity.com/id/rexdeep/" class="text-orange-500 !cursor-crosshair">:)</a>
        </div>
    </div>
</template>

<style scoped>
.footer {
    @apply flex justify-between px-10 py-4 bg-gray-100;
}

.footer__left {
    @apply flex gap-4 font-sans;
}

.github_logo {
    width: 20px;
    height: 20px;
    background: center / cover no-repeat url(https://github.githubassets.com/favicons/favicon.png);
}

a {
    @apply text-blue-500 cursor-pointer;
}
</style>