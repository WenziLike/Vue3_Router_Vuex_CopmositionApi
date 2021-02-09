<template>
    <h1 class="text-white center" v-if="!task.length">Задач пока нет</h1>
    <template v-else>
        <h3 class="text-white">Всего активных задач: 0</h3>
        <div class="card" v-for="item in task" :key="item.id">
            {{ item.title }}
            <h2 class="card-title">
                <AppStatus :type="'done'"/>
            </h2>
            <p>
                <strong>
                    <small>
                        {{ new Date().toLocaleDateString() }}
                    </small>
                </strong>
            </p>
            <button class="btn primary">Посмотреть</button>
        </div>
    </template>
</template>

<script>
import AppStatus from '../components/AppStatus'

export default {
    props: {
        task: {
            type: Array,
            required: true
        }
    },
    components: { AppStatus }
}
</script>
