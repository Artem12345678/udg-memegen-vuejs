<template>
  <header class="header bg-primary">
    <div class="container">
      <b-navbar toggleable="lg" type="dark" >

        <b-navbar-brand class="brand" to="/">MemeGen</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/">Home</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss">
  .header {
    padding: 10px 0;
  }

  .brand {
    font-size: 56px !important;
    font-weight: 700 !important;
    display: block;
    letter-spacing: -1.4px !important;
    color: #fff !important;
  }
</style>
