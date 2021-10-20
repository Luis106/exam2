<template>
 <div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Tabs Titles -->

    <!-- Login Form -->

      <input type="text"  id="login" class="fadeIn second" name="login" placeholder="login">
      <input type="text"  id="password" class="fadeIn third" name="login" placeholder="password">
      <input type="submit" v-on:click="MLogin" class="fadeIn fourth">
   

    <!-- Remind Passowrd -->
    <div id="formFooter">
     <!-- <a class="underlineHover" href="#">Forgot Password?</a> ---->
    </div>

  </div>
</div>
</template>

<script>
  // Libraries
  import axios from 'axios';
  
 
  export default {
  name: "Login",
  data() {
    return {
      User: "",
      Password:""
    }
  },
    methods: {
      ChangesRoute(){
          this.currentView = "HOME";
          this.$router.push({path: "/HOME"}); 
      },
      async MLogin(){
        console.log("Login emite")
        try {
				const response = await axios.get(
					`http://localhost:3000/Login`
				);
				//console.log(response.data);

        if(response.data){
          this.User = response.data.User;
          this.Password = response.data.Password;

          console.log(this.User);
          console.log(this.Password);

          if(this.User === document.getElementById("login").value 
            && this.Password === document.getElementById("password").value){
              console.log("Contraseña Correcta")
              this.ChangesRoute()
            }else{
               console.log("Contraseña Incorrecta")
               alert("Contraseña Incorrecta");
            }
        }

			}catch (err) {
				console.log(err);
			}

      }
       
    },
    created() {
    
    }
  }
</script>

<style scoped>


</style>
