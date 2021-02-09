<template>
    <form class="card" @submit.prevent="submit">
        <h1>Создать новую задачу</h1>
        <div class="form-control"
             v-for="item in formDesc"
             :key="item.id">
            <label :for="item.id" v-if="item.type">
                {{ item.title }}
                <input :type="item.type"
                       :id="item.id"
                       @change="isValue($event.target)"
                >
            </label>
            <label :for="item.id" v-else>
                {{ item.title }}
                <textarea :id="item.id" v-model="description"></textarea>
            </label>
        </div>
        <button class="btn primary" :disabled="!isDisable">Создать</button>
    </form>
</template>

<script>
export default {
    // props: {
    //     formDesc: {
    //         type: Array,
    //         required: true
    //     }
    // },
    data() {
        return {
            title: '',
            date: '',
            description: ''
        }
    },
    computed: {
        isDisable() {
            return !!(this.title && this.date && this.description)
        }
    },
    inject: [
        'formDesc',
        'sendForm',
        'loadTask'
    ],
    methods: {
        submit() {
            this.sendForm({
                title: this.title,
                date: this.date,
                description: this.description
            })
            this.loadTask()
            this.$router.push('/tasks')
        },
        isValue(event) {
            if (event.type === 'text') {
                this.title = event.value
            } else {
                this.date = event.value
            }
        }

    }
}
</script>