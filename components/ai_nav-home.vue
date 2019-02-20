<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 224 56" width="168" height="42">
            <defs><clipPath id="_clipPath_3kp6XmP9DdK05Pm9I8veyngzPjTE0jr3"><rect width="224" height="56"/></clipPath></defs>
            <g clip-path="url(#_clipPath_3kp6XmP9DdK05Pm9I8veyngzPjTE0jr3)"><rect x="172.75" y="5.5" width="40" height="21" transform="matrix(1,0,0,1,0,0)" fill="rgba(222, 12, 101, 1.0)" fill-opacity="0.9"/>
              <g transform="matrix(0.25,0,0,0.25,4,-3)"><text id="l1" transform="matrix(1,0,0,1,0,180)" style="font-size:200px;fill:#FFFFFF;stroke:none;">a</text></g>
              <g transform="matrix(0.25,0,0,0.25,27.00,-3)"><text id="l2" transform="matrix(1,0,0,1,0,180)" style="font-size:200px;fill:#FFFFFF;stroke:none;">i</text></g>
              <g transform="matrix(0.25,0,0,0.25,35.00,-3)"><text id="l3" transform="matrix(1,0,0,1,0,180)" style="font-size:200px;fill:#FFFFFF;stroke:none;">m</text></g>
              <g transform="matrix(0.25,0,0,0.25,79.25,-3)"><text id="l4" transform="matrix(1,0,0,1,0,180)" style="font-size:200px;fill:#FFFFFF;stroke:none;">a</text></g>
              <g transform="matrix(0.25,0,0,0.25,104,-3)"><text id="l5" transform="matrix(1,0,0,1,0,180)" style="font-size:200px;fill:#FFFFFF;stroke:none;">r</text></g>
              <g transform="matrix(0.25,0,0,0.25,120,-3)"><text id="l6" transform="matrix(1,0,0,1,0,180)" style="font-size:200px;fill:#FFFFFF;stroke:none;">k</text></g>
              <g transform="matrix(0.25,0,0,0.25,147.25,5.5)"><text class="l7" transform="matrix(1,0,0,1,0,64.8)" style="font-size:72px;fill:#FFFFFF;stroke:none;">for</text></g>
              <g transform="matrix(0.25,0,0,0.25,175.5,5.25)"><text class="l7" transform="matrix(1,0,0,1,0,64.8)" style="font-size:72px;fill:#FFFFFF;stroke:none;">w</text></g>
              <g transform="matrix(0.25,0,0,0.25,189.25,5.25)"><text class="l7" transform="matrix(1,0,0,1,0,64.8)" style="font-size:72px;fill:#FFFFFF;stroke:none;">e</text></g>
              <g transform="matrix(0.25,0,0,0.25,199.75,5.25)"><text class="l7" transform="matrix(1,0,0,1,0,64.8)" style="font-size:72px;fill:#FFFFFF;stroke:none;">b</text></g>
            </g>
          </svg>
      </nuxt-link>
      <div class="navbar-burger burger" data-target="navMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  
    <div id="navMenu" class="navbar-menu">
      <div class="navbar-start">
      </div>
      <div class="navbar-end">
        <a class="navbar-item" href="../benchmark">
            Benchmark
          </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <nuxt-link class="navbar-item" to="../test">
            Tests
          </nuxt-link>
          <div class="navbar-dropdown is-boxed">
            <a class="navbar-item" href="../test/MobileNet">
                MobileNet V1
              </a>
            <a class="navbar-item" href="../test/MobileNet2">
                MobileNet V2
              </a>
            <a class="navbar-item" href="../test/SqueezeNet">
                SqueezeNet
              </a>
            <a class="navbar-item" href="../test/Inception3">
                Inception V3
              </a>
            <a class="navbar-item" href="../test/SSDMobileNet">
                SSD MobileNet
              </a>
            <a class="navbar-item" href="../test/PoseNet">
                PoseNet
              </a>
          </div>
        </div>
        <nuxt-link class="navbar-item" to="../ranking">
          Ranking
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "ai_nav-home",
    mounted() {
      let navbar = document.querySelector(".navbar-burger");
      navbar.addEventListener("click", function() {
        let target = navbar.dataset.target;
        let $target = document.getElementById(target);
        navbar.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    }
  };
</script>

<style scoped>
  svg {
    font-family: "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-weight: 200;
    font-style: normal;
  }
  
  svg text {
    stroke-dasharray: 100% 0;
  }
  
  svg #l1 {
    animation: stroke-offset 0.25s ease-out;
  }
  
  svg #l2 {
    animation: stroke-offset 0.25s ease-out;
  }
  
  svg #l3 {
    animation: stroke-offset 0.65s ease-out;
  }
  
  svg #l4 {
    animation: stroke-offset 0.85s ease-out;
  }
  
  svg #l5 {
    animation: stroke-offset 0.95s ease-out;
  }
  
  svg #l6 {
    animation: stroke-offset 1.0s ease-out;
  }
  
  svg .l7 {
    animation: stroke-offset 2.0s ease-in;
  }
  
  svg rect {
    animation: stroke-offset 2.0s ease-in;
  }
  
  @keyframes stroke-offset {
    0% {
      fill-opacity: 0;
      stroke-width: 0;
      stroke-dasharray: 0% 100%;
    }
    25% {
      stroke-width: 3px;
    }
    50% {
      fill-opacity: 0;
    }
    75% {
      stroke-width: 3px;
    }
    100% {
      stroke-width: 0;
    }
  }
  
  .navbar-item,
  .navbar-dropdown {
    background-color: transparent;
    color: rgba(255, 255, 255, 1.0);
  }
  
  .navbar-divider {
    height: 1px;
  }
</style>
