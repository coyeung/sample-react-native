import React, {useContext, useState, useEffect} from "react";
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Platform, Button } from 'react-native';

import NetworkConfig from '../config/NetworkConfig';
import { AuthContext } from "../contexts/AuthContext";

export default function DetailScreen({route, navigation}) {
    const [authState, dispatch] = useContext(AuthContext);

    const { itemId } = route.params;

    const [error, setError] = React.useState("");
    const [consltDetail, setConsltDetail] = useState({});

    const _fetchRecord = () => {
        fetch(NetworkConfig.localhost+':'+NetworkConfig.port+'/api/consultation/'+itemId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': authState.token
            },
        }).then(function(res) {
            let json = res.json();
            if(res.status !== 200) {
                throw new Error(json.message);
            }
            else return json;
        }).then(function(json) {
            console.log(json);
            setConsltDetail(json);
        }).catch((error) => {
            setError(error.message);
        });
    };

    useEffect(() => {
        _fetchRecord();
    }, []);

    const DetailForm = ({data}) => (
        <View style={styles.table}>
            <View style={styles.row}>
                <Text style={styles.col_key}>Doctor Name</Text>
                <Text style={styles.col_value}>{data.doctor_name}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.col_key}>Patient Name</Text>
                <Text style={styles.col_value}>{data.patient_name}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.col_key}>Diagnosis</Text>
                <Text style={styles.col_value}>{data.diagnosis}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.col_key}>Medication</Text>
                <Text style={styles.col_value}>{data.medication}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.col_key}>Conslt fee</Text>
                <Text style={styles.col_value}>{data.conslt_fee}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.col_key}>Date</Text>
                <Text style={styles.col_value}>{data.date}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.col_key}>Time</Text>
                <Text style={styles.col_value}>{data.time}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.col_key}>Follow up</Text>
                <Text style={styles.col_value}>{data.has_followup ? "Yes" : "No"}</Text>
            </View>
        </View>
        
    );

    return (

        <View style={styles.container}>
            { (error != "") && <Text style={styles.errorMsg}>{error}</Text>}
            { consltDetail && <DetailForm data={consltDetail} />}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        width: "100%",
        maxWidth: 500,
        marginHorizontal: "auto"
    },
    table: {
        marginHorizontal: 10,
    },
    row: {
        flexDirection: 'row', 
        justifyContent: 'center',
        marginVertical: 10,
    },
    col_key: {
        width:  "30%",
        fontSize: 17,
        fontWeight: "bold",
        padding: 2
    },
    col_value: {
        width:  "70%",
        fontSize: 17,
        backgroundColor: "#FFFFFF",
        padding: 2
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
});
