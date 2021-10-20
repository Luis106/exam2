	import axios from "axios";

	const state = {
		BacklogList: [],
		InProgressList: [],
		CompletedList: []
	};
	const getters = {

		getBacklogList: (state) => state.BacklogList,
		getInProgressList: (state) => state.InProgressList,
		getCompletedList: (state) => state.CompletedList
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
		async changeStatus({commit, state}, {taskIndex, taskType}) {
			let currentTask;
			if (taskType === "NEW") {
				currentTask = state.createdTaskList[taskIndex]
			} else {
				currentTask = state.doneTaskList[taskIndex]
			}
			const taskCopy = currentTask;
			taskCopy['status'] = currentTask['status'] === "NEW"? "DONE": "NEW";

			const response = await axios.put(
				`http://localhost:3000/tasks/${currentTask.id}`,
				taskCopy
			)

			if (response.status !== 500){
				if (taskType === "NEW") {
					commit("CHANGE_NEW_TASK_STATUS", taskIndex);
				} else {
					commit("CHANGE_DONE_TASK_STATUS", taskIndex);
				}
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
		SET_DONE_TASKS(state, newTaskList) {
			state.doneTaskList = newTaskList;
		},
		CHANGE_NEW_TASK_STATUS(state, taskIndex) {
			state.createdTaskList[taskIndex]['status'] = "DONE";
			state.doneTaskList.push(state.createdTaskList[taskIndex]);
			state.createdTaskList.splice(taskIndex, 1);
		},
		CHANGE_DONE_TASK_STATUS(state, taskIndex) {
			state.doneTaskList[taskIndex]['status'] = "NEW";
			state.createdTaskList.push(state.doneTaskList[taskIndex]);
			state.doneTaskList.splice(taskIndex, 1);
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
