import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, ScrollView,StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome6";

const InputBox = ({ label, onChangeText }) => {
    return (
        <View style={{ marginBottom: 20 }}>
            <Text>{label}</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 11, marginVertical: 5 }}
                onChangeText={onChangeText}
            />
        </View>
    );
};
const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#f0f8ff',
      padding:10,
      paddingTop:20,
      borderRadius:10,
      borderWidth:1,
      borderColor:'#c4d4e2',
      marginTop:10,
  },
  title:{
      fontWeight:'bold',
      verticalAlign:'middle',
      textAlign:'center',
      backgroundColor:'#5d8aa8',
      padding:5,
      color:'whitesmoke',
      fontSize:20,
  },
  opt:{
      borderRadius:5,
      borderWidth:1,
      borderColor:'#a1caf1',
      marginTop:10,
      backgroundColor:'white',
  },
  image:{
      borderRadius:5,
      borderWidth:5,
      borderColor:'#dff0ff',

  },
  icon:{
      flex:1,
      justifyContent:'center',
      backgroundColor:'white',
      borderWidth:1,
      borderRadius:50,
      marginBottom:20,
      borderColor:'#c4d4e2',
      color:'white',
      fontWeight:900,
      alignSelf:'center',
  },
  border:{
      marginBottom:20,
      borderBottomWidth:5,
      borderStyle:'dashed',
      borderColor:'#5d8aa8',
  },




})
const Quiz = ({ img, opt1, opt2, opt3, onSelectAnswer }) => {
    return (
        <View style={[styles.container, { marginBottom: 20 }]}>
            <Icon name="circle" size={40} style={styles.icon} />
            <Image source={img} style={[styles.image,{ width: 350, height: 250 }]} />
            <Text style={[styles.title,{ marginTop: 10 }]}>What animal is this?</Text>
            <View style={styles.opt}>
            <RNPickerSelect
                onValueChange={(value) => onSelectAnswer(value)}
                items={[
                    { label: opt1, value: 1 },
                    { label: opt2, value: 2 },
                    { label: opt3, value: 3 },
                ]}
            />
            </View>
        </View>
    );
};

const MyApp = () => {
    const [username, setUsername] = useState('');
    const [points, setPoints] = useState(0);

    const AnswerSelect = (value, correctValue) => {
        if (value === correctValue) {
            setPoints((prevPoints) => prevPoints + 1);
        }
    };

    const Submit = () => {
        let feedback;
        if (points === 3) {
            feedback = "Well done " + username + "!";
        } else if (points === 2) {
            feedback = "Good job! You almost got them all.";
        } else if (points === 1) {
            feedback = "Good job! You almost got them all.";
        } else {
            feedback = "You can do better next time!";
        }

        Alert.alert("You got " + points + " out of 3 correct!", feedback);
        setPoints(0); // Reset points after submission
    };

    return (
        <View style={{ padding: 20, paddingTop: 50, paddingBottom: 150}}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginBottom:10 }}>
                <Icon name="paw" size={30} color="#5d8aa8" />
                <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold',}}>Animal Quiz</Text>
                <Icon name="paw" size={30} color="#5d8aa8"  />
            </View>
            <View style={styles.border}>
            <InputBox style={styles.username} label="Username"  onChangeText={(text) => setUsername(text)} />
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={styles.border}>
                <Quiz
                    img={require('./img/elephant.jpg')}
                    opt1="Elephant"
                    opt2="Horse"
                    opt3="Bee"
                    correctValue={1}
                    onSelectAnswer={(value) => AnswerSelect(value, 1)}
                />
                <Quiz
                    img={require('./img/deer.jpg')}
                    opt1="Tiger"
                    opt2="Deer"
                    opt3="Cheetah"
                    correctValue={2}
                    onSelectAnswer={(value) => AnswerSelect(value, 2)}
                />
                <Quiz
                    img={require('./img/giraffe.jpg')}
                    opt1="Lion"
                    opt2="Elephant"
                    opt3="Giraffe"
                    correctValue={3}
                    onSelectAnswer={(value) => AnswerSelect(value, 3)}
                />
                </View>
                <Button title="Submit Answers" onPress={Submit} />
            </ScrollView>

        </View>
    );
};

export default MyApp;


