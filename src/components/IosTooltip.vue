<template>
    <v-tooltip v-if="!ifOnIOS" bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="pa-5" :href="href" @click="click" icon v-bind="attrs" v-on="on">
                <slot name="icon"></slot>
            </v-btn>
        </template>
        <slot name="text"></slot>
    </v-tooltip>
    <v-tooltip v-else bottom style="display: none">
        <template v-slot:activator="{}">
            <v-btn class="pa-5" @click="click" icon v-bind="attrs" v-on="on">
                <slot name="icon"></slot>
            </v-btn>
        </template>
    </v-tooltip>
</template>

<script>
export default {
    name: 'IosTooltip',
    props: {
        href: {
            type: String
        }
    },
    data() {
        return {
            ifOnIOS: this.$browserDetect.isIOS
        };
    },
    methods: {
        click() {
            this.$emit('click');
        }
    }
};
</script>

<style>
</style>