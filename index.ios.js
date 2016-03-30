/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var moment = require('moment');
var daLocale = require('moment/locale/da');
var IdleTimerManager = require('NativeModules').IdleTimerManager;

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Dimensions
} from 'react-native';

class simpleClock extends Component {

    constructor() {
        super();

        this.state = {
            fontSize: 140
        };
    }

    componentDidMount() {
        // use danish local
        moment.locale('da', daLocale);
        // set the initial clock
        this.setState({clock: moment().format('HH:mm')});
        // update the clock every minute - yes, it can cause a minute to be skipped but what the heck
        setInterval(() => {
            this.setState({clock: moment().format('HH:mm')});
        }, 1000 * 60);
    }

    componentWillMount() {
        // Force iPhone to stay on
        IdleTimerManager.setIdleTimerDisabled(true);
    }

    componentWillUnmount() {
        // Allow iPhone to turn off again
        IdleTimerManager.setIdleTimerDisabled(false);
    }

    render() {
        return (
            <View style={styles.container} onLayout={this._onLayout}>
                <StatusBar hidden={true}/>
                <Text style={[styles.clock, {fontSize: this.state.fontSize}]}>
                    {this.state.clock}
                </Text>
            </View>
        );
    }

    _onLayout = event => {
        var {height, width} = event.nativeEvent.layout;
        this.setState({'fontSize': width > 400 ? 140 : 100} );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    clock: {
        fontFamily: 'HelveticaNeue-Light',
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
