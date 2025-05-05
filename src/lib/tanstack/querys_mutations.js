import authservice from "../appwrite/services/AuthService";
import userService from "../appwrite/services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { draftLogin, login, logout } from "../store/authSlice";
import { userData } from "../store/userSlice";
import post_service from "../appwrite/services/PostService";
import { Query } from "appwrite";

// Authentication
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
  const authdispatch = useDispatch();
  const userdispatch = useDispatch();

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

        if (currentUser instanceof Error) throw new Error("No Account Found");
        authdispatch(login(currentUser));

        const createUser = await userService.createUser({
          user_id: currentUser.$id,
          user_name: currentUser.name,
        });

        if (createUser instanceof Error) throw new Error("No User Found");

        const user = await userService.getUser({
          user_id: createUser.$id,
        });

        if (user instanceof Error) throw user;
        userdispatch(userData(user));
      } catch (error) {
        console.log(error);
        throw new Error("OTP Login M Error");
      }
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
  const authdispatch = useDispatch();
  const userdispatch = useDispatch();
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

        console.log(loginUser);

        const currentUser = await authservice.getCurrentUser();

        if (currentUser instanceof Error) throw new Error("No User Found");
        authdispatch(login(currentUser));

        const user = await userService.getUser({ user_id: currentUser.$id });

        if (user instanceof Error) throw new Error("No User Found");
        userdispatch(userData(user));
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      navigate("/");
    },
  });
};

export const useCurrentAccountUserQuery = () => {
  const authdispatch = useDispatch();
  const userdispatch = useDispatch();

  return useQuery({
    queryKey: ["account_user"],
    enabled: false,
    staleTime: Infinity,
    queryFn: async () => {
      try {
        const currentAccount = await authservice.getCurrentUser();

        if (currentAccount instanceof Error) throw currentAccount;
        authdispatch(login(currentAccount));

        const currentUser = await userService.getUser({
          user_id: currentAccount.$id,
        });

        if (currentUser instanceof Error) throw currentUser;
        userdispatch(userData(currentUser));

        console.log(currentAccount);
        console.log(currentUser);

        return true;
      } catch (error) {
        throw new Error("Failed to get Current User");
      }
    },
  });
};

// ---------------------------

export const useUserQuery = (userid) => {
  return useQuery({
    queryKey: ["user", userid],
    staleTime: Infinity,
    queryFn: async () => {
      try {
        const user = await userService.getUser({ user_id: userid });

        if (user instanceof Error) throw new Error("Failed to get user info");
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });
};

export const useEditProfileMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const fileUpload = await userService.uploadUserFile(data.file);

      if (fileUpload instanceof Error)
        throw new Error("Failed to upload profile photo");

      const update = await userService.updateUser({
        user_id: data.user_id,
        bio: data.bio,
        profile_img: fileUpload.$id,
      });

      if (update instanceof Error) throw new Error("Failed to update Profile");

      dispatch(userData(update));
      return update;
    },
    onSuccess: (data) => {
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["user", data.$id] });
    },
  });
};

export const useEditCoverMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      try {
        const fileUpload = await userService.uploadUserFile(data.file);

        if (fileUpload instanceof Error)
          throw new Error("Failed to upload cover photo");

        const update = await userService.updateUser({
          user_id: data.user_id,
          cover_img: fileUpload.$id,
        });

        if (update instanceof Error)
          throw new Error("Failed to update Profile");

        return data.user_id;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["user", data.$id] });
    },
  });
};

export const useCreatePostMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      try {
        const fileUpload = await post_service.uploadFile(data.file);

        if (fileUpload instanceof Error)
          throw new Error("Failed to post photo");

        const createPost = await post_service.createPost({
          category: data.category,
          content: data.content,
          user_id: data.user_id,
          post_img: fileUpload.$id,
        });

        if (createPost instanceof Error)
          throw new Error("Something went wrong with post creation");
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      navigate("/profile");
      queryClient.invalidateQueries({ queryKey: ["user_posts", data.user_id] });
    },
  });
};

export const useUserPostsQuery = (user_id) => {
  return useQuery({
    queryKey: ["user_posts", user_id],
    staleTime: Infinity,
    queryFn: async () => {
      try {
        const posts = await post_service.allPosts([
          Query.equal("user_id", user_id),
        ]);

        if (posts instanceof Error)
          throw new Error("Failed to fetch your posts");

        return posts;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });
};

export const useGetPostQuery = (post_id) => {
  return useQuery({
    queryKey: ["posts", post_id],
    staleTime: Infinity,
    queryFn: async () => {
      try {
        const post = await post_service.getPost({ post_id: post_id });
        console.log(post);

        if (post instanceof Error) throw new Error("Failed to fetch your post");

        return post;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });
};

export const useEditPostMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      if (data.edit) {
        const editPost = await post_service.updatePost(data.post_id, {
          content: data.content,
          category: data.category,
        });

        if (editPost instanceof Error) throw new Error("Failed to edit post");
        console.log(editPost);
        return data.user_id;
      } else if (!data.edit) {
        const deletePrevImage = await post_service.deleteFile(data.prev_image);

        if (deletePrevImage instanceof Error)
          throw new Error("Failed to delete existing image");

        const fileUpload = await post_service.uploadFile(data.file);

        if (fileUpload instanceof Error)
          throw new Error("Failed to post photo");

        const editPost = await post_service.updatePost(data.post_id, {
          content: data.content,
          category: data.category,
          post_img: fileUpload.$id,
        });

        if (editPost instanceof Error) throw new Error("Failed to edit post");
        console.log(editPost);
        return data.user_id;
      }
    },
    onSuccess: (data) => {
      navigate("/profile");
      queryClient.invalidateQueries({ queryKey: ["user_posts", data] });
    },
  });
};

export const useDeletePostMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const deletePhoto = await post_service.deleteFile(data.post_img);

      if (deletePhoto instanceof Error)
        throw new Error("Failed to delete Post Photo");

      const deletePost = await post_service.deletePost(data.$id);
      if (deletePost instanceof Error) throw new Error("Failed to delete Post");

      return data.user_id;
    },
    onSuccess: (data) => {
      navigate("/profile");
      queryClient.invalidateQueries({ queryKey: ["user_posts", data] });
    },
  });
};
