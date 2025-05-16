import React, { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCurrentAccountUserQuery } from './lib/tanstack/querys_mutations';

// Auth Routes
const AuthLayout = lazy(() => import('./_auth/AuthLayout'));
const Signin = lazy(() => import('./_auth/Signin/Signin'));
const Signup = lazy(() => import('./_auth/Signup/Signup'));
const CatchUser = lazy(() => import('./_auth/CatchUser'));

// Pages Routes
const RootLayout = lazy(() => import('./_root/RootLayout'));
const Home = lazy(() => import('./_root/Pages/Home/Home'));
const Profile = lazy(() => import('./_root/Pages/Profile/Profile'));
const Saved = lazy(() => import('./_root/Pages/Saved/Saved'));
const Help = lazy(() => import('./_root/Pages/Help/Help'));
const CreatePost = lazy(() => import('./_root/Forms/CreatePost'));
const EditPost = lazy(() => import('./_root/Forms/EditPost'));
const EditProfile = lazy(() => import('./_root/Forms/EditProfile'));
const OTP = lazy(() => import('./_auth/Signup/OTP'));
const SharePost = lazy(() => import('./_root/Pages/Share/SharePost'));

// FallBack UI
import LoaderScreen from './constants/Loading/LoaderScreen';
import { useSelector } from 'react-redux';


const Routing = () => {

    const auth = useSelector((state) => state.auth.status)

    const navigate = useNavigate();
    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    } = useCurrentAccountUserQuery();


    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (!cookieFallback || cookieFallback === "[]") {
            navigate("/_auth/signup");
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
        <Suspense fallback={<LoaderScreen />}>
            <Routes>
                <Route element={<RootLayout authentication={data || auth} />}>
                    <Route index path='/' element={<Home />} />
                    <Route path='profile/:user_id' element={<Profile />} />
                    <Route path='saved' element={<Saved />} />
                    <Route path='help' element={<Help />} />
                    <Route path='createpost' element={<CreatePost />} />
                    <Route path='editpost/:post_id' element={<EditPost />} />
                    <Route path='editprofile/:user_id' element={<EditProfile />} />
                </Route>
                <Route path="/_auth" element={<AuthLayout authentication={auth} />}>
                    <Route path="signin" element={<Signin />} />
                    <Route index path="signup" element={<Signup />} />
                    <Route path="otp" element={<OTP />} />
                    <Route path='catchUser' element={<CatchUser />} />
                </Route>
                <Route path='share/:post_id' element={<SharePost />} />
            </Routes>
        </Suspense>
    );
};

export default Routing