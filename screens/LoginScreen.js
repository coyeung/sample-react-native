import React, {useContext, useEffect} from 'react';
import { Button, View, SafeAreaView, StatusBar, Text, TextInput, StyleSheet } from 'react-native';

import {AuthContext} from "../contexts/AuthContext";
import {getStore} from '../utils/Store';
import NetworkConfig from '../config/NetworkConfig';

export default function LoginScreen(props) {
  const { navigation } = props;
  const [{isLoggedIn}, dispatch] = useContext(AuthContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState("");

  // Restore last session, Nav to home directly if logged in
  useEffect(() => {
    const restoreSession = async() => {
      let user = await getStore("sampleRN.user");
      let token = await getStore("sampleRN.token");

      if (user && token) {
        dispatch({
          type: 'LOGIN', 
          user: JSON.parse(user),
        });
        navigation.navigate('Authorized');
      }
    }
    restoreSession();
  }, []);

  const _login = () => {
    fetch(NetworkConfig.localhost+':'+NetworkConfig.port+'/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    }).then(function(res) {
      let json = res.json();
      if(res.status !== 200) {
        throw new Error(json.message);
      }
      else return json;
    }).then(function(json) {
      console.log(json);
      dispatch({
        type: 'LOGIN', 
        user: json,
      });
      navigation.navigate('Authorized');
    }).catch((error) => {
      setError(error.message);
    });
  }; 

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      { (error != "") && <Text style={styles.errorMsg}>{error}</Text>}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ marginHorizontal: 5}}>
          <Button
            title="Login"
            onPress={() => _login()}
          />
        </View>
        <View style={{ marginHorizontal: 5}}>
          <Button
            title="New User"
            onPress={() => navigation.navigate('NewUser')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  input: {
    width: "90%",
    maxWidth: 500,
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  errorMsg: {
    width: "90%",
    maxWidth: 500,
    fontSize: 20,
    height: 44,
    padding: 10,
    backgroundColor: "#FFAAAA",
    marginVertical: 10,
  },
  title: {
    width: "90%",
    maxWidth: 500,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});