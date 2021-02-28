import React, {useContext} from 'react';
import { Button, StyleSheet } from 'react-native';
import {AuthContext} from "../contexts/AuthContext";

const LogoutButton = ({ title="Logout", navigation }) => {
  const [{isLoggedIn}, dispatch] = useContext(AuthContext);

  const doLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
    navigation.popToTop();
  };

  return (
    <Button title={title} onPress={()=>doLogout()} />
  );
}

const styles = StyleSheet.create({
  
});

export default LogoutButton;