
<script>
// import { QBtnProps, QNotifyOptions, useQuasar } from 'quasar';
import { ref } from 'vue'

export default {
    setup() {
        const runtimeConfig = useRuntimeConfig();

        const VERSION = runtimeConfig.public.VERSION

        const leftDrawerOpen = ref(false);

        function toggleLeftDrawer() {
            leftDrawerOpen.value = !leftDrawerOpen.value;
        }
        const showBottomsheet = () =>
            bottomSheet({
                message: 'Bottom Sheet',
                actions: [
                    {
                        label: 'Drive',
                        img: 'https://cdn.quasar.dev/img/logo_drive_128px.png',
                        id: 'drive',
                    },
                    {
                        label: 'Keep',
                        img: 'https://cdn.quasar.dev/img/logo_keep_128px.png',
                        id: 'keep',
                    },
                    {
                        label: 'Google Hangouts',
                        img: 'https://cdn.quasar.dev/img/logo_hangouts_128px.png',
                        id: 'calendar',
                    },
                    {
                        label: 'Calendar',
                        img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png',
                        id: 'calendar',
                    },
                ],
            });

        return {
            leftDrawerOpen,
            toggleLeftDrawer,
            showBottomsheet,
            VERSION
        }
    }
}
</script>

<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

                <q-toolbar-title> NDM App </q-toolbar-title>

                <div>v{{ VERSION }}</div>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
            <q-list>
                <q-item-label header> Essential Links </q-item-label>

            </q-list>
        </q-drawer>

        <q-page-container>
            <slot />
        </q-page-container>
    </q-layout>
</template>

<style lang="scss" scoped></style>