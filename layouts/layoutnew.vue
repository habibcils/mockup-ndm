<template>
    <q-layout view="lHh LpR fFf">
  
      <q-header bordered class="bg-primary text-white">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
  
          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            Title
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
  
      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" bordered>
        <!-- drawer content -->
      </q-drawer>
  
      <q-page-container>
        <router-view />
      </q-page-container>
  
    </q-layout>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    setup () {
      const leftDrawerOpen = ref(false)
  
      return {
        leftDrawerOpen,
        toggleLeftDrawer () {
          leftDrawerOpen.value = !leftDrawerOpen.value
        }
      }
    }
  }
  </script>