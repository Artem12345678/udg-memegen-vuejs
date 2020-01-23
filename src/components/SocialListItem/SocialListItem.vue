<template>
  <a class="social__link" :href="url" target="_blank">
    <img :src="image">
  </a>
</template>

<script>
import instagram from '../../assets/instagram.svg';
import github from '../../assets/github.svg';

export default {
  name: 'SociaItem',
  props: ['url', 'icon'],
  computed: {
    image() {
      return this.icon === 'instagram' ? instagram : github;
    },
  },
};
</script>

<style lang="scss" scoped>
  .social__link {
    display: flex;
    width: 28px;
    height: 28px;
    transition: border-color .25s ease-in-out;
    text-align: center;
    border: 1px solid transparent;
    border-radius: 50%;
    align-items: center;
    justify-content: center;

    &:focus,
    &:active,
    &:hover {
      border-color: #fff;
    }
  }
</style>
