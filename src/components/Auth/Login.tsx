import {
  SafeAreaView,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { GREEN, PURPLE } from '../../styles/GlobalColor';
import { useState, Fragment, useContext } from 'react';
import Request from '../../common/requests';
import Logo from '../../assets/common/Logo.svg';
import LeftArrow from '../../assets/common/Arrow.svg';
import { Body16B, Caption11M } from '../../styles/GlobalText';
import {
  setAccessToken,
  setNickname,
  setRefreshToken,
} from '../../common/storage';
import { LoginContext } from '../../common/Context';

interface LoginProps {
  navigation: any;
  route: any;
}

interface LoginInputProps {
  placeholder: string;
  secure?: boolean;
  onChangeText: (text: string) => void;
}

function LoginInput({
  placeholder,
  secure = false,
  onChangeText,
}: LoginInputProps) {
  const { width, height } = Dimensions.get('window');

  return (
    <TextInput
      style={{
        width: width * 0.8,
        height: 45,
        backgroundColor: '#FFFFFF80',
        borderWidth: 2,
        borderColor: GREEN,
        borderRadius: 5,
        padding: 15,
        marginVertical: 6,
        color: '#ffffff',
      }}
      placeholder={placeholder}
      placeholderTextColor="#ffffff"
      onChangeText={onChangeText}
      secureTextEntry={secure}
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect={false}></TextInput>
  );
}

export const processLoginResponse2 = ( // 리폼러 회원가입 시에 사용하는 토큰 발급용 코드 
  response: any,
) => {
  // const navigation = useNavigation<StackNavigationProp<MyPageProps>>();
  if (response?.status == 200) {
    const accessToken = response.data.access;
    const refreshToken = response.data.refresh;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    console.log({ accessToken }, ',', { refreshToken });
  } else if (response.status == 400) {
    Alert.alert(
      response.data.extra.fields !== undefined
        ? response.data.extra.fields.detail
        : response.data.message,
    );
  } else {
    Alert.alert('예상치 못한 오류가 발생하였습니다.');
  }
};

export const processLoginResponse = (
  response: any,
  navigate: () => void,
  setLogin: (value: boolean) => void,
) => {
  // const navigation = useNavigation<StackNavigationProp<MyPageProps>>();
  if (response?.status == 200) {
    const accessToken = response.data.access;
    const refreshToken = response.data.refresh;
    setNickname('임시 닉네임'); // 수정 필요: 유저 데이터 get해와서, 거기 있는 닉네임으로 변경. 
    // 없으면 (리폼러가 프로필 등록을 안했으면) -> ''으로 설정 -> 마이페이지 접근 불가하게. 마이페이지는 닉네임이 블랭크 아니어야만 접근 가능하게. isLogin이 true일때만 getUserData하게 하면 될듯. 
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    console.log({ accessToken }, ',', { refreshToken });
    setLogin(true);
    navigate();
  } else if (response.status == 400) {
    Alert.alert(
      response.data.extra.fields !== undefined
        ? response.data.extra.fields.detail
        : response.data.message,
    );
  } else {
    Alert.alert('예상치 못한 오류가 발생하였습니다.');
  }
};

export default function Login({ navigation, route }: LoginProps) {
  const { isLogin, setLogin } = useContext(LoginContext);
  const { width, height } = Dimensions.get('window');
  const [form, setForm] = useState({ email: '', password: '' });
  const request = Request();

  const handleLogin = async () => {
    const response = await request.post(`/api/user/login`, form);
    processLoginResponse(
      response,
      () => {
        const parentNav = navigation.getParent();
        if (parentNav != undefined) parentNav.goBack();
        else navigation.navigate('Home');
      },
      setLogin,
    );
  };

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: PURPLE }} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: PURPLE,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            alignSelf: 'flex-start',
            marginTop: height * 0.02,
            marginLeft: width * 0.03,
          }}>
          <LeftArrow color="#fff" />
        </TouchableOpacity>
        <Logo
          color="#fff"
          width="90px"
          height="40px"
          style={{ marginTop: height * 0.17, marginBottom: 20 }}
        />
        <View style={{ marginTop: height * 0.02 }}>
          <LoginInput
            placeholder="이메일"
            onChangeText={value => {
              setForm(prev => {
                return { ...prev, email: value };
              });
            }}></LoginInput>
          <LoginInput
            placeholder="비밀번호"
            onChangeText={value => {
              setForm(prev => {
                return { ...prev, password: value };
              });
            }}
            secure={true}></LoginInput>
          <TouchableOpacity
            style={{
              width: width * 0.8,
              height: 45,
              backgroundColor: GREEN,
              borderRadius: 5,
              marginVertical: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleLogin}>
            <Body16B>로그인</Body16B>
          </TouchableOpacity>
          <View
            style={{
              marginVertical: 6,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Caption11M style={{ color: '#ffffff' }}>회원가입</Caption11M>
            </TouchableOpacity>
            <Caption11M style={{ color: '#ffffff' }}> | </Caption11M>
            <Caption11M style={{ color: '#ffffff' }}>비밀번호 찾기</Caption11M>
          </View>
        </View>
        <View // 아래에 소셜로그인 구현 필요 
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 35,
            width: 48 * 3 + 24,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#ffffff',
              width: 48,
              height: 48,
              borderRadius: 100,
            }}></TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#ffffff',
              width: 48,
              height: 48,
              borderRadius: 100,
            }}></TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#ffffff',
              width: 48,
              height: 48,
              borderRadius: 100,
            }}></TouchableOpacity>
        </View>
      </SafeAreaView>
    </Fragment>
  );
}
