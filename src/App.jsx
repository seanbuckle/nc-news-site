import './App.css'
import Header from './components/Header'
import { Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Footer from './components/Footer'




function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
