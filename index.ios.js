/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var moment = require('moment');
var IdleTimerManager = require('NativeModules').IdleTimerManager;

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';

class simpleClock extends Component {

    constructor() {
        super();

        this.state = {};
    }

    componentDidMount() {
        this.setState({clock: moment().format('hh:mm')});
        setInterval(() => {
            this.setState({clock: moment().format('hh:mm')});
        }, 1000 * 60);
    }

    componentWillMount() {
        IdleTimerManager.setIdleTimerDisabled(true);
    }

    componentWillUnmount() {
        IdleTimerManager.setIdleTimerDisabled(false);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <Text style={styles.clock}>
                    {this.state.clock}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    clock: {
        fontSize: 140,
        textAlign: 'center',
        margin: 10,
        color: '#333'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

AppRegistry.registerComponent('simpleClock', () => simpleClock);
