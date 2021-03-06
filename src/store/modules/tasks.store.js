	import axios from "axios";

	let met;
	let taxttype2; 

	const state = {
		BacklogList: [],
		InProgressList: [],
		CompletedList: [],
		User: ""
	};
	const getters = {

		getBacklogList: (state) => state.BacklogList,
		getInProgressList: (state) => state.InProgressList,
		getCompletedList: (state) => state.CompletedList,
		getUser: (state) => state.User
	};
	const actions = {
		async getAllTasks({commit}) {
			try {
				const response = await axios.get(
					`http://localhost:3000/tasks?`
				);
				
				

				if (response.data){
					
					commit('SET_TAKS', response.data);
					
				}

			}catch (err) {
				console.log(err);
			}
		},
		async getUser({commit}) {
			try {
				const response = await axios.get(
					`http://localhost:3000/Login?User`
				);
				
				

				if (response.data){
					
					commit('SET_User', response.data);
					
				}

			}catch (err) {
				console.log(err);
			}
		},
		async changeTask({commit, state}, {taskIndex, taskType, ModTask}) {
			//console.log("ModTask")
			//console.log(ModTask)
			console.log(taskType)
			let currentTask;
			if (taskType === "Backlog") {
				currentTask = state.BacklogList[taskIndex]
			} else if (taskType === "InProgress") {
				currentTask = state.InProgressList[taskIndex]
			}else if (taskType === "Completed"){
				currentTask = state.CompletedList[taskIndex]
			}
		
		
			ModTask.id = currentTask.id
			ModTask.taskId = currentTask.taskId
			taxttype2 = taskType;
			
			
			//console.log(currentTask)
			//console.log(ModTask)
			met = ModTask;
			
			const response = await axios.put(
				`http://localhost:3000/tasks/${currentTask.id}`,
				ModTask
			)
			
			if (response.status != 500){
				
				commit("CHANGE_TASK_STATUS", taskIndex, taxttype2);
				
				
			}
		},
		async addTask({commit}, task){

			if (task !== ""){
				// add task to server
				try {
				const response = await axios.post(
					"http://localhost:3000/tasks",
					task
				);
				if (response.status !== 500) {
					commit("CREATE_TASK", response.data)
				
				} else {
					//alert("No se pudo crear la tarea")
					console.log("No se pudo crear la tarea")
				}
				
				} catch (err){
				console.log(err);
				}
			}
		},
		async deleteTask({commit, state}, {taskIndex, taskType}){
            let currentTask;
            
            if(taskType == "Backlog"){
                currentTask = state.BacklogList[taskIndex].id

            } else if (taskType == "InProgress") {
                currentTask = state.InProgressList[taskIndex].id

            }else if (taskType == "Completed") {
				currentTask = state.CompletedList[taskIndex].id
			}

            const response = await axios.delete(
                `http://localhost:3000/tasks/${currentTask}`
            )
    
            if (response.status != 500) {
                if (taskType === "Backlog") {
					commit("DELETE_Backlog_TASK", taskIndex);
				} else if (taskType === "InProgress") {
					commit("DELETE_InProgress_TASK", taskIndex);
				} else if (taskType === "Completed") {
					commit("DELETE_Completed_TASK", taskIndex);
				}
				
            }
        }

	};

	const mutations = {
		SET_TAKS(state, newTaskList) {
			
			for(var i in newTaskList){
				
				if (newTaskList[i].status === "Backlog"){
				
					state.BacklogList.push(newTaskList[i]);
				

				}else if(newTaskList[i].status  === "InProgress"){
				
					state.InProgressList.push(newTaskList[i]);

				}else if (newTaskList[i].status  === "Completed"){
				
					state.CompletedList.push(newTaskList[i]);
				}
			}
			//console.log(state.BacklogList);

		},
		SET_User(user) {
			
			for(var i in user){
				
				state.User = user[i]
				
			}
			//console.log(state.BacklogList);

		},
		CHANGE_TASK_STATUS(state, taskIndex,taskTYPE) {
			console.log(taxttype2)
			console.log(taskTYPE)
			console.log(taskIndex)

		

			if(taxttype2 === met.status){
				switch (taxttype2) {
					case "Backlog":
						console.log("En lista Backlog de primer switch")
						state.BacklogList[taskIndex] = met;
					break;
					case "InProgress":
						console.log("En lista InProgress de primer switch")
						state.InProgressList[taskIndex] = met;
					break;
					
					case "Completed":
						console.log("En lista complete de primer switch")
						console.log(met)
						state.CompletedList[taskIndex] = met;
						console.log("Final")
					break;
			}
		}else{

			switch (taxttype2) {
				case "Backlog":
					console.log("En lista Backlog de segundo switch")
					state.BacklogList.splice(taskIndex, 1);
				break;
				case "InProgress":
					console.log("En lista InProgress de segundo switch")
					state.InProgressList.splice(taskIndex, 1);
				break;
				
				case "Completed":
					console.log("En lista Completed de segundo switch")
					state.InProgressList.splice(taskIndex, 1);
				break;
		}

		switch (met.status) {
			case "Backlog":
				console.log("En lista Backlog de tercer switch")
				state.BacklogList.push(met)
			break;
			case "InProgress":
				console.log("En lista InProgress de tercer switch")
				state.InProgressList.push(met)
			break;
			
			case "Completed":
				console.log("En lista Completed de tercer switch")
				state.CompletedList.push(met)
			break;
			}	
		}
		
		},
		CREATE_TASK(state, task){
			if(task.status === "Backlog"){
				state.BacklogList.push(task);
			}else if (task.status === "InProgress"){
				state.InProgressList.push(task);
			}else if (task.status === "Completed"){
				state.CompletedList.push(task);
			}
		},
		DELETE_Backlog_TASK(state, taskIndex){
            state.BacklogList.splice(taskIndex, 1);
        },
        DELETE_InProgress_TASK(state, taskIndex){
            state.InProgressList.splice(taskIndex, 1);
		
        },
		DELETE_Completed_TASK(state, taskIndex){
            state.CompletedList.splice(taskIndex, 1);
		
        }
	};
	export default {
		namespaced: true,
		state : {
			...state
		},
		getters: {
			...getters
		},
		actions: {
			...actions
		},
		mutations: {
			...mutations
		}
	}
