import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { getAccessToken } from './storage';
import Request from './requests';
import { Alert } from 'react-native';

type UserType = {
  nickname?: string;
  marketname?: string;
  introduce?: string;
  link?: string;
  email: string;
  region: string;
  is_reformer: boolean;
  is_consumer: boolean;

};

export const UserContext = createContext<{
  user: UserType | null;
  setUser: (user: UserType) => void;
}>({
  user: null,
  setUser: () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const request = Request();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Request의 get 메소드를 사용하여 유저 정보를 가져옴
        const response = await request.get('api/user', {}, {}); // API URL에 맞게 수정
        if (response && response.status === 200) {
          setUser(response.data);  // 전역 상태에 유저 데이터를 저장
        } else {
          setError('유저 정보를 불러오는 중 문제가 발생했습니다.');
        }
      } catch (err) {
        console.error(err);
        setError('유저 정보를 가져오는 중 에러가 발생했습니다.');
        Alert.alert('Error', '유저 정보를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);  // 로딩 상태 종료
      }
    };

    fetchUserData();  // Provider가 마운트될 때 유저 데이터 가져옴
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export const LoginContext = createContext({
  isLogin: false,
  setLogin: (value: boolean) => { },
});

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const setLogin = (value: boolean) => {
    setIsLogin(value);
  };
  const checkLogin = async () => {
    // const token = await getAccessToken();
    // if (token) {
    //   setIsLogin(true);
    // } else {
    //   setIsLogin(false)
    // } 
    setIsLogin(false) // 위의 코드가 실제 코드입니다. 지금 이건 디버깅용입니다. 
    // (위의 코드는 앱을 리빌드 해도 액세스토큰이 남아있어서 회원가입 플로우 수정이 불가함)
  };
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <LoginContext.Provider value={{ isLogin, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
