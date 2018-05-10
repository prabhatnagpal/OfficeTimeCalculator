import React from 'react'
import {StyleSheet, Text, View, AsyncStorage} from 'react-native'
import {Button} from "../components/Button"

export default class Dues extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dues: null,
            savings: 0
        };
    }

    resetData = () => {
        AsyncStorage.removeItem('dueTime');
        //AsyncStorage.clear();
    };

    getDueTime = async () => {
        let dueTime = await AsyncStorage.getItem('dueTime');
        let parsedDueTime = JSON.parse(dueTime);
        if (parsedDueTime !== null) {
            let hours = Math.floor(Math.abs(parsedDueTime.duesVar) / 60);
            let mins = Math.abs(parsedDueTime.duesVar) % 60;
            if (hours === 0)
                this.setState({dues: -mins + ' Mins'});
            else if (hours > 0 && mins === 0)
                this.setState({dues: -hours + ' Hrs'});
            else if (hours > 0 && mins > 0)
                this.setState({dues: -hours + ' Hrs ' + mins + ' Mins'});
        }
        else {
            this.setState({dues: 0 + ' Mins'})
        }
    };

    componentDidMount() {
        this.getDueTime().done()
    }

    displayDueTime() {
        if (this.props.screenProps.key === 0) {
            this.getDueTime().done();
            return this.state.dues
        }
        else {
            return this.state.dues
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
                        }, {textShadowRadius: 5}, {color: '#d32f2f'}]}>Current Dues</Text>
                        <Text style={[styles.textBody, {fontSize: 27}, {paddingTop: 20}, {color: '#d32f2f'}]}>
                            {this.displayDueTime()}
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBody: {
        fontWeight: '600',
        textAlign: 'center'
    }
});