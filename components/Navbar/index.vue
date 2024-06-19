<template>
    <div class="nav fixed left-12 top-0 w-[200px] min-h-[550px] h-full z-[999999] bg-white bg-opacity-95">
        <div
            class="nav_container absolute top-1/2 z-10 flex flex-col justify-between h-[550px] -mt-[275px] text-left overflow-visible">
            <div class="nav_container_top h-full flex flex-col">
                <div id="logo" class="relative">
                    <NuxtLink to="/" class="flex items-center" @click="menuStore.resetMenu()">
                        <img src="https://dummyimage.com/200x100/fff/000.png&text=Logo" alt="Irene Yu - Makeup Artist">
                    </NuxtLink>
                    <button class="mobile-menu-trigger d-none" @click="toggleBurger">
                        <span v-if="!menuOpen" class="hamburger"></span>
                        <span v-if="menuOpen" class="ex"></span>
                    </button>
                </div>
                <div class="menu_wrap collapsed text-left text-0 ml-[14px]" :style="menuStyle">
                    <!-- MENU  : START -->
                    <div class="main_nav flex-1 overflow-y-auto pr-[15px] pb-[2px]">
                        <ul class="main_nav_links">
                            <li class="category font-bold cursor-pointer block" @click="toggleMenu(0)">
                                <span>BEAUTY &amp; FASHION</span>
                            </li>
                            <li class="category_container mb-[5px]" :class="{ hidden: !menuStore.isExpanded[0] }">
                                <ul class="custom-lg:ml-8">
                                    <li class="item text-left">
                                        <NuxtLink to="/beauty" exact-active-class="active" active-class="active"
                                            @click="handleLinkClick">
                                            Beauty</NuxtLink>
                                    </li>
                                    <li class="item text-left">
                                        <NuxtLink to="/portfolio" exact-active-class="active" active-class="active"
                                            @click="handleLinkClick">
                                            Creative Beauty</NuxtLink>
                                    </li>
                                </ul>
                            </li>
                            <li class="category font-bold cursor-pointer block" @click="toggleMenu(1)">
                                <span>PERSONAL</span>
                            </li>
                            <li class="category_container mb-[5px]" :class="{ hidden: !menuStore.isExpanded[1] }">
                                <ul class="custom-lg:ml-8">
                                    <li class="item text-left">
                                        <NuxtLink to="/about" exact-active-class="active" active-class="active"
                                            @click="handleLinkClick">
                                            About</NuxtLink>
                                    </li>
                                </ul>
                            </li>
                            <li class="category font-bold cursor-pointer block" @click="toggleMenu(2)">
                                <span>CONTACT</span>
                            </li>
                            <li class="category_container mb-[5px]" :class="{ hidden: !menuStore.isExpanded[2] }">
                                <ul class="custom-lg:ml-8">
                                    <li class="item text-left">
                                        <NuxtLink to="/contact" exact-active-class="active" active-class="active"
                                            @click="handleLinkClick">
                                            Email Me</NuxtLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div class="nav_bottom">
                            <div class="item additional_text mt-10">
                                <p id="additional_text" class="text-xs">Copyright © 2024 Irene Makeup All
                                    rights
                                    reserved.</p>
                            </div>
                        </div>
                        <div class="mt-[1000px] custom-lg:mt-0"></div>
                    </div>
                    <!-- MENU : END -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '~/store/useMenuStore'
const menuStore = useMenuStore()
const menuOpen = ref(false)
const route = useRoute()

const menuStyle = reactive({
    position: 'absolute',
    top: '-3000%',
    opacity: '0.01',
    pointerEvents: 'none',
    width: '100%',
    margin: '0',
    textAlign: 'center',
    backgroundColor: '',
    paddingTop: '10px',
    overflowY: 'auto',
    transition: 'opacity 0.2s ease, top 0s ease',
    WebkitOverflowScrolling: 'touch',
})

