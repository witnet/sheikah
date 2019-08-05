<template>
 <div class="carousel-container">
  <div class="card--to__left" @click="moveCarousel(-1)" :disabled="headOfList">
  <font-awesome-icon class="icon-left" icon="angle-left"/>
  </div>
  <div class="card">
    <div class="card--overflow-container">
      <div class="card-cards" >
        <div class="card--card" v-for="source in sources.slice(counter)" :key="source.index">
          <div v-if="source" class="content">
          <h3 class="sourceHeader">{{source.name}} <span class="index">#{{source.index}}</span></h3>
          <button class="delete-btn" @click="deleteSource(source.index)"><font-awesome-icon class="icon" icon="trash"/></button>
          </div>
        </div>
      <button @click="addSource" class="add-source">
        <img src="@/resources/svg/add.svg">
      </button>
      </div>
    </div>
  </div>
  <div class="card--to__right" @click="moveCarousel(1)" :disabled="endOfList">
  <font-awesome-icon class="icon-right" icon="angle-right"/>
  
  </div>
</div>
  
</template>

<script>
export default {
  name: 'Carousel',
  // props: {
  //   sources: Array,
  // },
  data() {
    return {
      counter: 0,
      sources: [
        { name: `Source `, index: 0},
      ]
    }
  },
  computed: {
    endOfList() {
      return this.counter === this.sources.length - 2 || this.sources.length < 2 
    },
    headOfList() {
      return this.counter === 0;
    },
  },
  methods: {
    moveCarousel(direction) {
      const isMovingToTheRight = direction === 1
      const isMovingTotheLeft = direction === -1

    if (isMovingToTheRight && !this.endOfList) {
      this.counter++
    } else if (isMovingTotheLeft && !this.headOfList) {
      this.counter--
    }
    },
    addSource(){
      if (this.sources.length > 1) this.counter++
      this.sources.push({name: `Source`, index: this.sources.length })
    },

    deleteSource(id){
      const deletedIndex = id
      this.sources.splice(id, 1)
      this.sources.map(source => {
      if(deletedIndex < source.index) return source.index--
      })
    },
  }
} 
</script>

<style lang="scss" scoped>

.icon{
  color:rgba(255, 0, 0, 0.623);
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
  &--to__right .icon-right{
    margin: auto;
    font-size: 40px;
    color:rgb(170, 168, 168);
  }
  &--to__left, &--to__right{
    background-color: #ecf5ff5e;
    height: 80vh;
    width: 5vh;
    cursor: pointer;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-content: center;
    &[disabled] {
      opacity: 0.2;
      border-color: #696a6b5e;
    }
  }
  &--to__left :active, &--to__right :active{
    transform: scale(0.9);
  }
}

.card-cards {
  display: flex;
  transition: transform 150ms ease-out;
  transform: translatex(0px);

  .add-source{
    padding: 50px;
    background-color: #ecf5ff5e;
    border: none;
    display: flex;
    justify-content: center;
    align-content: center;

    &:hover, &:active, &:focus{
      outline: none;
      cursor: pointer;
    }

    & img{
      width: 40px;
    }
  }

  .card--card {
    margin: 0 10px;
    cursor: pointer;
    box-shadow: 0 4px 15px 0 rgba(40,44,53,.06), 0 2px 2px 0 rgba(40,44,53,.08);
    border-radius: 4px;
    z-index: 3;
    background-color: rgba(206, 206, 206, 0.52);

    .content {
      width: 25vw;
      height: 50vw;
      font-size: 20px;
      padding: 40px;
      font-weight: bold;
      display: flex;

      .index{
        color:rgba(0, 0, 255, 0.76)
      }

      .delete-btn {
        display: none;
      }

      &:hover {
        .delete-btn {
          cursor: pointer;
          display: block;
          background-color: rgba(206, 206, 206, 0);
          border: none;
          padding: 0px;
          height: 10px;
          margin-left: auto;
        }
      }
    }
  }
}
</style>