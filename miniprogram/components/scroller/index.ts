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
  },

  /**
   * Component initial data
   */
  data: {
		triggered: false,
		finalThreshold: 60,
	},

	lifetimes: {
		attached(){
			const threshold = this.properties.threshold
			const forNav = this.properties.forNav
			const finalThreshold =  forNav ? threshold + 20 : threshold
			this.setData({
				finalThreshold,
			})
		}
	},
	
  /**
   * Component methods
   */
  methods: {	
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
