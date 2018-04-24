import React from 'react'
import {StyleSheet, Text, View, AsyncStorage} from 'react-native'
import {Button} from "../components/Button"

export default class Savings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            savings: 0
        };
    }

    resetData = () => {
        AsyncStorage.removeItem('savedTime');
        //AsyncStorage.clear();
    };

    getSavingTime = async () => {
        let savedTime = await AsyncStorage.getItem('savedTime');
        let parsedSavedTime = JSON.parse(savedTime);
        if (parsedSavedTime !== null) {
            this.setState({savings: parsedSavedTime.savingsVar});
        }
        else {
            this.setState({savings: 0})
        }
    };

    componentDidMount() {
        this.getSavingTime().done();
    }

    displaySavingTime() {
        if (this.props.screenProps.key === 2) {
            this.getSavingTime().done();
            return this.state.savings
        }
        else {
            return this.state.savings
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <View style={[styles.textContainer]}>
                        <Text style={[styles.textBody, {color: 'green'}]}>Current
                            Savings:  {this.displaySavingTime()}</Text>
                    </View>
                </View>
                <View style={[styles.container, {flex: 1.5, justifyContent: 'flex-end'}]}>
                    <View style={styles.resetButtonContainer}>
                        <Button sendData={() => this.resetData()} title={'Reset'}/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#81C784'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 50,
        paddingTop: 40,
        backgroundColor: 'white'
    },
    displayButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50
    },
    resetButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBody: {
        flex: 1,
        fontSize: 25,
        fontWeight: '600'
    }
});
