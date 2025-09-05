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

  const successShown = useRef(false);
  const errorShown = useRef(false);

  useEffect(() => {
    if (status === "loading") {
      successShown.current = false;
      errorShown.current = false;
    }
    

    if (status === "succeeded" && !successShown.current) {
      toast.success(authUser.message);
      successShown.current = true;
    }

    if (error && !errorShown.current) {
      toast.error(error);
      dispatch(clearError()); 
      errorShown.current = true;
    }
  }, [status, error, dispatch]);

  return null; 
}
