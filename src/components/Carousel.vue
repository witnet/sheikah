<template>
  <div class="carousel-container">
    <div
      class="card--to__left"
      :disabled="headOfList"
      @click="moveCarousel(-1)"
    >
      <font-awesome-icon class="icon-left" icon="angle-left" />
    </div>
    <div class="card">
      <div class="card--overflow-container">
        <div class="card-cards">
          <transition-group tag="div" :class="animate" :name="animate">
            <div
              v-for="(source, index) in sources.slice(counter)"
              :key="source.index"
              class="card--card"
            >
              <div v-if="source" class="content" data-test="source-content">
                <div class="header">
                  <h3 class="source-header">
                    Source
                    <span class="index">{{ source.index }}</span>
                  </h3>
                  <button
                    data-test="delete-source-btn"
                    class="delete-btn"
                    @click="deleteSourceAndMove(source.index)"
                  >
                    <font-awesome-icon class="icon" icon="trash" />
                  </button>
                </div>
                <div class="header-operators">
                  <el-select v-model="selectedOperator[index]" class="select">
                    <el-option
                      v-for="item in ['HTTPS_GET']"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                  <div>
                    <el-input
                      v-model="source.url"
                      class="input"
                      placeholder="url"
                      type="text"
                      @input="
                        e => update({ kind: source.kind, url: e }, source.index)
                      "
                    />
                  </div>
                  <RadonScript
                    :script="source.script"
                    stage="retrieve"
                    :source-index="source.index"
                    :script-id="source.scriptId"
                  />
                </div>
              </div>
            </div>
          </transition-group>
          <button
            data-test="add-source-btn"
            class="add-source"
            @click="addSourceToCarousel"
          >
            <img src="@/resources/svg/add-grey.svg" />
          </button>
        </div>
      </div>
    </div>
    <div class="card--to__right" :disabled="endOfList" @click="moveCarousel(1)">
      <font-awesome-icon class="icon-right" icon="angle-right" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

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
  components: {
    RadonScript,
  },
  props: {
    sources: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      counter: 0,
      animate: 'slide-right',
    }
  },
  computed: {
    ...mapState({
      isMoveCarouselActivated: state => {
        return state.rad.moveCarousel
      },
    }),
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
        this.updateTemplate({
          // add id and value
        })
      },
    },
  },
  watch: {
    isMoveCarouselActivated() {
      if (this.isMoveCarouselActivated === 'right' && this.sources.length > 2) {
        this.moveCarousel(-1)
        this.clearMoveCarousel()
      } else if (this.isMoveCarouselActivated === 'left') {
        this.moveCarousel(1)
        this.clearMoveCarousel()
      }
    },
  },
  methods: {
    ...mapMutations({
      addSource: ADD_SOURCE,
      deleteSource: DELETE_SOURCE,
      updateSource: UPDATE_SOURCE,
      clearMoveCarousel: CLEAR_MOVE_CAROUSEL,
    }),
    ...mapActions({
      updateTemplate: UPDATE_TEMPLATE,
    }),
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
    addSourceToCarousel() {
      if (this.sources.length > 1) this.counter++
      this.addSource()
    },
    deleteSourceAndMove(index) {
      this.deleteSource({ index })
      if (this.sources.length > 2) this.moveCarousel(-1)
    },
    update(sourceInformation, sourceIndex) {
      this.updateSource({ source: sourceInformation, index: sourceIndex })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.icon {
  color: $red-2;
  font-size: 14px;
}

.carousel-container {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 24px 24px 0 24px;
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
    color: $alt-grey-2;
    font-size: 40px;
    margin: auto;
  }

  &--to__left,
  &--to__right {
    align-content: center;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    height: 80vh;
    justify-content: center;
    width: 5vh;

    &[disabled] {
      border-color: $alt-grey-5;
      opacity: 0.2;
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
  transform: translateX(0);

  .add-source {
    align-content: center;
    background: transparent;
    border: none;
    display: flex;
    height: 100px;
    justify-content: center;
    padding: 40px;

    &:hover,
    &:active,
    &:focus {
      cursor: pointer;
      outline: none;
    }

    img {
      width: 40px;
    }
  }

  .card--card {
    background-color: $white;
    border-radius: 20px;
    box-shadow: 1px 3px 11px 0 rgba(207, 207, 207, 0.329);
    margin-left: 30px;
    z-index: 3;

    .content {
      display: flex;
      flex-direction: column;
      font-size: 18px;
      font-weight: bold;
      height: 700px;
      min-width: 300px;
      overflow-y: auto;

      .header,
      .header-operators {
        margin: 32px;
      }

      .header {
        display: flex;
        max-height: 18px;

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
          width: 100%;
        }

        .input {
          color: $alt-grey-5;
          cursor: pointer;
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
  position: absolute;
  transition: all 200ms ease-in;
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
  position: absolute;
  transition: all 600ms ease-out;
  z-index: 0;
}

.slide-left-enter,
.slide-left-leave-to {
  opacity: 0;
}
</style>
