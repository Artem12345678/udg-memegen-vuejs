<template>
  <footer class="footer bg-secondary">
    <div class="container">
      <div class="footer__nav">
        <b-nav>
          <b-nav-item to="/" link-classes="nav-link--footer">Home</b-nav-item>
        </b-nav>

        <div class="footer__social">
          <SocialList/>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import SocialList from '@/components/SocialList/SocialList.vue';

export default {
  name: 'Footer',
  components: {
    SocialList,
  },
};
</script>

<style lang="scss" scoped>
  .footer {
    padding: 30px 0;

    &__nav {
      display: flex;
      justify-content: space-between;
    }
  }

  .nav-link {
    &--footer {
      color: #fff;

      &:hover,
      &:focus,
      &:active {
        color: darken(#fff, 10%)
      }
    }
  }
</style>
