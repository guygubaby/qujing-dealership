declare global {
  export type Nullable<T> = T | null
  export type IDataSet<T = Record<string, string | number>> = {
    currentTarget: {
      dataset: T
    }
	}
	export type Fn = () => void
	/**
	 * scroller component onRefresh handler param type
	 */
	export type IScrollerOnRefreshEvent = {
		detail: {
			/**
			 * stopRefresh fn
			 */
			stopRefresh: Fn
		}
	}
}

export { }
