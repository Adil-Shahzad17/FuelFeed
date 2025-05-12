import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout';
import Signin from './_auth/Signin/Signin'
import Signup from './_auth/Signup/Signup'
import Home from './_root/Pages/Home/Home';
import Profile from './_root/Pages/Profile/Profile';
import Saved from './_root/Pages/Saved/Saved';
import Help from './_root/Pages/Help/Help';
import CreatePost from './_root/Forms/CreatePost';
import EditPost from './_root/Forms/EditPost';
import EditProfile from './_root/Forms/EditProfile';
import LoaderScreen from './constants/Loading/LoaderScreen';
import OTP from './_auth/Signup/OTP';
import { useCurrentAccountUserQuery } from './lib/tanstack/querys_mutations';
import { useNavigate, Navigate } from 'react-router-dom';
import CatchUser from './_auth/CatchUser';
import SharePost from './_root/Pages/Share/SharePost';


const Routing = () => {

    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    } = useCurrentAccountUserQuery();

    console.log("Routing");


    const navigate = useNavigate();

    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (!cookieFallback || cookieFallback === "[]") {
            navigate("/_auth/signup");
            console.log("Navigate to Auth");
            return
        }
        refetch()
    }, [refetch]);

    if (isLoading) {
        return <LoaderScreen />;
    }

    if (isError) {
        console.log(error);
    }

    return (
        <Routes>
            <Route path="/" element={<RootLayout authentication={data} />}>
                <Route path='/' element={<Home />} />
                <Route path='profile/:user_id' element={<Profile />} />
                <Route path='saved' element={<Saved />} />
                <Route path='help' element={<Help />} />
                <Route path='createpost' element={<CreatePost />} />
                <Route path='editpost/:post_id' element={<EditPost />} />
                <Route path='editprofile/:user_id' element={<EditProfile />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
            <Route path="/_auth" element={<AuthLayout />}>
                <Route path="signin" element={<Signin />} />
                <Route indexx path="signup" element={<Signup />} />
                <Route path="otp" element={<OTP />} />
                <Route path='catchUser' element={<CatchUser />} />
            </Route>
            <Route path='share/:post_id' element={<SharePost />} />
        </Routes>
    );
};

export default Routing