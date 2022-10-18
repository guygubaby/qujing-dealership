import { ensureSuffix } from "@bryce-loskie/utils"

const app = getApp()

export { }

Component({
	options: {
		multipleSlots: true,
	},
  /**
   * Component properties
   */
  properties: {
		enabled: {
			type: Boolean,
			value: true,
		},
		forNav: {
			type: Boolean,
			value: false,
		},
		backToTop: {
			type: Boolean,
			value: true,
		},
		threshold: {
			type: Number,
			value: 60,
		},
		background: {
			type: String,
			value: 'transparent',
		},
		defaultStyle: {
			type: String,
			value: 'black'
		},
		height: {
			type: String,
			value: '',
			observer() {
				this.init()
			}
		}
  },

  /**
   * Component initial data
   */
  data: {
		triggered: false,
		finalThreshold: 60,
		scrollerHeight: '0px',
	},

	lifetimes: {
		attached(){
			this.init()
		},
	},
	
  /**
   * Component methods
   */
  methods: {	
		init() {
			const { navHeight = 84, windowHeight = 812 } = app.globalData

			const threshold = this.properties.threshold
			const forNav = this.properties.forNav
			const height = this.properties.height

			const finalThreshold =  forNav ? navHeight : threshold

			const scrollerHeight = height || windowHeight + ''

			this.setData({
				finalThreshold,
				scrollerHeight: ensureSuffix(scrollerHeight, 'px'),
			})
		},

		onRefresh() {
			this.setData({
				triggered: true,
			})

			const payload = {
				stopRefresh: () => {
					this.stopRefresh()
				}
			}

			this.triggerEvent('onRefresh', payload)
		},

		startRefresh(){
			this.setData({
				triggered: true,
			})

			const payload = {
				stopRefresh: () => {
					this.stopRefresh()
				}
			}

			this.triggerEvent('onRefresh', payload)

			return () => {
				this.stopRefresh()
			}
		},

		stopRefresh(){
			this.setData({
				triggered: false,
			})
		},
	
		onRestore() {
			this.triggerEvent('onRestore')
			this.stopRefresh()
		},
	
		onAbort() {
			this.triggerEvent('onAbort')
			this.stopRefresh()
		},
  }
})
