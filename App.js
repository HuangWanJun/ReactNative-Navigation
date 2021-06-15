import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  BackHandler,
} from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { IconOutline } from '@ant-design/icons-react-native';
import { Button } from '@ant-design/react-native';
import IconWithBadge from './IconWithBadge';
import HeaderButtons from './HeaderButtons';
import getActiveRouteName from './getActiveRouteName';
import getScreenOptions from './getScreenOptions';
import { navigationRef } from './NavigationService';
import { useEffect } from 'react';
import FlatListDemo from './pages/FlatListDemo';
import SectionListDemo from './pages/SectionListDemo';
import VectIconDemo from './pages/VectIconDemo';

const HomeScreen = ({ navigation, route }) => {
  navigation.setOptions({
    headerLeft: props => (
      <HeaderBackButton
        {...props}
        onPress={() => {
          console.log('不能再返回了！');
        }}
      />
    ),
    headerRight: () => (
      <HeaderButtons>
        {/* title、iconName、onPress、IconComponent、iconSize、color */}
        <HeaderButtons.Item
          title="添加"
          iconName="like"
          onPress={() => console.log('点击了添加按钮')}
          iconSize={24}
          color="red"
        />
      </HeaderButtons>
    ),
  });

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );
  const { author } = route.params || {};
  console.log("author" + author);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text>Home Screen2222</Text>
        <Text>{author}</Text>
        <Button
          type="warning"
          // 使用 setOptions 更新标题
          onPress={() => navigation.setOptions({ headerTitle: 'Updated!' })}>
          Update the title
        </Button>
        <Button
          type="primary"
          onPress={() =>
            // 跳转到指定页面，并传递两个参数
            navigation.navigate('DetailsScreen', {
              otherParam: 'anything you want here',
            })
          }>
          Go to DetailsScreen
        </Button>
        <Button
          type="warning"
          onPress={() => navigation.navigate('SafeAreaViewScreen')}>
          Go SafeAreaViewScreen
        </Button>
        <Button
          type="primary"
          onPress={() =>
            navigation.navigate('CustomAndroidBackButtonBehaviorScreen')
          }>
          Go CustomAndroidBackButtonBehavior
        </Button>
        <Button type='ghost'
          onPress={() => {
            navigation.navigate('FlatListDemo')
          }}
        >
          GO FlatList
        </Button>
        <Button type='primary'
          onPress={() => {
            navigation.navigate('SectionListDemo')
          }}
        >
          GO SectionList
        </Button>
        <Button type='warning'
          onPress={() => {
            navigation.navigate('VectIconDemo')
          }}
        >
          GO VectIconDemo
        </Button>
      </View>
    </>
  );
};

const DetailsScreen = ({ navigation, route }) => {
  // 通过 props.route.params 接收参数
  const { itemId, otherParam } = route.params;

  // 相似於 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用瀏覽器 API 更新文件標題
    console.log("useEffect");
  });

  useEffect(() => {
    // 使用瀏覽器 API 更新文件標題
    console.log("once time");
  }, []);

  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Text>itemId: {itemId}</Text>
      <Text>otherParam: {otherParam}</Text>
      <Button
        type="primary"
        // 返回上一页
        onPress={() => navigation.goBack()}>
        Go back
      </Button>
      <Button
        type="primary"
        // 如果返回上一个页面需要传递参数，请使用 navigate 方法
        onPress={() => navigation.navigate('HomeScreen', { author: 'XXXXXx' })}>
        Go back with Params
      </Button>
    </View>
  );
};

const SettingsScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      <Text>This is top text.</Text>
      <Text>This is bottom text.</Text>
    </SafeAreaView>
  );
};

const SafeAreaViewScreen = () => {
  return (

    <SafeAreaView
      style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      <Text>This is top text.</Text>
      <Text>This is bottom text.</Text>
    </SafeAreaView>

  );
};

const CustomAndroidBackButtonBehaviorScreen = ({ navigation, route }) => {
  useEffect(() => {
    console.log("add event");
    const backAction = () => {
      console.log("alert");
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        alert('物理返回键被拦截了！');
        console.log('物理返回键被拦截了');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  return (
    <View style={styles.container}>
      <Text>AndroidBackHandlerScreen</Text>
    </View>
  );
};

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const BottomTabScreen = () => (
  <BottomTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'HomeScreen') {
          iconName = focused ? 'apple' : 'apple';
          return (
            <IconWithBadge badgeCount={90}>
              <IconOutline name={iconName} size={size} color={color} />
            </IconWithBadge>
          );
        } else if (route.name === 'SettingsScreen') {
          iconName = focused ? 'twitter' : 'twitter';
        }
        return <IconOutline name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ tabBarLabel: '首页' }}
    />
    <Stack.Screen
      name="SettingsScreen"
      component={SettingsScreen}
      options={{ tabBarLabel: '设置' }}
    />
  </BottomTab.Navigator>
);
const App = () => {
  const routeNameRef = React.useRef(null);
  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={state => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = getActiveRouteName(state);
          if (previousRouteName !== currentRouteName) {
            console.log('[onStateChange]', currentRouteName);
            if (currentRouteName === 'HomeScreen') {
              StatusBar.setBarStyle('dark-content'); // 修改 StatusBar
            } else {
              StatusBar.setBarStyle('dark-content'); // 修改 StatusBar
            }
          }
          // Save the current route name for later comparision
          routeNameRef.current = currentRouteName;
        }}>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          // 页面共享的配置
          screenOptions={getScreenOptions()}>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerTitle: 'My Home', tabBarLabel: '首页' }}
          />
          <Stack.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{ headerTitle: '详情 my Detail' }} // headerTitle 用来设置标题栏
            initialParams={{ itemId: 42 }} // 默认参数
          />
          <Stack.Screen
            name="SafeAreaViewScreen"
            component={SafeAreaViewScreen}
            options={{ headerTitle: 'SafeAreaView' }}
          />
          <Stack.Screen
            name="CustomAndroidBackButtonBehaviorScreen"
            component={CustomAndroidBackButtonBehaviorScreen}
            options={{ headerTitle: '拦截安卓物理返回键' }}
          />
          <Stack.Screen
            name="FlatListDemo"
            component={FlatListDemo}
            options={{ headerTitle: 'Flat List' }}
          />
          <Stack.Screen
            name="SectionListDemo"
            component={SectionListDemo}
            options={{ headerTitle: 'SectionListDemo' }}
          />
          <Stack.Screen
            name="VectIconDemo"
            component={VectIconDemo}
            options={{ headerTitle: 'VectIconDemo' }}
          />
          {/* <Stack.Screen
            name="BottomTabScreen"
            component={BottomTabScreen}
            options={{ headerShown: false }}
          />
         
         
        */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;