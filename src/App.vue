<template>
  <div id="app">
    
      
      <div class="today mb-5">
      
      </div>

      <div class="today mt-5">
        <!-- <button
            type="button"
            class="btn btn-light"
            v-on:click="changeCurrentView()"
        >Change View</button> -->
      </div> 

      <router-view></router-view>

   
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      currentView: "LOGIN"
    }
  },
  methods: {
    changeCurrentView(){
      if (this.currentView === "LOGIN") {
        this.currentView = "HOME";
        this.$router.push({path: "/HOME"});
      } else if(this.currentView === "HOME"){
        this.currentView = "LOGIN";
        this.$router.push({path: "/"})
      }
    }

  },
  created() {
  
  }
}

</script>

