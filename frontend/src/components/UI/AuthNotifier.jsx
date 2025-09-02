import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { selectAuth, selectAuthError, selectAuthStatus } from '../../features/authentication/authSelectors';
import { clearError } from '../../features/authentication/authSlice';

export  function AuthNotifier() {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const authUser=useSelector(selectAuth);

  // refs to avoid duplicate toasts
  const successShown = useRef(false);
  const errorShown = useRef(false);

  useEffect(() => {
    // 🔹 Reset flags when new API call starts
    if (status === "loading") {
      successShown.current = false;
      errorShown.current = false;
    }
    console.log(authUser);
    

    // 🔹 Show success toast once
    if (status === "succeeded" && !successShown.current) {
      toast.success(authUser.message);
      successShown.current = true;
    }

    // 🔹 Show error toast once
    if (error && !errorShown.current) {
      toast.error(error);
      dispatch(clearError()); // clear redux error after toast
      errorShown.current = true;
    }
  }, [status, error, dispatch]);

  return null; // this component only listens, no UI
}
