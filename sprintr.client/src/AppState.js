import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  projects: [],
  activeProject: [],
  backlogitems: [],
  activeBacklog: [],
  sprints: [],
  activeSprint: [],
  notes: [],
  tasks: [],
  activeTask: []
})