const updateMenuStyle = () => {
    if (typeof window !== 'undefined') {
        if (window.innerWidth > 850) {
            menuStyle.position = 'relative'
            menuStyle.top = '0'
            menuStyle.opacity = '1'
            menuStyle.pointerEvents = 'auto'
            menuStyle.width = '100%'
            menuStyle.margin = '0'
            menuStyle.textAlign = 'center'
            menuStyle.backgroundColor = ''
            menuStyle.paddingTop = '10px'
            menuStyle.overflowY = 'auto'
            menuStyle.transition = 'opacity 0s ease, top 0s ease'
            menuStyle.WebkitOverflowScrolling = 'touch'
        } else {
            menuStyle.position = 'absolute'
            menuStyle.top = menuOpen.value ? '103px' : '-3000%'
            menuStyle.opacity = menuOpen.value ? '1' : '0.01'
            menuStyle.pointerEvents = menuOpen.value ? 'auto' : 'none'
            menuStyle.width = '100%'
            menuStyle.margin = '0'
            menuStyle.textAlign = 'center'
            menuStyle.backgroundColor = '#ffffff'
            menuStyle.paddingTop = '10px'
            menuStyle.overflowY = 'auto'
            menuStyle.transition = 'opacity 0.2s ease, top 0s ease'
            menuStyle.WebkitOverflowScrolling = 'touch'
        }
    }
}

const toggleBurger = () => {
    menuOpen.value = !menuOpen.value
    updateMenuStyle()
    if (menuOpen.value) {
        // Check if the page was just refreshed
        if (sessionStorage.getItem('wasRefreshed')) {
            //console.log('Page was just refreshed')
            sessionStorage.removeItem('wasRefreshed')
            if (typeof window !== 'undefined') {
                if (window.innerWidth <= 850) {
                    menuStore.resetOpenMenu()
                }
            }
        } else {
            checkAndUpdateMenuState(route.path)
        }
    }
}

const handleLinkClick = () => {
    if (menuOpen.value) {
        menuOpen.value = false
        updateMenuStyle()
    }
}

const checkAndUpdateMenuState = (path) => {
    const expandedIndex = menuStore.isExpanded.findIndex((expanded) => expanded)
    if (
        (expandedIndex === 0 && (path.includes('/beauty') || path.includes('/portfolio'))) ||
        (expandedIndex === 1 && path.includes('/about')) ||
        (expandedIndex === 2 && path.includes('/contact'))
    ) {
        // if the status of isExpanded is same, return
        return
    }
    // else update the status
    updateMenuStateBasedOnRoute(path)
}


watchEffect(() => {
    updateMenuStyle()
})

const handleResize = () => {
    if (typeof window !== 'undefined') {
        if (window.innerWidth > 850) {
            menuOpen.value = true
        } else {
            menuOpen.value = false
        }
        updateMenuStyle()
    }
}

const updateMenuStateBasedOnRoute = (path) => {
    if (path.includes('/beauty') || path.includes('/portfolio')) {
        toggleMenu(0)
    } else if (path.includes('/about')) {
        toggleMenu(1)
    } else if (path.includes('/contact')) {
        toggleMenu(2)
    } else {
        menuStore.resetMenu()
    }
}



onMounted(async () => {
    if (typeof window !== 'undefined') {
        window.addEventListener('resize', handleResize)
        handleResize()
    }
    await nextTick()
    updateMenuStateBasedOnRoute(route.path)

    // Set a flag in sessionStorage indicating that the page was refreshed
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('wasRefreshed', 'true')
    })
})

// watch(() => route.path, (newPath) => {
//     console.log(666)
//     updateMenuStateBasedOnRoute(newPath)
// })

onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
    }
})

const toggleMenu = (index) => {
    menuStore.toggleMenu(index)
}
</script>

<style lang="scss" scoped>
.hidden {
    display: none !important;
}

.active {
    color: red;
    font-weight: bold;
}

