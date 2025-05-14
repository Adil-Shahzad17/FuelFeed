import credentials from "../credentials"; // ENV File Data

// Auth
import authservice from "../appwrite/services/AuthService";
import { draftLogin, login, logout } from "../store/authSlice";

// User
import userService from "../appwrite/services/UserService";
import { userData } from "../store/userSlice";

// Post
import post_service from "../appwrite/services/PostService";

// Save Post
import saveService from "../appwrite/services/SaveService";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Query } from "appwrite";
import emailjs from "@emailjs/browser";

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

        dispatch(draftLogin(account)); // Save account info in draft incase user don't complete the account creation process.

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
          user_id: userInfo.$id, // User id which was saved by draftLogin in useSigninMutation.
          otpToken: otp,
        });

        if (loginuser instanceof Error) throw new Error("Failed to Login");

        const currentUser = await authservice.getCurrentUser();
        if (currentUser instanceof Error) throw new Error("No Account Found");
        authdispatch(login(currentUser));

        const createUser = await userService.createUser({
          user_id: currentUser.$id,
          user_name: currentUser.name,
        }); // Create Profile for User

        if (createUser instanceof Error) throw new Error("No User Found");

        const user = await userService.getUser({
          user_id: createUser.$id,
        });

        if (user instanceof Error) throw user;
        userdispatch(userData(user));
      } catch (error) {
        throw new Error("Something goes wrong with OTP");
      }
    },
    onSuccess: () => {
      navigate("/"); // Navigate to Home
    },
  });
};

export const useLogoutMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (user) => {
      let logoutTime = Date.now();
      const updateLastSession = await userService.updateUser({
        user_id: user,
        lastSessionTime: logoutTime.toString(), // Update lastSessionTime value with time of logout.
      });

      if (updateLastSession instanceof Error) console.log(updateLastSession);

      const logoutUser = await authservice.logOut();

      if (logoutUser instanceof Error) throw new Error("Failed to Logout");
      dispatch(logout()); // Clear Store State
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

  const TWENTY_MINUTES_MS = 1000 * 60 * 20; // Twenty minutes in millieseconds.
  const TWO_HOURS_MS = 1000 * 60 * 60 * 2; // Two hours in millieseconds.

  return useMutation({
    mutationFn: async (data) => {
      try {
        const loginUser = await authservice.login({
          email: data.email,
          password: data.password,
        });

        if (loginUser instanceof Error)
          throw new Error("Failed to Login, try again later");

        // Get Account
        const currentUser = await authservice.getCurrentUser();
        if (currentUser instanceof Error) throw new Error("No Account Found");
        console.log(currentUser);

        // Get User Profile
        const user = await userService.getUser({ user_id: currentUser.$id });
        if (user instanceof Error) throw new Error("No User Found");

        const lastSessionTime = Number(user.lastSessionTime); // From User Profile
        const loginTime = new Date(loginUser.$createdAt).getTime(); // Conver into millieseconds
        const sessionDifference = Math.abs(lastSessionTime - loginTime);

        // TRUE if user is returning too soon (<=2 hours)
        const isReturningTooSoon =
          sessionDifference <= TWO_HOURS_MS &&
          sessionDifference >= TWENTY_MINUTES_MS; // Window to come back under 20 minutes period if closes the app by accident.

        if (isReturningTooSoon) {
          await authservice.logOut(); // Force logout if returning too soon
          return false; // Will trigger navigation to catchUser
        }

        authdispatch(login(currentUser));
        userdispatch(userData(user));
        return true; // Will trigger navigation to home
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: (shouldProceedToHome) => {
      navigate(shouldProceedToHome ? "/" : "/_auth/catchUser");
    },
  });
};

export const useCurrentAccountUserQuery = () => {
  // Get both account and profile is user.
  const authdispatch = useDispatch();
  const userdispatch = useDispatch();

  return useQuery({
    queryKey: ["account_user"],
    enabled: false,
    staleTime: Infinity,
    queryFn: async () => {
      try {
        // Account is required to get the $id to get the user Profile.
        const currentUser = await authservice.getCurrentUser();
        if (currentUser instanceof Error) throw currentUser;

        const user = await userService.getUser({
          user_id: currentUser.$id,
        });

        if (user instanceof Error) throw user;

        authdispatch(login(currentUser));
        userdispatch(userData(user));
        return true;
      } catch (error) {
        throw new Error("Failed to get Current User");
      }
    },
  });
};

// Profile Updation
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
      return update; // To invalidateQuery
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

        return data.user_id; // To invalidateQuery
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

// Post Creation and Updation
export const useAllPostsQuery = (search) => {
  const LIMIT = 5;
  return useInfiniteQuery({
    queryKey: ["all_posts"],
    staleTime: Infinity,
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const queries = [Query.limit(LIMIT), Query.orderDesc("$createdAt")];

      if (search) {
        // Coming from SearchBar in Header
        queries.push(Query.equal("category", search));
      }
      if (pageParam) {
        queries.push(Query.cursorAfter(pageParam));
      }

      const posts = await post_service.allPosts(queries); // Get All Posts

      if (posts instanceof Error) throw new Error("Failed to get posts");
      return posts;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.documents || lastPage.documents.length === 0) {
        return undefined;
      }

      const lastDocument = lastPage.documents[lastPage.documents.length - 1];
      return lastDocument?.$id ?? undefined; // Using last posts $id for appwrite cursorAfter to fetch next page.
    },
  });
};

