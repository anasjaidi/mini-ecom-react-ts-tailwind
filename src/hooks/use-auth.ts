import { useCallback, useEffect } from 'react';
import {
  setConnected,
  setEmail,
  useAppDispatch,
  useAppSelector,
} from '../store';
import { useMutation } from '@tanstack/react-query';
import { api } from '../api';

function useAuth() {
  const { isConnected, email } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const {
    mutateAsync: loginMutation,
    data: loginData,
    submittedAt: loginSubmittedAt,
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: { email: string; password: string }) => {
      return api.login(data.email, data.password);
    },
  });

  const {
    mutateAsync: registerMutation,
    data: registerData,
    submittedAt: registerSubmittedAt,
  } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      return api.register(
        data.email,
        data.password,
        data.firstName,
        data.lastName
      );
    },
  });

  useEffect(() => {
    if (loginData || registerData) {
      dispatch(setConnected(true));
      dispatch(setEmail((loginData?.email || registerData?.email)!));
    }
  }, [
    loginData,
    registerData,
    dispatch,
    loginSubmittedAt,
    registerSubmittedAt,
  ]);

  const {
    mutateAsync: logoutMutation,
    isSuccess: logoutIsSuccess,
    submittedAt: logoutSubmittedAt,
  } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      return api.logout();
    },
  });

  useEffect(() => {
    if (logoutIsSuccess) {
      dispatch(setConnected(false));
      dispatch(setEmail(''));
    }
  }, [logoutIsSuccess, dispatch, logoutSubmittedAt]);

  const logout = useCallback(async () => {
    await logoutMutation();
  }, [logoutMutation]);

  const login = useCallback(
    (email: string, password: string) => {
      return loginMutation({ email, password });
    },
    [loginMutation]
  );

  const register = useCallback(
    (email: string, password: string, firstName: string, lastName: string) => {
      return registerMutation({ email, password, firstName, lastName });
    },
    [registerMutation]
  );
  return {
    isConnected,
    email,
    login,
    register,
    logout,
  };
}

export default useAuth;
