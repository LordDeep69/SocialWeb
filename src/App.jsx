import { useEffect, useReducer, useState } from 'react'
import './App.css'
import { counterReducer, initialState } from './services/counterReduces'

function App() {
  const [state, dispatch] = useReducer(counterReducer, initialState)

  const handlePlus = () => {
    dispatch({type: "increment"})
  }

  const handleMinus = () => {
    dispatch({type: "decrement"})
  }

  useEffect(()=>{
    const products = getProducts()
    dispatch({
      type: "fill",
      payload: [...products]
    })
  },[])

  if (isEdit) {

    const editProduct = {
      ...form,
      id: productEdit.id,
    }


    updateProduct(editProduct)

    dispatch({
      type: "update",
      payload:editProduct
    })
    
  } else {

    const newProduct = {
      ...form,
      id: uuidv4(),
    }

    saveProduct(newProduct)

    dispatch({
      type: "add",
      payload: newProduct
    })
  }

  return (
    <>
      <span onClick={handleMinus}>-</span>
      <p>{state}</p>
      <span onClick={handlePlus}>+</span>
    </>
  )
}

export default App
