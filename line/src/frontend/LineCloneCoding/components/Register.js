import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const Register = (props) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true)
  const [isIdDoubleCheck, setIsIdDoubleCheck] = useState(false);

  // 아이디 입력 검증 -> 영어만 입력, 4~16자 제한
  const validateId = (text) => {
    const re = /^[A-Za-z]{4,16}$/;
    return re.test(text);
  };

  // 이름 입력 검증 (한국어만)
  const validateName = (text) => {
    const re = /^[가-힣]+$/;
    return re.test(text);
  };

  //비밀번호 입력 8~20자 제한
  const validatePassword = (text) => {
    const re = /^.{8,20}$/;
    return re.test(text);
  };

  // 전화번호 입력 검증 ("010xxxxxxxx" 형식)
  const validatePhone = (text) => {
    const re = /^010\d{8}$/;
    return re.test(text);
  };

  const handleRegister = async () => {
    if (!isIdDoubleCheck) {
      Alert.alert('아이디 중복확인', "아이디 중복확인을 진행해주세요!")
    } else {
      if (isFormValid) {
        console.log(id, password, name, phone)
        try {
          const response = await axios.post('http://192.168.123.104:8008/boot/user/regist', {
            id,
            password,
            name,
            phone,
          });
          Alert.alert('Success', "회원가입에 성공하였습니다!")
          props.navigation.navigate('Home')
          console.log('Registration successful:', response.data);
        } catch (error) {
          console.error('Registration failed:', error);
          Alert.alert('Error', '회원가입에 실패했습니다.');
        }
      } else {
        const isIdValid = id.trim() !== '' && validateId(id);
        const isPasswordValid = password.trim() !== '' && validatePassword(password)
        const isConfirmPasswordValid = confirmPassword.trim() !== '' && password === confirmPassword;
        const isNameValid = name.trim() !== '' && validateName(name);
        const isPhoneValid = phone.trim() !== '' && validatePhone(phone);

        if (!isIdValid) {
          Alert.alert('아이디 입력 오류', "아이디를 4~16자 사이로 입력해주세요!")
        } else if (!isPasswordValid) {
          Alert.alert('비밀번호 입력 오류', '비밀번호를 8~20자 사이로 입력해주세요!')
        } else if (!isConfirmPasswordValid) {
          Alert.alert('비밀번호 확인 오류', '비밀번호 확인 값이 올바르지 않습니다!')
        }
        else if (!isNameValid) {
          Alert.alert("이름 오류", "유효하지 않은 이름입니다!")
        } else if (!isPhoneValid) {
          Alert.alert("전화 번호 오류", "유효하지 않은 전화번호 입니다!")
        }
      }
    }
  };

  const validateForm = () => {
    const isIdValid = id.trim() !== '' && validateId(id);
    const isPasswordValid = password.trim() !== '' && validatePassword(password)
    const isConfirmPasswordValid = confirmPassword.trim() !== '' && password === confirmPassword;
    const isNameValid = name.trim() !== '' && validateName(name);
    const isPhoneValid = phone.trim() !== '' && validatePhone(phone);

    setIsFormValid(
      isIdValid && isPasswordValid && isConfirmPasswordValid && isNameValid && isPhoneValid
    );
  };

  const idDoubleCheck = async () => {
    try {
      const response = await axios.post('http://:8008/boot/user/checkId', {
        id,
      });
      if (response.data && response.data.List.length === 0) {
        alert('사용 가능한 아이디입니다.');
        setIsDisabled(true)
        setIsIdDoubleCheck(true)
      } else {
        alert('이미 사용 중인 아이디입니다.');
      }
    } catch (error) {
      console.error('ID check failed:', error);
      Alert.alert('Error', '아이디 중복 확인에 실패했습니다.');
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => props.navigation.goBack()}
      >
        <Text style={styles.backButtonText}>뒤로</Text>
      </TouchableOpacity>
      <Image source={require('../assets/LINE_Corporation_Logo.png')} style={styles.LoginImage} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#00B900' }}>회원 가입</Text>
      <View style={styles.idContainer}>
        <TextInput
          style={styles.InputIdForm}
          placeholder="아이디"
          value={id}
          onChangeText={(text) => {
            setId(text);
            validateForm();
            setIsDisabled(text.trim() === '');
            setIsIdDoubleCheck(false)
          }}
        />
        <TouchableOpacity style={[styles.doubleCheckButton,
        isDisabled && styles.disabledButton]} disabled={isDisabled} onPress={idDoubleCheck}>
          <Text style={styles.dobuleCheckButtonText}>중복확인</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.InputForm}
        placeholder="비밀번호"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          validateForm();
        }}
      />
      <TextInput
        style={styles.InputForm}
        placeholder="비밀번호 확인"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          validateForm();
        }}
      />
      <TextInput
        style={styles.InputForm}
        placeholder="이름"
        value={name}
        onChangeText={(text) => {
          setName(text);
          validateForm();
        }}
      />
      <TextInput
        style={styles.InputForm}
        placeholder="전화번호 010xxxxxxxx"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={(text) => {
          setPhone(text);
          validateForm();
        }}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: -20,
    left: 20,
    padding: 10,
    backgroundColor: '#00B900',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  InputIdForm: {
    padding: 15,
    marginVertical: 10,
    width: '47%',
  },
  InputForm: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#00B900',
    width: '70%',
  }, container: {
    alignItems: 'center',
    marginTop: '30%',
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00B900',
  }, registerButton: {
    backgroundColor: '#00B900',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginTop: 20,
    width: '40%',
    alignItems: 'center'
  }, registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }, doubleCheckButton: {
    backgroundColor: '#00B900',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center'
  }, dobuleCheckButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  }, disabledButton: {
    backgroundColor: '#D3D3D3',
  }, LoginImage: {
    width: "50%",
    resizeMode: "contain",
    height: '10%',
    margin: '10%'
  },
})
export default Register;
