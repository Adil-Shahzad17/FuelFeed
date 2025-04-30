import authservice from "../appwrite/services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { draftLogin, login, logout } from "../store/authSlice";

export const useSigninMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      try {
        const account = await authservice.createAccount({
          name: data.username,
          email: data.email,
          password: data.password,
        });

        if (account instanceof Error)
          throw new Error("Unable to Create Account, try again later.");

        console.log(account);
        dispatch(draftLogin(account));

        const OTP = await authservice.generate_getOTPToken(data.email);

        if (OTP instanceof Error)
          throw new Error("Something went wrong with OTP, try again later");
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      navigate("/_auth/otp");
    },
  });
};

export const useOTPLoginMutation = () => {
  const userInfo = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (otp) => {
      try {
        if (otp.length !== 6)
          throw new Error("OTP Code should be of 6 digits.");

        const loginuser = await authservice.loginUsingOTP({
          user_id: userInfo.$id,
          otpToken: otp,
        });

        if (loginuser instanceof Error) throw new Error("Failed to Login");

        const currentUser = await authservice.getCurrentUser();

        if (currentUser instanceof Error) throw new Error("No User Found");
        dispatch(login(currentUser));
      } catch (error) {
        console.log(error);
        throw new Error("OTP Login M Error");
      }
      console.log(userInfo);
      console.log(otp);
    },
    onSuccess: () => {
      navigate("/");
    },
  });
};

export const useLogoutMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      try {
        const logoutUser = await authservice.logOut();

        if (logoutUser instanceof Error) throw new Error("Failed to Login");
        dispatch(logout());
      } catch (error) {
        console.log(error);
        throw new Error("Failed to Login");
      }
    },
    onSuccess: () => {
      navigate("/_auth/signup");
    },
  });
};

export const useLoginMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data) => {
      try {
        const loginUser = await authservice.login({
          email: data.email,
          password: data.password,
        });

        if (loginUser instanceof Error)
          throw new Error("Failed to Login, try again later");

        const currentUser = await authservice.getCurrentUser();

        if (currentUser instanceof Error) throw new Error("No User Found");
        dispatch(login(currentUser));
      } catch (error) {
        throw new Error("Failed to Login, try again later");
      }
    },
    onSuccess: () => {
      navigate("/");
    },
  });
};
