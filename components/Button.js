import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const Button = (props) => {
    return (
        <TouchableOpacity
            style={[styles.buttonBody, {elevation: props.count <= 0 ? 0 : 8}]}
            onPress={() => props.sendData()} activeOpacity={props.count <= 0 ? 1 : 0.2}>
            <Text style={styles.buttonText}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonBody: {
        backgroundColor: '#1A237E',
        padding: 17,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // elevation: 8
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: '600',
    },
});

export {Button}