import React, {useContext, useState} from "react";
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { HeaderBackButton } from '@react-navigation/stack';
import moment from 'moment';

import NetworkConfig from '../config/NetworkConfig';
import { AuthContext } from "../contexts/AuthContext";

const Item = ({item, onPress}) => (
    <TouchableWithoutFeedback onPress={() => onPress(item.id)}>
        <View style={styles.item}>
            <Text style={styles.title}>{item.patient_name}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Text>{item.clinic}</Text>
                <Text>{item.date}</Text>
                <Text>{item.time}</Text>
            </View>
        </View>
    </TouchableWithoutFeedback>
);

export default function HomeScreen({navigation}) {
    const [authState, dispatch] = useContext(AuthContext);

    var today = moment().format('yyyy-MM-DD');
    var dateWeekLater = moment().add(7, 'days').format('yyyy-MM-DD');
    var dateMonthLater = moment().add(1, 'months').format('yyyy-MM-DD');

    const [isShowDatePicker, setIsShowDatePicker] = useState("");
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [consltData, setConsltData] = useState([]);

    const [error, setError] = React.useState("");

    const _logout = () => {
        dispatch({
          type: "LOGOUT"
        });
        navigation.popToTop();
    };

    const _fetchRecord = () => {
        fetch(NetworkConfig.localhost+':'+NetworkConfig.port+'/api/consultation/listing?dateFrom='+moment(dateFrom).format('yyyy-MM-DD')+'&dateTo='+moment(dateTo).format('yyyy-MM-DD'), {
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
            setConsltData(json);
        }).catch((error) => {
            setError(error.message);
        });
    };

    const showDatepicker = (target) => {
        setIsShowDatePicker(target);
    }

    const onDatePickerChange = (event, selectedDate) => {
        let target = isShowDatePicker;
        setIsShowDatePicker("");
        if (target == "dateFrom") {
            const currentDate = selectedDate || dateFrom;
            setDateFrom(currentDate);
        }
        else if (target == "dateTo") {
            const currentDate = selectedDate || dateTo;
            setDateTo(currentDate);
        }
    }

    const browseDetails = (id) => {
        navigation.navigate('Detail', {
            itemId: id,
        });
    }

    // Home nav
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: (props) => (
            <HeaderBackButton
                {...props}
                label = "Logout"
                truncatedLabel = "Logout"
                labelVisible = {true}
                labelStyle = {{color: "blue"}}
                backImage = {() => false}
                onPress = {_logout}
            />
          )
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            {
                (Platform.OS !== 'web') &&
                (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 5, }}>
                        <View style={{ width:"50%" }}>
                            <TouchableOpacity style={styles.button_secondary} onPress={() => {showDatepicker("dateFrom")}} color="#CCCCCC">
                                <Text style={{fontSize: 20, color: "#111111"}}>{"From: "+moment(dateFrom).format('yyyy-MM-DD')}</Text>
                            </TouchableOpacity>
                        </View>
                        {isShowDatePicker == "dateFrom" && (
                            <DateTimePicker
                            id="dateTimePickerFrom"
                            value={dateFrom}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onDatePickerChange}
                            />
                        )}
                        <View style={{ width:"50%" }}>
                            <TouchableOpacity style={styles.button_secondary} onPress={() => {showDatepicker("dateTo")}} color="#CCCCCC">
                                <Text style={{fontSize: 20, color: "#111111"}}>{"To: "+moment(dateTo).format('yyyy-MM-DD')}</Text>
                            </TouchableOpacity>
                        </View>
                        {isShowDatePicker == "dateTo" && (
                            <DateTimePicker
                            id="dateTimePickerTo"
                            value={dateTo}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onDatePickerChange}
                            />
                        )}
                    </View>
                )
            }
            <View>
                <TouchableOpacity style={styles.button} onPress={_fetchRecord}>
                    <Text style={{fontSize: 20, color: "#FFFFFF"}}>Search</Text>
                </TouchableOpacity>
            </View>
            { (error != "") && <Text style={styles.errorMsg}>{error}</Text>}
            <FlatList data={consltData} renderItem={({ item }) => <Item item={item} onPress={browseDetails}/>} keyExtractor={item => item.id.toString()} />
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
    item: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 8,
        borderWidth: 2
    },
    title: {
        fontSize: 22,
        fontWeight: "bold"
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#2196f3',
        padding: 10,
    },
    button_secondary: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
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
