import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome6";

const InputBox = ({ label, onChangeText }) => {
    return (
        <View style={{ marginBottom: 20 }}>
            <Text>{label}</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const Quiz = ({ img, opt1, opt2, opt3, onSelectAnswer }) => {
    return (
        <View style={{ marginBottom: 20 }}>
            <Image source={img} style={{ width: 400, height: 300 }} />
            <Text style={{ marginTop: 10 }}>What animal is this?</Text>
            <RNPickerSelect
                onValueChange={(value) => onSelectAnswer(value)}
                items={[
                    { label: opt1, value: 1 },
                    { label: opt2, value: 2 },
                    { label: opt3, value: 3 },
                ]}
            />
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
        <View style={{ padding: 20, paddingTop: 50, paddingBottom: 100}}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="paw" size={30} color="red" />
                <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold'}}>Animal Quiz</Text>
                <Icon name="paw" size={30} color="red" />
            </View>
            <InputBox label="Username"  onChangeText={(text) => setUsername(text)} />
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
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
                <Button title="Submit Answers" onPress={Submit} />
            </ScrollView>
        </View>
    );
};

export default MyApp;


