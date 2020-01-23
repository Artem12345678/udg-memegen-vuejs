<template>
  <ul class="social">
    <li v-for="(item, index) in links" :key="index" class="social__item">
      <SocialListItem :url="item.url" :icon="item.icon"/>
    </li>
  </ul>
</template>

<script>
import SocialListItem from '@/components/SocialListItem/SocialListItem.vue';

export default {
  name: 'SocialList',
  components: {
    SocialListItem,
  },
  data() {
    return {
      links: [
        {
          url: 'https://www.github.com/Artem12345678',
          icon: 'github',
        },
        {
          url: 'https://www.instagram.com/ystimenkoartem',
          icon: 'instagram',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
  .social {
    display: flex;
    list-style-type: none;

    &__item {
      position: relative;
      z-index: 1;
      display: inline-block;
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
