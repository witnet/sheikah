<template>
  <div class="carousel-container">
    <div class="card--to__left" @click="moveCarousel(-1)" :disabled="headOfList">
      <font-awesome-icon class="icon-left" icon="angle-left" />
    </div>
    <div class="card">
      <div class="card--overflow-container">
        <div class="card-cards">
          <transition-group tag="div" :class="animate" :name="animate">
            <div class="card--card" v-for="source in sources.slice(counter)" :key="source.index">
              <div v-if="source" class="content">
                <div class="header">
                  <h3 class="source-header">
                    Source
                    <span class="index">{{ source.index }}</span>
                  </h3>
                  <button class="delete-btn" @click="deleteSource(source.index)">
                    <font-awesome-icon class="icon" icon="trash" />
                  </button>
                </div>
                <div class="header-operators">
                  <Select
                    class="select"
                    v-model="source.kind"
                    @change="
                      selectValue =>
                        updateSource({ kind: selectValue, url: source.url }, source.index)
                    "
                    :options="[{ value: 'HTTPS_GET', primaryText: 'HTTPS_GET' }]"
                  />
                  <div>
                    <input
                      class="input"
                      placeholder="url"
                      type="text"
                      v-model="source.url"
                      @change="
                        e => updateSource({ kind: source.kind, url: e.target.value }, source.index)
                      "
                    />
                  </div>
                  <div class="header-operators">
                    <Select
                      class="select"
                      v-model="source.kind"
                      @change="
                        selectValue =>
                          updateSource({ kind: selectValue, url: source.url }, source.index)
                      "
                      :options="[{ value: 'HTTPS_GET', primaryText: 'HTTPS_GET' }]"
                    />
                    <div>
                      <input
                        class="input"
                        placeholder="url"
                        type="text"
                        v-model="source.url"
                        @change="
                          e =>
                            updateSource({ kind: source.kind, url: e.target.value }, source.index)
                        "
                      />
                    </div>
                    <div class="button-container">
                      <button class="add-operators-btn">Add operators</button>
                    </div>
                  </div>
                </div>
              </div>
              <button @click="addSource" class="add-source">
                <img src="@/resources/svg/add.svg" />
              </button>
            </div>
          </transition-group>
          <button @click="addSource" class="add-source">
            <img src="@/resources/svg/add.svg" />
          </button>
        </div>
      </div>
      <div class="card--to__right" @click="moveCarousel(1)" :disabled="endOfList">
        <font-awesome-icon class="icon-right" icon="angle-right" />
      </div>
    </div>
  </div>
</template>

<script>
import Select from '@/components/Select'

export default {
  name: 'Carousel',
  props: {
    sources: Array,
  },
  components: {
    Select,
  },
  updated() {
    console.log(this.sources)
  },
  data() {
    console.log(this.sources)
    return {
      counter: 0,
      animate: 'slide-right',
    }
  },
  computed: {
    endOfList() {
      return this.counter === this.sources.length - 2 || this.sources.length < 2
    },
    headOfList() {
      return this.counter === 0
    },
  },
  methods: {
    moveCarousel(direction) {
      const isMovingToTheRight = direction === 1
      const isMovingTotheLeft = direction === -1

      if (isMovingToTheRight && !this.endOfList) {
        this.animate = 'slide-right'
        this.counter++
      } else if (isMovingTotheLeft && !this.headOfList) {
        this.animate = 'slide-left'
        this.counter--
      }
    },
    addSource() {
      if (this.sources.length > 1) this.counter++
      this.$store.commit('pushRetrieve')
    },
    deleteSource(index) {
      this.$store.commit('deleteSource', { index })
      if (this.sources.length > 2) this.moveCarousel(-1)
    },
    updateSource: function(sourceInformation, sourceIndex) {
      console.log(sourceInformation)
      this.$store.commit('updateRetrieveSource', { source: sourceInformation, index: sourceIndex })
    },
  },
}
</script>
<style lang="scss" scoped>
.icon {
  color: rgba(255, 0, 0, 0.623);
  font-size: 18px;
}

.carousel-container {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  display: flex;
  justify-content: center;
  width: 70vw;

  &--overflow-container {
    overflow: hidden;
  }
  &--to__left .icon-left,
  &--to__right .icon-right {
    margin: auto;
    font-size: 40px;
    color: rgb(170, 168, 168);
  }
  &--to__left,
  &--to__right {
    background-color: #ecf5ff5e;
    height: 80vh;
    width: 5vh;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-content: center;
    &[disabled] {
      opacity: 0.2;
      border-color: #696a6b5e;
    }
  }
  &--to__left :active,
  &--to__right :active {
    transform: scale(0.9);
  }
}

.card-cards {
  display: flex;
  transform: translateX(0px);

  .add-source {
    padding: 50px;
    background-color: #ecf5ff5e;
    border: none;
    display: flex;
    justify-content: center;
    align-content: center;
    &:hover,
    &:active,
    &:focus {
      outline: none;
      cursor: pointer;
    }
    & img {
      width: 40px;
    }
  }
  .card--card {
    border-right: 2px solid #d4d4d475;
    z-index: 3;
    margin-left: 20px;

    .content {
      width: 25vw;
      height: 50vw;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      & > .header,
      & > .header-operators {
        margin: 30px;
      }
      .header {
        display: flex;
        .index {
          color: black;
        }
        .delete-btn {
          display: none;
        }
      }
      .header-operators {
        height: 50px;
        .select {
          margin: 0 0 8px 0;
        }
        .input {
          cursor: pointer;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 400;
          background-color: #d2dffb;
          color: #4d4d4d;
          border: 1px solid #d2dffb;
          width: 100%;
          padding: 8px;
        }
      }
      &:hover {
        .delete-btn {
          cursor: pointer;
          display: block;
          background-color: rgba(236, 233, 233, 0);
          border: none;
          padding: 0px;
          height: 10px;
          margin-left: auto;
        }
      }
      .button-container {
        text-align: center;

        .add-operators-btn {
          cursor: pointer;
          margin: 30px;
          width: 150px;
          padding: 5px;
          font-size: 18px;
          background-color: #1a6cfb;
          border-radius: 5px;
          color: white;
          font-family: 'Titillium Web';
          font-weight: bold;

          &:active,
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}

.slide-right {
  display: flex;
}
.slide-right-move {
  transition: all 600ms ease-in-out 50ms;
}
.slide-right-enter-active {
  transition: all 400ms ease-out;
}
.slide-right-leave-active {
  transition: all 200ms ease-in;
  position: absolute;
  z-index: 0;
}
.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
}

.slide-left {
  display: flex;
}
.slide-left-move {
  transition: all 200ms ease-in-out 30ms;
}
.slide-left-enter-active {
  transition: all 400ms ease-in;
}
.slide-left-leave-active {
  transition: all 600ms ease-out;
  position: absolute;
  z-index: 0;
}
.slide-left-enter,
.slide-left-leave-to {
  opacity: 0;
}
</style>
