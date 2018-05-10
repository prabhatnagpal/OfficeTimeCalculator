import React from 'react'
import {StyleSheet, Text, View, AsyncStorage} from 'react-native'
import {Button} from "../components/Button"

export default class Savings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            savings: null,
            dues: 0
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
            let hours = Math.floor(parsedSavedTime.savingsVar / 60);
            let mins = parsedSavedTime.savingsVar % 60;
            if (hours === 0)
                this.setState({savings: mins + ' Mins'});
            else if (hours > 0 && mins === 0)
                this.setState({savings: hours + ' Hrs'});
            else if (hours > 0 && mins > 0)
                this.setState({savings: hours + ' Hrs ' + mins + ' Mins'});
        }
        else {
            this.setState({savings: 0 + ' Mins'})
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
                        <Text style={[styles.textBody, {fontSize: 28}, {textShadowColor: 'black'}, {
                            textShadowOffset: {
                                width: 1,
                                height: 1
                            }
                        }, {textShadowRadius: 5}, {color: 'green'}]}>Current Savings</Text>
                        <Text style={[styles.textBody, {fontSize: 27}, {paddingTop: 20}, {color: 'green'}]}>
                            {this.displaySavingTime()}
                        </Text>
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
        backgroundColor: '#293542'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    displayButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50
    },
    resetButtonContainer: {
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBody: {
        fontWeight: '600',
        textAlign: 'center',
    }
});