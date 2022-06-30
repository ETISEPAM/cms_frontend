/**
 * Displays expansible item headers
 * sending get and patch requests with axios
 */
<template>
    <div v-if="page === 'contentTypePage'" class="type-header row">
        <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
                <!-- {{ type.name.charAt(0) }} -->
                T
            </q-avatar>
        </q-item-section>

        <q-item-section>
            <q-item-label>{{ type.name }}</q-item-label>
            <q-item-label caption lines="1">{{ type.description }}</q-item-label>
        </q-item-section>

        <q-item-section side>
            <q-icon name="edit" class="cursor-pointer" />
            <q-popup-proxy cover :breakpoint="500">
                <q-card class="q-pa-md">
                    <div class="column">
                        <q-input type="text" color="teal" v-model="name" filled autofocus :placeholder="type.name"
                            @keyup.enter="
    updateTypeHeader(type.id, name ? name : type.name, description ? description : type.description);
                            ">
                            <template v-slot:prepend>
                                <q-icon name="text_fields" color="teal" />
                            </template>
                        </q-input>

                        <q-input type="textarea" color="teal" v-model="description" filled
                            :placeholder="type.description" @keyup.enter="
    updateTypeHeader(type.id, name ? name : type.name, description ? description : type.description);
                            ">
                            <template v-slot:prepend>
                                <q-icon name="text_fields" color="teal" />
                            </template>
                        </q-input>
                    </div>
                </q-card>
            </q-popup-proxy>
        </q-item-section>
    </div>
    <div v-else-if="page === 'contentPage'" class="content-header row">
        <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
                C
            </q-avatar>
        </q-item-section>
        <q-item-section>
            <q-item-label>{{ typeName }}</q-item-label>
            <q-item-label caption lines="1" class="row">
                <div v-for="tag in content.tag" :key="tag" class="q-pr-sm q-pt-sm">
                    <q-badge :color="themeController ? 'accent' : 'secondary'" :label="tag" rounded class="q-px-sm" />
                </div>
            </q-item-label>
        </q-item-section>
        <q-item-section side>
            <q-icon name="edit" class="cursor-pointer" />
            <q-popup-proxy cover :breakpoint="500">
                <q-card class="q-pa-md">
                    <div class="column">
                        <q-input v-model="tagArray" type="text" color="teal" dense autofocus
                            @keyup.enter="
                                updateTags(content.id, tagArray);
                            "
                        >
                            <template v-slot:prepend>
                                <q-icon name="text_fields" color="teal" />
                            </template>
                        </q-input>
                    </div>
                </q-card>
            </q-popup-proxy>
        </q-item-section>
    </div>
    <div v-else-if="page === 'clientPage'" class="user-header row">
        <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
                U
            </q-avatar>
        </q-item-section>
        <q-item-section>
            <q-item-label>{{ user.firstName + ' ' + user.lastName }}</q-item-label>
            <q-item-label caption lines="1" class="row">
                {{ user.email }}
            </q-item-label>
        </q-item-section>
        <q-item-section side>
            <q-icon name="edit" class="cursor-pointer" />
            <q-popup-proxy cover :breakpoint="500">
                <q-card class="q-pa-md">
                    <div class="column">
                        <q-input type="text" color="teal" dense autofocus autogrow>
                            <template v-slot:prepend>
                                <q-icon name="text_fields" color="teal" />
                            </template>
                        </q-input>
                    </div>
                </q-card>
            </q-popup-proxy>
        </q-item-section>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';
import { TypeStore } from 'stores/type-store.js';

export default defineComponent({
    name: 'ListHeaders',
    emits: ['changed'],
    props: {
        page: String,
        type: Object,
        content: Object,
        user: Object,
        themeController: Boolean,
        typeName: String,
    },
    data() {
        return {
            name: '',
            description: '',
            tagArray: this.content ? this.content.tag : null,
        };
    },
    methods: {
        async updateTypeHeader(id, pName, pDescription) {
            const typeStore = TypeStore();
            console.log('update type header');
            axios
                .patch(
                    `http://127.0.0.1:3000/contentType/${id}`,
                    {
                        name: pName,
                        description: pDescription,
                    },
                )
                .then((response) => {
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });

            const response = await axios
                .get('http://127.0.0.1:3000/contentType')
                .catch((err) => {
                    console.log(err);
                });

            if (response.data.length) {
                typeStore.list = response.data;
            }

            this.name = '';
            this.description = '';
        },
        async updateTags(id, newTags) {
            console.log(newTags.length);
            const newTagArray = [];
            for (let i = 0, temp = ''; i < newTags.length; i++) {
                if (newTags[i] === ',') {
                    newTagArray.push(temp);
                    temp = '';
                } else temp += newTags[i];

                if (i === newTags.length - 1) newTagArray.push(temp);
            }

            this.$emit('changed', [...newTagArray]);
            console.log(newTagArray);
            axios
                .patch(
                    `http://127.0.0.1:3000/content/${id}`,
                    {
                        tag: newTagArray,
                    },
                )
                .then((response) => {
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        },
    },
});
</script>

<style lang="sass" scoped>
.type-header, .content-header, .user-header
    width: 100%
</style>
