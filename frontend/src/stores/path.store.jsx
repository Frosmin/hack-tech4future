import {create} from 'zustand'

const usePath = create((set) => ({
    currentPath: '/',
    updatePath: (newPath)=> set(()=>{currentPath: newPath})
}))