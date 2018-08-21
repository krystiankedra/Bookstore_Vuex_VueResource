<template>
   <div class="container">
    <app-header></app-header>
    <transition name="slide" mode="out-in">
    <router-view></router-view>
    </transition>
    <app-footer></app-footer>
</div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
  },
}
</script>

<style>
  body {
    padding:30px;
    background: url("./assets/background.jpg")
  }
  .slide-enter-active {
    animation: slide-in 500ms ease-out forwards;
  }
  .slide-leave-active {
  animation: slide-out 500ms ease-out forwards;
  }
  @keyframes slide-in {
    from {
      opacity:0;
      transform: translateY(-20px);
    } to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slide-out {
    from {
      opacity: 1;
      transform: translateY(0);
    } to {
      opacity: 0;
      transform: translateY(-20px)
    }
  }
</style>
