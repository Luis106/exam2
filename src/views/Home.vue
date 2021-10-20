<template>
<div class="container py-5">

<p>Bienvendio {{getUser}} </p>
  <div class="wrapper">
    <div id="formContent">
      <!-- Login Form -->
       <label >Select list:</label>
        <select class="form-control" id="TaskStatus" aria-label=".form-select-lg example" >
          <option value="Backlog">Backlog</option>
          <option value="InProgress" selected>InProgress</option>
          <option value="Completed">Completed</option>
        </select>
        
       
        <input type="text"  id="tag" class="fadeIn first"  placeholder="Etiqueta">
        <input type="text"  id="description" class="fadeIn second"  placeholder="Descripción">
        <input type="button" v-on:click="addTask()" class="fadeIn thirt" value = "Registrar"> 
    </div>
  </div>
  
  <div class="row">


    <!-- Start lane -->
    <div class="col-12 col-lg-4">
      <div class="card mb-3">
        <div class="card-header bg-light">
          <h3 class="card-title h5 mb-1">
            Backlog
          </h3>
          <small class="mb-0 text-muted">
            Nam pretium turpis et arcu. Duis arcu.
          </small>
        </div>
        <div class="card-body">
          <div class="tasks" id="backlog">
            
            <ul class="todo-list" >
              <li
              v-for="(task, index) in getBacklogList"
              :key="task.taskId"
              >
              <taskComponent
                :description ="task.description"
                :index="index"
                :tag="task.tag"
                :status="task.status"
                @Delete="deleteTask"
                @Change="changeStatus"
              ></taskComponent>
              </li>
            </ul>

    
          </div>  
        </div>
      </div>
    </div>
    <!-- End lane -->

    <!-- Start lane -->
    <div class="col-12 col-lg-4">
      <div class="card mb-3">
        <div class="card-header bg-light">
          <h3 class="card-title h5 mb-1">
            In Progress
          </h3>
          <small class="mb-0 text-muted">
            Aenean posuere, tortor sed cursus feugiat.
          </small>
        </div>
        <div class="card-body">
          <div class="tasks" id="progress">
           <!-- Start task -->
           <ul class="todo-list" >
              <li
              v-for="(task, index) in getInProgressList"
              :key="task.taskId"
              >
              <taskComponent
                :description ="task.description"
                :index="index"
                :tag="task.tag"
                :status="task.status"
                @Delete="deleteTask"
                @Change="changeStatus"
              ></taskComponent>
              </li>
            </ul>
              <!-- End Task -->
          </div>
          
        </div>
      </div>
    </div>
    <!-- End lane -->

    <!-- Start lane -->
    <div class="col-12 col-lg-4">
      <div class="card mb-3">
        <div class="card-header bg-light">
          <h3 class="card-title h5 mb-1">
            Completed
          </h3>
          <small class="mb-0 text-muted">
            Curabitur ligula sapien, tincidunt non.
          </small>
        </div>
        <div class="card-body">
          <div class="tasks" id="completed">
            <!-- Start task -->
          <ul class="todo-list" >
              <li
              v-for="(task, index) in getCompletedList"
              :key="task.taskId"
              >
              <taskComponent
                :description ="task.description"
                :index="index"
                :tag="task.tag"
                :status="task.status"
                @Delete="deleteTask"
                @Change="changeStatus"
              ></taskComponent>
              </li>
            </ul>
            <!-- End task -->
            
          </div>
          
        </div>
      </div>
    </div>
    <!-- End lane -->



  </div>

  

<div class="wrapper"  id="Mode">
    <div id="formContent" v-if="showMod" >

      <label >Modificar la tarea: </label> <label id="Mindex"> </label> <label > de </label> <label id="Mstatus"> </label> <br>
      <!-- Login Form -->
       <label >Select list:</label>
        <select class="form-control" id="MTaskStatus" aria-label=".form-select-lg example" >
          <option value="Backlog">Backlog</option>
          <option value="InProgress" selected>InProgress</option>
          <option value="Completed">Completed</option>
        </select>
        
       
        <input type="text"  id="Mtag" class="fadeIn first"  placeholder="Etiqueta" >
        <input type="text"  id="Mdescription" class="fadeIn second"  placeholder="Descripción">
        <input type="button" id="Mbutt" v-on:click="modify()" class="fadeIn thirt" value = "Modificar"> 
    </div>
  </div>