export const useGetPostQuery = (post_id) => {
  // For EditPost and SharePost Page.
  return useQuery({
    queryKey: ["posts", post_id],
    staleTime: Infinity,
    queryFn: async () => {
      try {
        const post = await post_service.getPost({ post_id: post_id });
        if (post instanceof Error) throw new Error("Failed to fetch your post");

        return post;
      } catch (error) {
        throw new Error(error.message);
      }
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
          user_name: data.user_name,
          profile_img: data.profile_img,
        });

        if (createPost instanceof Error)
          throw new Error("Something went wrong with post creation");

        return data.user_id;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      navigate(`/profile/${data}`);
      queryClient.invalidateQueries({ queryKey: ["user_posts", data] });
    },
  });
};

export const useEditPostMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      if (data.edit) {
        // If user didn't update the post image.
        const editPost = await post_service.updatePost(data.post_id, {
          content: data.content,
          category: data.category,
        });

        if (editPost instanceof Error) throw new Error("Failed to edit post");
        console.log(editPost);
        return data.user_id;
      } else if (!data.edit) {
        // If user did update the post image.
        const deletePrevImage = await post_service.deleteFile(data.prev_image); // Delete existing image.

        if (deletePrevImage instanceof Error)
          throw new Error("Failed to delete existing image");

        const fileUpload = await post_service.uploadFile(data.file); // Upload new file

        if (fileUpload instanceof Error)
          throw new Error("Failed to post photo");

        const editPost = await post_service.updatePost(data.post_id, {
          content: data.content,
          category: data.category,
          post_img: fileUpload.$id,
        });

        if (editPost instanceof Error) throw new Error("Failed to edit post");
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

// User Profile Posts
export const useUserPostsQuery = (user_id) => {
  const LIMIT = 5;
  return useInfiniteQuery({
    queryKey: ["user_posts", user_id],
    staleTime: Infinity,
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      console.log(user_id);

      const queries = [
        Query.limit(LIMIT),
        Query.orderDesc("$createdAt"),
        Query.equal("user_id", user_id),
      ];
      if (pageParam) {
        queries.push(Query.cursorAfter(pageParam));
      }

      const posts = await post_service.allPosts(queries);

      if (posts instanceof Error) throw new Error("Failed to get posts");
      return posts;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.documents || lastPage.documents.length === 0) {
        return undefined;
      }

      const lastDocument = lastPage.documents[lastPage.documents.length - 1]; // Using last posts $id for appwrite cursorAfter to fetch next page.
      return lastDocument?.$id ?? undefined;
    },
  });
};

// User Saves Posts
export const useGetSavePostsQuery = (user_id) => {
  const LIMIT = 5;
  return useInfiniteQuery({
    queryKey: ["user_saves", user_id],
    staleTime: Infinity,
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const queries = [
        Query.limit(LIMIT),
        Query.orderDesc("$createdAt"),
        Query.equal("user_id", user_id),
      ];
      if (pageParam) {
        queries.push(Query.cursorAfter(pageParam));
      }

      const posts = await saveService.getAllSavedPosts(queries);

      if (posts instanceof Error) throw new Error("Failed to get posts");
      return posts;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.documents || lastPage.documents.length === 0) {
        return undefined;
      }

      const lastDocument = lastPage.documents[lastPage.documents.length - 1]; // For Appwrite cursorAfter
      return lastDocument?.$id ?? undefined;
    },
  });
};

export const useSavePostMutation = () => {
  // Save Post to Save Collection
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const savePost = await saveService.savePost({
        user_id: data.user_id,
        post_id: data.$id,
        post_img: data.post_img,
        category: data.category,
        content: data.content,
        user_name: data.user_name,
        profile_img: data.profile_img,
      });

      if (savePost instanceof Error) throw new Error("Failed to Save Posts");
      return savePost;
    },
    onSuccess: (data) => {
      navigate("/saved");
      queryClient.invalidateQueries({ queryKey: ["user_saves", data.user_id] });
    },
  });
};

export const useDeleteSavePostMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const deleteSave = await saveService.deleteSavePost(data.$id);

      if (deleteSave instanceof Error) throw new Error(deleteSave);

      return data.user_id;
    },
    onSuccess: (user_id) => {
      navigate("/saved");
      queryClient.invalidateQueries({ queryKey: ["user_saves", user_id] });
    },
  });
};

// Like Post
export const useLikePostMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      try {
        let currentLikesCount = Number(data.likes_count) || 0; // Current Likes

        if (data.like) {
          // If User Like a post
          currentLikesCount = Math.min(currentLikesCount + 1, 1000);
        } else {
          // If User dislike a post
          currentLikesCount = Math.max(currentLikesCount - 1, 0);
        }

        await post_service.updatePost(data.post_id, {
          likes_count: currentLikesCount,
        });
      } catch (error) {
        throw new Error("Failed to update likes");
      }
    },
  });
};

// Report Post for not meeting the Application Rules via email.js
export const useReportPostMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const templateParams = {
        from_name: data.name,
        reply_to: data.email,
        message: `${data.message} : ${data.post_id}`,
        to_name: "Adil",
      };

      await emailjs.send(
        credentials.EMAIL_JS_SERVICE_ID,
        credentials.EMAIL_JS_TEMPLATE_ID,
        templateParams,
        credentials.EMAIL_JS_PUBLIC_KEY
      );
    },
  });
};