.category {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px;
    font-size: 14px;
    cursor: pointer;

    &>svg {
        transition: transform 0.2s ease-in-out;
    }

    &.expanded>svg {
        transform: rotate(180deg);
    }
}

@media only screen and (max-width: 850px) {
    body.listing #content {
        padding: 0 30px;
    }

    body.content.simple #content,
    body.blog.simple #content,
    body.product.simple #content,
    body.store.simple #content,
    body.order_confirmation.simple #content,
    body.order_download.simple #content,
    body.order_thank_you.simple #content,
    body.order_payment_error #content {
        margin: 0;
    }

    #logo {
        margin: 0;
        padding: 20px 60px 20px 30px;
        text-align: left;
    }

    #logo h1 {
        padding: 0;
    }

    #logo a {
        display: block;
    }

    #logo h1 a {
        font-size: 28px;
    }

    #logo a img {
        max-height: 60px;
        transform: scale(1.06);
        -o-transform: scale(1.06);
        -ms-transform: scale(1.06);
        -moz-transform: scale(1.06);
        -webkit-transform: scale(1.06);
    }

    .gallery #content .container {
        padding-left: 0;
    }

    .nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: auto;
        min-height: 0;
        text-align: center;
        z-index: 100;
        background: #ffffff !important;
        -webkit-transition: transform 0.3s ease;
        -moz-transition: transform 0.3s ease;
        -ms-transition: transform 0.3s ease;
        -o-transition: transform 0.3s ease;
        transition: transform 0.3s ease;
    }

    .nav.hidden {
        -webkit-transform: translate3d(0, -100%, 0);
        -moz-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }

    .nav .nav_container {
        position: relative;
        top: 0;
        width: 100%;
        height: auto !important;
        margin-top: 0;
    }

    .nav_container>.social_icons,
    .nav #overlay {
        display: none;
    }

    .nav .nav_container_top {
        display: block;
        width: 100%;
    }

    .nav .menu_wrap {
        position: absolute;
        top: -3000%;
        overflow-y: auto;
        opacity: 0.01;
        width: 100%;
        margin: 0;
        pointer-events: none;
        text-align: center;
        // background-color: #ffffff;
        padding-top: 10px;
        transition: opacity 0.3s ease, top 0.3s ease;

        .open {
            opacity: 1;
            pointer-events: auto;
            top: 103px;
            /* 根據需要調整 */
        }
    }

    .nav .menu_wrap .social_icons_desktop {
        opacity: 0;
        visibility: hidden;
        height: 0;
    }

    .nav .social_icons_desktop {
        opacity: 0;
        visibility: hidden;
        height: 0;
    }

    .open-mobile-menu .nav .menu_wrap {
        opacity: 1;
        pointer-events: auto;
        top: auto;
        left: 0;
    }

    .menu_wrap .main_nav {
        width: 100%;
        height: auto;
        padding: 0;
    }

    .menu_wrap ul .item {
        overflow: visible;
        margin-bottom: 0;
    }

    .menu_wrap ul a:hover {
        color: #000000;
    }

    .mobile_nav_item {
        display: block;
    }

    .main_nav>li {
        display: block;
        margin: 0;
        padding: 0;
        white-space: normal;
        text-align: center;
    }

    .menu_wrap .category {
        border-top: none;
        font-weight: normal;
        // background: #ffffff;
        justify-content: space-around;
    }

    .menu_wrap .category span {
        opacity: 0.5;
    }

    .menu_wrap .open_cat,
    .menu_wrap .list_end_cat {
        border-bottom: none;
        margin: 0;
    }

    .main_nav .category+.category {
        margin-top: 2px;
    }

    .main_nav>.category>a {
        background: #ffffff;
    }

    .main_nav>.category>a span {
        opacity: 0.5;
    }

    .main_nav>.item,
    .main_nav>.category>a,
    .main_nav .dropdown>.item {
        -webkit-transition: none;
        -moz-transition: none;
        -ms-transition: none;
        -o-transition: none;
        transition: none;
    }

    .main_nav>.item:hover {
        background: #ffffff;
    }

    .main_nav .item a,
    .main_nav .category a {
        display: block;
        background-color: rgba(0, 0, 0, 0);
    }

    .main_nav .item a,
    .main_nav .category>div,
    .menu_wrap .category,
    .main_nav .category a,
    .main_nav .category a:visited,
    .main_nav .item a:visited {
        padding: 12px 0;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        -webkit-transition: none;
        -moz-transition: none;
        -ms-transition: none;
        -o-transition: none;
        transition: none;
    }

    .menu_wrap .category_container {
        display: block;
        overflow: visible;
        margin: 0;
        background: #ffffff;
    }

    .menu_wrap .category_container .item {
        float: none;
    }

    .main_nav .mobile_nav_item {
        display: block;
        margin: 11px 0;
        color: #666;
        font-size: 12px;
        line-height: 13px;
    }

    .main_nav .mobile_nav_item.nav_using {
        margin-top: 28px;
    }

    .main_nav .mobile_nav_item a {
        font-size: 12px;
        color: #666;
    }

    .menu_wrap ul li a {
        background-color: transparent;
        padding: 3px 6px 3px 1px;
        border-radius: 0;
        -moz-border-radius: 0;
        -webkit-border-radius: 0;
    }

    ul.social_icons {
        justify-content: center;
        display: flex;
        float: none;
        padding: 0;
        font-size: 0;
        margin-left: 0;
    }

    ul.social_icons li.social_icon {
        position: relative;
        width: 32px;
        height: 32px;
        font-size: 16px;
        line-height: 32px;
        border-radius: 100%;
        cursor: pointer;
        display: inline-block;
        overflow: hidden;
        margin-right: 18px;
        padding: 1px;
        position: relative;
        text-align: center;
    }

    ul.social_icons li.social_icon:last-child {
        margin-right: 0;
    }

    ul.social_icons li.social_icon a {
        width: 32px;
        height: 32px;
        padding: 0 0 0 1px;
    }

    ul.social_icons li.social_icon svg {
        height: 18px;
        top: 1px;
        left: -1px;
    }

    .nav #additional_text {
        padding: 0;
    }

    .mobile-menu-trigger {
        display: block;
        width: 30px;
        height: 30px;
        position: absolute;
        top: 50%;
        right: 30px;
        padding: 0;
        margin-top: -15px;
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
    }

    .mobile-menu-trigger:active {
        background: none;
    }

    .mobile-menu-trigger .hamburger {
        background: #333333;
        display: block;
        position: absolute;
        top: 7px;
        right: 0;
        width: 21px;
        height: 4px;
        border-radius: 1px;
    }

    .mobile-menu-trigger .hamburger::before {
        background: #333333;
        content: "";
        display: block;
        position: absolute;
        top: 7px;
        left: 0;
        width: 21px;
        height: 4px;
        border-radius: 1px;
    }

    .mobile-menu-trigger .hamburger::after {
        background: #333333;
        content: "";
        display: block;
        position: absolute;
        top: 14px;
        left: 0;
        width: 21px;
        height: 4px;
        border-radius: 1px;
    }

    .mobile-menu-trigger .ex {
        position: absolute;
        top: 0;
        right: 0;
        width: 18px;
        height: 18px;
        margin-top: 15px;
    }

    .mobile-menu-trigger .ex::before {
        background: #333333;
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 22px;
        height: 3px;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .mobile-menu-trigger .ex::after {
        background: #333333;
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 22px;
        height: 3px;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    .open-mobile-menu .mobile-menu-trigger .hamburger {
        display: none;
    }

    .open-mobile-menu .mobile-menu-trigger .ex {
        display: block;
    }

    .gallery .asset:last-child {
        margin-right: 100px;
    }

    #share_button,
    .f-share-panel {
        display: none;
    }

}
</style>