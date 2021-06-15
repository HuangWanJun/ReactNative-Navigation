/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';

import {
    ActivityIndicator,
    Button, FlatList,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({ children, title }) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {children}
            </Text>
        </View>
    );
};

const city = ['hongkong', '1', '2', '3', '1', '2', '3'];



const FlatListDemo = ({ navigation, route }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const [isLoading, setIsLoading] = useState(false);
    const [dataArray, setDataArray] = useState(city);

    useEffect(() => {
        console.log("effect 1");
    }, [])

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    renderItem2 = (data) => {
        console.log('data:' + data.item);
        return <View style={styles.item}>
            <Text style={styles.Text}>{data.item}</Text>
        </View>
    };

    loadData = (refreshing) => {
        if (refreshing) {
            setIsLoading(true);
        }

        console.log('start' + isLoading);
        setTimeout(() => {
            let dataTemp = [];
            if (refreshing) {
                for (let i = dataArray.length - 1; i >= 0; i--) {
                    dataTemp.push(dataArray[i]);
                }
            } else {
                dataTemp = dataArray.concat('xxxxxxx');
            }

            console.log("dataTemp:" + dataTemp);
            setDataArray(dataTemp);
            setIsLoading(false);
            console.log("dataArray:" + dataArray);
            console.log('end');
        }, 2000);
    }

    genIndicator = () => {
        return <View style={styles.indicatorContrainer}>
            <ActivityIndicator size={'large'}
                animating={true}
                style={styles.indicator}
                color={'red'}
            >
            </ActivityIndicator>
            <Text style={styles.indicator}>Loading More</Text>
        </View>
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <View >
                <FlatList data={dataArray}
                    renderItem={(data) => this.renderItem2(data)}

                    refreshControl={
                        <RefreshControl title={'Loading'}
                            color={['red']}
                            tintColor={'orange'}
                            titleColor={'red'}
                            refreshing={isLoading}
                            onRefresh={() => loadData(true)}

                        />}
                    ListFooterComponent={() => genIndicator()}
                    onEndReached={() => loadData(false)}
                ></FlatList>
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    indicatorContrainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    item: {
        backgroundColor: '#169',
        height: 200,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Text: {
        color: 'white',
        fontSize: 20
    }
});

export default FlatListDemo;
