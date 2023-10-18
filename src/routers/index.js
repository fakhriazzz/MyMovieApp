import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { DetailMovie, Home, MoreMovie, Search, Sign, SignUp, Splash } from '../pages';

const Stack = createNativeStackNavigator();

const Routers = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MoreMovie" component={MoreMovie} />
            <Stack.Screen name="DetailMovie" component={DetailMovie} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Sign" component={Sign} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    )
}

export default Routers

const styles = StyleSheet.create({})