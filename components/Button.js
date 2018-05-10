import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const Button = (props) => {
    return (
        <TouchableOpacity
            style={[props.count === 2 ? styles.greenButtonBody : styles.redButtonBody, {elevation: props.count <= 0 ? 0 : 8}]}
            onPress={() => props.sendData()} activeOpacity={props.count <= 0 ? 1 : 0.2}>
            <Text style={styles.buttonText}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    greenButtonBody: {
        backgroundColor: 'green',
        padding: 17,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    redButtonBody: {
        backgroundColor: '#d32f2f',
        padding: 17,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: '600'
    },
});

export {Button}