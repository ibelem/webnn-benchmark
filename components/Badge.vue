<template>
  <div class="webnnbadge">
    <div class="webnn-title">
      WebNN API
    </div>
    <div v-if="isNN" class="webnn-status webnn-status-true">
      <span>{{ $t('badge.s') }}</span>
    </div>
    <div v-else class="webnn-status webnn-status-false">
      <span>{{ $t('badge.ns') }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Badge',
  data() {
    return {
      isNN: false
    }
  },
  mounted: function() {
    setTimeout(this.isWebNN, 100)
  },
  methods: {
    isWebNN: function() {
      if (navigator.ml && navigator.ml.getNeuralNetworkContext()) {
        if (!navigator.ml.isPolyfill) {
          this.isNN = true
        } else {
          this.isNN = false
        }
      } else {
        this.isNN = false
      }
    }
  },
  destoryed() {
    clearTimeout(this.isWebNN)
  }
}
</script>

<style scoped>
.webnnbadge {
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.webnn-title {
  display: inline-block;
  border: 1px solid rgba(222, 12, 101, 0.9);
  background: rgba(222, 12, 101, 0.9);
  color: rgba(255, 255, 255, 1);
  padding: 0.2rem 0.5rem;
}

.webnn-title:hover {
  border: 1px solid rgba(222, 12, 101, 0.9);
  background: rgba(222, 12, 101, 1);
}

.webnn-status {
  display: inline-block;
  color: rgba(255, 255, 255, 1);
  padding: 0.2rem 0.5rem;
  margin-left: -6px;
  min-width: 100px;
  text-align: center;
}

.webnn-status:hover {
  background: rgba(222, 12, 101, 0.01);
}

.webnn-status-false:hover {
  border: 1px solid rgba(222, 12, 101, 0.1);
  background: rgba(222, 12, 101, 0.01);
}

.webnn-status-false {
  background: rgba(213, 213, 213, 0);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.65);
}

.webnn-status-true {
  background: transparent;
  color: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(222, 12, 101, 0.9);
}

@media (max-width: 768px) {
  .webnnbadge {
    font-size: 0.75rem;
  }
  .webnn-title,
  .webnn-status {
    padding: 0.25rem 0.5rem;
  }
}
</style>
