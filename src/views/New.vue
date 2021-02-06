<template>
    <form class="card" @click.prevent="$emit('sendForm')">
        <h1>Создать новую задачу</h1>
        <div class="form-control" v-for="item in formDesc" :key="item.id"
             @change="$emit('selectedItem',$event.target)">
            <label :for="item.id" v-if="item.type">
                {{ item.title }}
                <input :type="item.type"
                       :id="item.id"
                       ref="arr"
                       @click="$event.stopPropagation()">
            </label>
            <label :for="item.id" v-else>
                {{ item.title }}
                <textarea :id="item.id"></textarea>
            </label>
        </div>
        <button class="btn primary">Создать</button>
    </form>
</template>

<script>

export default {
    emits: {
        sendForm: null,
        selectedItem(event) {
            if (event.value) {
                return true
            }
            confirm('Вы уверенны что хотите оставить поле пустым???')
            return false
        }
    },
    props: {
        formDesc: {
            type: Object,
            required: true
        }
    }
}
</script>