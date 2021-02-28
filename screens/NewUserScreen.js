import React, { useContext } from 'react';
import { Button, View, SafeAreaView, Text, TextInput, StyleSheet } from 'react-native';
import { AuthContext } from "../contexts/AuthContext";

import NetworkConfig from '../config/NetworkConfig';

export default function NewUserScreen(props) {
  const { navigation } = props;

  const [{isLoggedIn}, dispatch] = useContext(AuthContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConf, setPasswordConf] = React.useState("");
  const [clinicName, setClinicName] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState("");
  const [addr, setAddr] = React.useState("");

  const [error, setError] = React.useState("");

  const _createUser = () => {
    if (password !== passwordConf) {
      setError("Password not match");
      return;
    }
    fetch(NetworkConfig.localhost+':'+NetworkConfig.port+'/api/auth/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        clinic_name: clinicName,
        phone_no: phoneNo,
        addr: addr,
      })
    }).then(async function(res) {
      let json = await res.json();
      if(res.status !== 200) {
        console.log(json);
        throw new Error(json.message);
      }
      else return json;
    }).then(function(json) {
      navigation.navigate('Login');
    }).catch((error) => {
      setError(error.message);
    });
  }; 

  return (
    <SafeAreaView style={styles.view}>
      {/* <Text style={styles.title}>New User</Text> */}
      <TextInput
        value={email}
        keyboardType = 'email-address'
        onChangeText={(value) => {setEmail(value)}}
        placeholder='email'
        style={styles.input}
      />
      <TextInput
        value={password}
        keyboardType = 'default'
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
        placeholder='password'
        style={styles.input}
      />
      <TextInput
        value={passwordConf}
        keyboardType = 'default'
        secureTextEntry={true}
        onChangeText={(value) => setPasswordConf(value)}
        placeholder='Confirm Password'
        style={styles.input}
      />
      <TextInput
        value={clinicName}
        keyboardType = 'default'
        onChangeText={(value) => setClinicName(value)}
        placeholder='Clinic Name'
        style={styles.input}
      />
      <TextInput
        value={phoneNo}
        keyboardType = 'phone-pad'
        onChangeText={(value) => setPhoneNo(value)}
        placeholder='Phone No.'
        style={styles.input}
      />
      <TextInput
        value={addr}
        keyboardType = 'default'
        multiline
        numberOfLines = {4}
        onChangeText={(value) => setAddr(value)}
        placeholder='Address'
        style={styles.textArea}
      />
      { (error != "") && <Text style={styles.errorMsg}>{error}</Text>}
      <Button 
        title="Submit"
        onPress={() => _createUser()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'flex-start'
  },
  input: {
    width: "90%",
    maxWidth: 500,
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  textArea: {
    width: "90%",
    maxWidth: 500,
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  errorMsg: {
    width: "90%",
    maxWidth: 500,
    fontSize: 15,
    height: 30,
    padding: 5,
    backgroundColor: "#FFAAAAAA",
    marginBottom: 5,
  },
  title: {
    width: "90%",
    maxWidth: 500,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});