import React from 'react'
import {StyleSheet, Text, View, AsyncStorage} from 'react-native'
import {Button} from "../components/Button"
import Moment from 'moment'
import {withNavigation} from "react-navigation";

class Home extends React.Component {

    entry = new Moment();
    exit = new Moment();
    duration = 0;

    constructor(props) {
        super(props);
        this.state = {
            curEntryTime: null,
            curExitTime: null,
            count: 2,
            savings: 0,
            dues: 0,
            btnTitle: 'Office Entry',
            visible: true
        };
    }

    onPress = () => {
        this.setState({
            count: --this.state.count
        });
        if (this.state.count === 1) {
            this.setState({
                btnTitle: 'Office Exit',
                curEntryTime: Moment().utc().local().format('hh:mm A')
            });
            this.setEntryTime();
        }
        else {
            this.setState({
                btnTitle: ' ',
                visible: !this.state.visible,
                curExitTime: Moment().utc().local().format('hh:mm A'),
            });
            this.setExitTime();
        }
    };

    resetData = () => {
        AsyncStorage.removeItem('entryTime');
        AsyncStorage.removeItem('exitTime');
        //AsyncStorage.clear();
    };

    setEntryTime() {
        let obj = {
            btnTitleVar: 'Office Exit',
            countVar: this.state.count,
            curEntryTimeVar: Moment().utc().local().format('hh:mm A')
        };
        this.entry = Moment(obj.curEntryTimeVar, "hh:mm A");
        AsyncStorage.setItem('entryTime', JSON.stringify(obj)).catch((errors) => console.log(errors));
    };

    setExitTime() {
        let obj = {
            btnTitleVar: ' ',
            countVar: this.state.count,
            visibleVar: !this.state.visible,
            curExitTimeVar: Moment().utc().local().format('hh:mm A')
        };
        this.exit = Moment(obj.curExitTimeVar, "hh:mm A");
        AsyncStorage.setItem('exitTime', JSON.stringify(obj)).catch((errors) => console.log(errors));

        this.duration = Moment.duration(this.exit.diff(this.entry)).asMinutes();

        let totalDuration = this.duration + this.state.dues + this.state.savings - 540;

        if (totalDuration >= 0) {
            let savedTime = {
                savingsVar: totalDuration
            };
            AsyncStorage.setItem('savedTime', JSON.stringify(savedTime)).catch((errors) => console.log(errors));
            AsyncStorage.removeItem('dueTime');
            this.setState({dues: 0})
        }
        else {
            let dueTime = {
                duesVar: totalDuration
            };
            AsyncStorage.setItem('dueTime', JSON.stringify(dueTime)).catch((errors) => console.log(errors));
            AsyncStorage.removeItem('savedTime');
            this.setState({savings: 0})
        }
    };

    getEntryTime = async () => {
        let entryTime = await AsyncStorage.getItem('entryTime');
        let parsedData = JSON.parse(entryTime);
        if (parsedData !== null) {
            this.setState({btnTitle: parsedData.btnTitleVar});
            this.setState({count: parsedData.countVar});
            this.setState({curEntryTime: parsedData.curEntryTimeVar});
        }
    };

    getExitTime = async () => {
        let exitTime = await AsyncStorage.getItem('exitTime');
        let parsedData = JSON.parse(exitTime);
        if (parsedData !== null) {
            this.setState({btnTitle: parsedData.btnTitleVar});
            this.setState({count: parsedData.countVar});
            this.setState({visible: parsedData.visibleVar});
            this.setState({curExitTime: parsedData.curExitTimeVar});
        }
    };

    getDueTime = async () => {
        let dueTime = await AsyncStorage.getItem('dueTime');
        let parsedDueTime = JSON.parse(dueTime);
        if (parsedDueTime !== null) {
            this.setState({dues: parsedDueTime.duesVar});
            //alert(this.state.savings)
        }
    };

    getSavingTime = async () => {
        let savedTime = await AsyncStorage.getItem('savedTime');
        let parsedSavedTime = JSON.parse(savedTime);
        if (parsedSavedTime !== null) {
            this.setState({savings: parsedSavedTime.savingsVar});
        }
    };

    componentDidMount() {
        this.getEntryTime().done();
        this.getExitTime().done();
        this.getDueTime().done();
        this.getSavingTime().done();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <View style={[styles.textContainer, {flexDirection: 'row'}]}>
                        <Text style={[styles.textBody, {color: 'green'}]}>In Time:</Text>
                        <Text style={[styles.textBody, {color: 'green'}]}>{this.state.curEntryTime}</Text>
                    </View>
                    <View style={[styles.textContainer, {flexDirection: 'row'}]}>
                        <Text style={[styles.textBody, {color: 'red'}]}>Out Time:</Text>
                        <Text style={[styles.textBody, {color: 'red'}]}>{this.state.curExitTime}</Text>
                    </View>
                </View>
                <View style={[styles.container, {flex: 1.5}]}>
                    <View style={styles.displayButtonContainer}>
                        {this.state.visible ? <Button sendData={() => this.state.count <= 0 ? null : this.onPress()}
                                                      count={this.state.count}
                                                      title={this.state.btnTitle}/> : (null,
                            this.state.dues === 0 ?
                                <Text style={[styles.textBody, {textAlign: 'center', color: '#1A237E'}]}>
                                    {'Swipe Left to See Savings'}
                                </Text> : this.state.savings === 0 ?
                                <Text style={[styles.textBody, {textAlign: 'center', color: '#1A237E'}]}>
                                    {'Swipe Right To See Dues'}
                                </Text> : null)}
                    </View>
                    <View style={styles.resetButtonContainer}>
                        <Button sendData={() => this.resetData()} title={'Reset'}/>
                    </View>
                </View>
            </View>
        )
    }
}

export default withNavigation(Home);

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