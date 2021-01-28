<template>
  <form class="card" @submit.prevent="sendServer">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input v-model.trim="title" type="text" id="title" />
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input v-model.lazy="data" type="date" id="date" />
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea v-model.trim="description" id="description"></textarea>
    </div>
    <router-link to="/home">
      <button class="btn primary" :disabled="disabled">Создать</button>
    </router-link>
  </form>
</template>
<script>
import { ref, reactive, toRefs, onUpdated } from 'vue'

export default {
  setup() {
    const task = reactive({
      title: '',
      data: null,
      description: '',
      disabled: true,
      counter: 1,
      status: value => {
        return ['active', 'done', 'cancelled', 'pending'].includes(value)
      }
    })

    const tasksDataBase = ref([])

    onUpdated(() => {
      if (task.title !== '' && task.description !== '' && task.data !== null) {
        task.disabled = false
        if (task.data > new Date().toJSON().slice(0, 10)) {
          console.log('max')
        } else {
          console.log('min')
        }
      } else {
        task.disabled = true
      }
    })
    async function sendServer() {
      await fetch(
        'https://vue-database-57694-default-rtdb.firebaseio.com/tasks.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: task.title,
            data: task.data,
            description: task.description,
            counter: task.counter
          })
        }
      )
      // const dataBase = await response.json()
      // console.log(dataBase)

      task.counter++
      task.title = ''
      task.data = null
      task.description = ''
    }

    async function getServer() {
      const response = await fetch(
        'https://vue-database-57694-default-rtdb.firebaseio.com/tasks.json'
      )
      const data = await response.json()
      // console.log(data)
      tasksDataBase.value = Object.keys(data).map(key => {
        return {
          id: key,
          ...data[key]
        }
      })
    }

    return {
      ...toRefs(task),
      task,
      tasksDataBase,
      sendServer,
      getServer
    }
  }
}
</script>