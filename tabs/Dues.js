import React from 'react'
import {StyleSheet, Text, View, AsyncStorage} from 'react-native'
import {Button} from "../components/Button"

export default class Dues extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dues: 0,
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
            this.setState({dues: parsedDueTime.duesVar});
        }
        else {
            this.setState({dues: 0})
        }
    };

    componentDidMount() {
        this.getDueTime().done()
    }

    displayDueTime() {
        if(this.props.screenProps.key === 0)
        {
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
                    <View style={[styles.textContainer, {flexDirection: 'row'}]}>
                        <Text style={[styles.textBody, {color: 'red'}]}>Current Dues:  {this.displayDueTime()}</Text>
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