</div>


</template>




<script>





//import axios from "axios";
import {mapGetters} from "vuex";
import dragula from "dragula"

dragula([
  document.getElementById('backlog'),
  document.getElementById('progress'),
  document.getElementById('completed')
]);

// Components
//import createTaskInput from '../components/createTaskInput';
import taskComponent from '../components/taskComponent';



export default {
name: "Home",
//el: "#Mode",
  data() {
    return {
      newTask:"",
      showMod: true,
      Mindex: null,
      Mstatus: "",
      User: ""
    }
  },
  computed:{
      ...mapGetters('tasks',[
          "getBacklogList",
          "getInProgressList",
          "getCompletedList",
          "getUser"
      ])
    },
  methods: {
     async getAllTasks(){


       
        const BacklogTasks = this.$store.getters["tasks/getBacklogList"];
        const InProgressList = this.$store.getters["tasks/getInProgressList"];
        const CompletedList = this.$store.getters["tasks/getCompletedList"];
      

        if (BacklogTasks && BacklogTasks.length === 0 || InProgressList && InProgressList.length === 0 || CompletedList && CompletedList.length === 0) {
          console.log("getAllTasks")
          await this.$store.dispatch("tasks/getAllTasks");
        }
      },
      generateID() {
        const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        return randLetter + Date.now();
      },
      async addTask(){
        
        const newTask = {
          taskId: this.generateID(),
          description: document.getElementById("description").value,
          status: document.getElementById("TaskStatus").value ,
          id:this.generateID(),
          tag: document.getElementById("tag").value 
        };
      console.log(newTask)
      await this.$store.dispatch("tasks/addTask", newTask);
        this.newTask = "";
      },
      async deleteTask(taskIndex,taskType){
         console.log(taskIndex + " " + taskType)
         await this.$store.dispatch("tasks/deleteTask", {taskIndex: taskIndex, taskType: taskType})
      },
      changeStatus(taskIndex, taskType){
        //location.href = "#";
        console.log(taskIndex + " " + taskType)
        this.showMod = true;
        var element = document.getElementById("Mode");
        //console.log(element)
        //location.href = "#Mode";
        element.scrollIntoView( {behavior: 'smooth', block: "center"});

        document.getElementById("Mbutt").disabled = false;

        document.getElementById("Mindex").innerHTML = taskIndex;
        document.getElementById("Mstatus").innerHTML = taskType;

        this.Mindex =taskIndex;
        this.Mstatus = taskType;

        if(taskType === "Backlog"){
          document.getElementById("Mtag").value = this.getBacklogList[taskIndex].tag;
          document.getElementById("Mdescription").value = this.getBacklogList[taskIndex].description;
          document.getElementById("MTaskStatus").value = taskType;
        }else if (taskType === "InProgress"){
          document.getElementById("Mtag").value = this.getInProgressList[taskIndex].tag;
          document.getElementById("Mdescription").value = this.getInProgressList[taskIndex].description;
          document.getElementById("MTaskStatus").value = taskType; 
        }else if (taskType === "Completed"){
          document.getElementById("Mtag").value = this.getCompletedList[taskIndex].tag;
          document.getElementById("Mdescription").value = this.getCompletedList[taskIndex].description;
          document.getElementById("MTaskStatus").value = taskType;
        }
      },
      async modify(){
        if(this.Mindex !== null){

          
          //console.log(document.getElementById("Mindex").innerHTML)
          //console.log(document.getElementById("Mstatus").innerHTML)

          
          const ind = this.Mindex;
          const st = this.Mstatus;


          const ModTask = {
            taskId: "",
            description: document.getElementById("Mdescription").value,
            status: document.getElementById("MTaskStatus").value ,
            id:"",
            tag: document.getElementById("Mtag").value 
          };
            //console.log(ModTask)
            await this.$store.dispatch("tasks/changeTask", {taskIndex: ind, taskType: st, ModTask: ModTask});
             location.reload();
             this.Mindex = null

        }else{
          alert("No se ha indicado la tarea a modificar")
        }
      }
  },
  created() {
   this.getAllTasks()
  },
  components: {
    taskComponent
  }
}




</script>

<style scoped>

ul {
  list-style-type: none;
}
 html, body {
  background: #e9ecef;
}

.cursor-grab {
  cursor: -webkit-grab;
  cursor: grab;
}

.tasks {
  min-height: 450px;
}

</style>
