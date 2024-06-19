<template>
  <div>

    <Head>
      <Title>Makeup-Irene</Title>
      <Meta name="description"
        content="Discover my makeup portfolio, featuring a variety of styles and techniques. From bridal makeup to editorial looks, explore my work and get inspired." />
      <Meta property="og:image" content="/images/portfolio-thumbnail.png" />
      <Meta property="og:title" content="My Makeup Portfolio - Showcasing the Best in Makeup Artistry" />
      <Meta property="og:description"
        content="Discover my makeup portfolio, featuring a variety of styles and techniques. From bridal makeup to editorial looks, explore my work and get inspired." />
      <Link rel="icon" href="/images/favicon.png" />
    </Head>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
const layout = "default";
</script>
<style lang="scss" scoped></style>