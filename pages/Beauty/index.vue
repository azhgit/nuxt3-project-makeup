<template>
    <div id="beauty" class="gallery loaded ml-0 custom-lg:ml-[280px] bg-opacity-1">
        <div class="container clearfix absolute top-1/2 h-[550px] -mt-[275px]">
            <div ref="assetsWrap" :style="{ width: totalWidth + 'px' }"
                class="assets_wrap flex overflow-hidden snap-x snap-mandatory w-full">
                <div class="asset image image-loaded flex-none snap-center relative ml-1"
                    v-for="(asset, index) in assets" :key="index">
                    <div class="wrap">
                        <div class="img">
                            <img :src="asset.src" :alt="asset.alt" class="h-550 object-contain" @load="handleImageLoad">
                        </div>
                        <!-- <div class="image_text_container bg-white p-3" :style="{ width: asset.textWidth + 'px' }">
                            <p>{{ asset.text }}</p>
                        </div>
                        <div class="caption_cta cursor-pointer">info</div>
                        <div class="caption_close cursor-pointer">×</div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import image1 from '@/assets/images/image8.jpg'
import image2 from '@/assets/images/image9.jpg'
import image3 from '@/assets/images/image10.jpg'
import image4 from '@/assets/images/image11.jpg'
import image5 from '@/assets/images/image12.jpg'
import image6 from '@/assets/images/image13.jpg'
import image7 from '@/assets/images/image14.jpg'
const assets = ref([
    { src: image1, alt: 'Image 1', text: 'test', textWidth: 299 },
    { src: image2, alt: 'Image 2', text: 'test', textWidth: 299 },
    { src: image3, alt: 'Image 3', text: 'test', textWidth: 299 },
    { src: image4, alt: 'Image 4', text: 'test', textWidth: 299 },
    { src: image5, alt: 'Image 5', text: 'test', textWidth: 299 },
    { src: image6, alt: 'Image 6', text: 'test', textWidth: 299 },
    { src: image7, alt: 'Image 7', text: 'test', textWidth: 299 },
])
const totalWidth = ref(0)

const handleImageLoad = () => {
    calculateWidth()
}

const calculateWidth = () => {
    nextTick(() => {
        const margin = 4 // 0.25rem = 4px
        const images = document.querySelectorAll('.img img')
        totalWidth.value = Array.from(images).reduce((acc, img) => {
            return acc + img.width + margin
        }, 0)
    })
}


onMounted(() => {
    calculateWidth()
})
</script>

<style scoped>
/* Custom styles */
.gallery #content {
    min-height: 550px;
}

.gallery .assets_wrap {
    scroll-snap-type: x mandatory;
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
}

.gallery .assets_wrap .asset {
    scroll-snap-align: center;
}

.gallery .image .img img {
    height: 550px;
    width: auto;
    display: block;
}

.gallery .image_text_container {
    padding: 0.75em 0.75em 0 0;
    color: #333333;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    background-color: white;
}

.caption_cta {
    cursor: pointer;
}

.caption_close {
    cursor: pointer;
}
</style>