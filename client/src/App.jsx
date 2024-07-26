import './App.css'
import Header from './components/Header'
import {Routes, Route} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import EditPersonalDetails from './pages/EditPersonalDetails';
import Connection from './pages/Connection';
import Notification from './pages/Notification';
import UserPosts from './pages/UserPosts';
import Messaging from './pages/Messaging';
import MessageRoom from './pages/MessageRoom';
import Comment from './components/Comment';



function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/forgotPassword' element={<ForgotPassword/>} />
        <Route path='/resetPassword/:token' element={<ResetPassword/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/editDetails' element={<EditPersonalDetails/>} />
        <Route path='/connections' element={<Connection/>} />
        <Route path='/notification' element={<Notification/>} />
        <Route path='/userposts' element={<UserPosts/>} />
        <Route path='/comment' element={<Comment/>} />
        <Route path='/messaging' element={<Messaging/>} />
        <Route path='/messageRoom' element={<MessageRoom/>} />
      </Routes>
    </>
  )
}

export default App;
