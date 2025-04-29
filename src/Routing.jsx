import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout';
import Signin from './_auth/Signin/Signin'
import Signup from './_auth/Signup/Signup'
import PageLayout from './_root/Pages/PageLayout';
import Home from './_root/Pages/Home/Home';
import Profile from './_root/Pages/Profile/Profile';
import Saved from './_root/Pages/Saved/Saved';
import Help from './_root/Pages/Help/Help';
import CreatePost from './_root/Forms/CreatePost';
import EditPost from './_root/Forms/EditPost';
import EditProfile from './_root/Forms/EditProfile';
import Demo from './Demo';
import OTP from './components/ui/OTP';

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='profile' element={<Profile />} />
                <Route path='saved' element={<Saved />} />
                <Route path='help' element={<Help />} />
                <Route path='createpost' element={<CreatePost />} />
                <Route path='editpost' element={<EditPost />} />
                <Route path='editprofile' element={<EditProfile />} />
                <Route path="demo" element={<Demo />} />
            </Route>

            <Route path="/_auth" element={<AuthLayout />}>
                <Route path="signin" element={<Signin />} />
                <Route path="signup" element={<Signup />} />
                <Route path="otp" element={<OTP />} />
            </Route>
        </Routes>
    )
}

export default Routing