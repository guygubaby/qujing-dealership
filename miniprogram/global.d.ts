declare global {
  export type Nullable<T> = T | null
  export type IDataSet<T = Record<string, string | number>> = {
    currentTarget: {
      dataset: T
    }
  }
}

export { }
