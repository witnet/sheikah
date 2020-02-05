<template>
  <div class="carousel-container">
    <div class="card--to__left" @click="moveCarousel(-1)" :disabled="headOfList">
      <font-awesome-icon class="icon-left" icon="angle-left" />
    </div>
    <div class="card">
      <div class="card--overflow-container">
        <div class="card-cards">
          <transition-group tag="div" :class="animate" :name="animate">
            <div
              class="card--card"
              v-for="(source, index) in sources.slice(counter)"
              :key="source.index"
            >
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
                    v-model="selectedOperator[index]"
                    :options="[{ primaryText: 'HTTPS_GET' }]"
                    type="operator"
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
                  <RadonScript
                    :script="source.script"
                    stage="retrieve"
                    :sourceIndex="source.index"
                    :scriptId="source.scriptId"
                  />
                </div>
              </div>
            </div>
          </transition-group>
          <button @click="addSource" class="add-source">
            <img src="@/resources/svg/add-grey.svg" />
          </button>
        </div>
      </div>
    </div>
    <div class="card--to__right" @click="moveCarousel(1)" :disabled="endOfList">
      <font-awesome-icon class="icon-right" icon="angle-right" />
    </div>
  </div>
</template>

<script>
import Select from '@/components/Select'
import RadonScript from '@/components/RadonScript'
import {
  CLEAR_MOVE_CAROUSEL,
  UPDATE_TEMPLATE,
  ADD_SOURCE,
  DELETE_SOURCE,
  UPDATE_SOURCE,
} from '@/store/mutation-types'

export default {
  name: 'Carousel',
  props: {
    sources: Array,
  },
  components: {
    Select,
    RadonScript,
  },
  data() {
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
    selectedOperator: {
      get() {
        return this.sources.map(source => {
          return {
            primaryText: source.kind,
          }
        })
      },
      // eslint-disable-next-line
      set(inputValue) {
        this.$store.dispatch(UPDATE_TEMPLATE, {
          // add id and value
        })
      },
    },
    isMoveCarouselActivated() {
      return this.$store.state.rad.moveCarousel
    },
  },
  watch: {
    isMoveCarouselActivated() {
      if (this.isMoveCarouselActivated === 'right' && this.sources.length > 2) {
        this.moveCarousel(-1)
        this.$store.commit(CLEAR_MOVE_CAROUSEL)
      } else if (this.isMoveCarouselActivated === 'left') {
        this.moveCarousel(1)
        this.$store.commit(CLEAR_MOVE_CAROUSEL)
      }
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
      this.$store.commit(ADD_SOURCE)
    },
    deleteSource(index) {
      this.$store.commit(DELETE_SOURCE, { index })
      if (this.sources.length > 2) this.moveCarousel(-1)
    },
    updateSource(sourceInformation, sourceIndex) {
      this.$store.commit(UPDATE_SOURCE, { source: sourceInformation, index: sourceIndex })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.icon {
  color: $red-0;
  font-size: 14px;
}

.carousel-container {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  display: flex;
  justify-content: center;
  width: 70vw;

  &--overflow-container {
    height: 80vh;
    overflow: hidden;
  }
  &--to__left .icon-left,
  &--to__right .icon-right {
    margin: auto;
    font-size: 40px;
    color: $grey-2;
  }
  &--to__left,
  &--to__right {
    background-color: transparent;
    height: 80vh;
    width: 5vh;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-content: center;
    &[disabled] {
      opacity: 0.2;
      border-color: $grey-5;
    }
  }
  &--to__left :active,
  &--to__right :active {
    transform: scale(0.9);
  }
}

.card-cards {
  display: flex;
  padding: 8px;
  transform: translateX(0px);
  .add-source {
    background: transparent;
    padding: 40px;
    height: 100px;
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
    z-index: 3;
    margin-left: 30px;
    background-color: $white;
    box-shadow: 1px 3px 11px 0px rgba(207, 207, 207, 0.329);
    border-radius: 20px;

    .content {
      min-width: 25vw;
      height: 700px;
      font-size: 18px;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      & > .header,
      & > .header-operators {
        margin: 32px;
      }
      .header {
        max-height: 18px;
        display: flex;
        .index {
          color: $black;
        }
        .delete-btn {
          display: none;
        }
      }
      .header-operators {
        height: 53px;
        .select {
          margin: 0 0 8px 0;
        }
        .input {
          cursor: pointer;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 400;
          background-color: $alpha-blue;
          color: $grey-5;
          border: 1px solid $blue-0;
          width: 100%;
          padding: 8px;
          margin-bottom: 24px;
        }
      }
      &:hover {
        .delete-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          display: block;
          margin-left: auto;
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
