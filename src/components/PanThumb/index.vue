<template>
  <div :style="{zIndex:zIndex,height:height,width:width}" class="pan-item">
    <div class="pan-info">
      <div class="pan-info-roles-container">
        <slot />
      </div>
    </div>
    <!-- eslint-disable-next-line -->
    <div :style="{backgroundImage: `url(${image})`}" class="pan-thumb"></div>
  </div>
</template>

<script>
export default {
  name: 'PanThumb',
  props: {
    image: {
      type: String,
      required: true
    },
    zIndex: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: '150px'
    },
    height: {
      type: String,
      default: '150px'
    }
  }
}
</script>

<style scoped>
.pan-item {
  position: relative;
  display: inline-block;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  cursor: default;
}

.pan-info-roles-container {
  padding: 20px;
  text-align: center;
}

.pan-thumb {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-position: center center;
  background-size: cover;
  border-radius: 50%;
  transform-origin: 95% 40%;
  transition: all 0.3s ease-in-out;
}

/* .pan-thumb:after {
  content: '';
  width: 8px;
  height: 8px;
  position: absolute;
  border-radius: 50%;
  top: 40%;
  left: 95%;
  margin: -4px 0 0 -4px;
  background: radial-gradient(ellipse at center, rgba(14, 14, 14, 1) 0%, rgba(125, 126, 125, 1) 100%);
  box-shadow: 0 0 1px rgba(255, 255, 255, 0.9);
} */

.pan-info {
  position: absolute;
  width: inherit;
  height: inherit;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
}

.pan-info h3 {
  position: relative;
  height: 85px;
  margin: 0 60px;
  padding: 22px 0 0 0;
  color: #fff;
  font-size: 18px;
  font-family: 'Open Sans', Arial, sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 0 0 1px #fff, 0 1px 2px rgba(0, 0, 0, 0.3);
}

.pan-info p {
  margin: 0 30px;
  padding: 10px 5px;
  color: #fff;
  font-size: 12px;
  font-style: italic;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
}

.pan-info p a {
  display: block;
  width: 80px;
  height: 80px;
  margin: 7px auto 0;
  padding-top: 24px;
  color: #333;
  color: #fff;
  font-weight: 700;
  font-size: 9px;
  font-family: 'Open Sans', Arial, sans-serif;
  font-style: normal;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translateX(60px) rotate(90deg);
  opacity: 0;
  transition: transform 0.3s ease-in-out 0.2s, opacity 0.3s ease-in-out 0.2s, background 0.2s linear 0s;
}

.pan-info p a:hover {
  background: rgba(255, 255, 255, 0.5);
}

.pan-item:hover .pan-thumb {
  transform: rotate(-110deg);
}

.pan-item:hover .pan-info p a {
  transform: translateX(0) rotate(0deg);
  opacity: 1;
}
</style>
