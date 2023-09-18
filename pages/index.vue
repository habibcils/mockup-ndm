<template>
    <q-page class="q-pl-lg">
        <p class="text-h6 q-pt-md">Plugin Showcase</p>
        <q-list>
            <q-item v-for="(button, idx) in buttons" :key="idx">
                <q-btn color="primary" v-bind="button" />
            </q-item>
            <q-item>
                <q-toggle :model-value="dark.isActive" checked-icon="dark_mode" unchecked-icon="light_mode" size="3rem"
                    @update:model-value="(val) => dark.set(val)" />
            </q-item>
        </q-list>
        <p class="text-h6 q-pt-md">Directive Showcase</p>
        <q-list bordered separator style="max-width: 318px">
            <q-item v-ripple clickable>
                <q-item-section>Ripple</q-item-section>
            </q-item>
        </q-list>
    </q-page>
</template>
<script>

import { useQuasar } from 'quasar';


import { computed } from 'vue';

export default {
    setup() {
        const {
            dialog,
            bottomSheet,
            loading,
            loadingBar,
            notify,
            dark,
            screen
        } = useQuasar();
        // const themeIcon = computed(() => (dark.isActive ? "dark_mode" : "light_mode"))

        const buttons = [
            {
                label: "Bottomsheet",
                onClick: () => showBottomsheet()
            },
            {
                label: "Loading",
                onClick: () => {
                    loading.show()
                    setTimeout(() => {
                        loading.hide()
                    }, 1000)
                }
            },
            {
                label: "LoadingBar",
                onClick: () => {
                    loadingBar.start()
                    setTimeout(() => {
                        loadingBar.stop()
                    }, 1000)
                }
            },
            {
                label: "Dialog",
                onClick: () => dialog({ message: "Hello World" })
            },
            {
                label: "Notify",
                onClick: () =>
                    notify({
                        message: "Hello World",
                        position: random(["left", "right", "center", "bottom", "top"])
                    })
            }
        ]
        return {
            // themeIcon,
            buttons,
            dark
        }
    }
}
</script>