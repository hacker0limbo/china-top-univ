import create from 'zustand'
import createAuth from './auth'

const createRoot = set => ({ 
  ...createAuth(set)
 })

 const useStore = create(createRoot)

 export default useStore
