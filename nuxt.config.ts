// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	// devtools: { enabled: false },
	ssr: false,
	app: {
		head: {
			title: 'NDM',
		}
	},
	pages: true,
	css: [
		// '~/assets/css/tailwind.css',
		// '~/assets/css/darkmode.css',
	],

	modules: [
		'nuxt-quasar-ui',
		'@nuxtjs/tailwindcss',
		[
			'@pinia/nuxt',
			{ autoImports: ['defineStore', 'acceptHMRUpdate'] },
		]
	],
	quasar: {
		plugins: [
			'BottomSheet',
			'Dialog',
			'Loading',
			'LoadingBar',
			'Notify',
			'Dark',
		],
		extras: {
			font: 'roboto-font',
		},
		components: {
			defaults: {
				QBtn: {
					unelevated: true,
				},
			},
		},
	},
	imports: {
		dirs: ['stores'],
	},

	runtimeConfig: {
		public: {
			API_BASE_URL: process.env.API_BASE_URL,
			MODE: process.env.MODE,
			VERSION: '1.0.0'
		}
	},

})
