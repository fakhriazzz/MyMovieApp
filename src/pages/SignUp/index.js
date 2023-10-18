import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Button, Gap, HeaderBack, Input } from '../../components'
import { colors, fonts, storeData } from '../../utils'

const SignUp = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setloading] = useState(false)

    const onSignNative = () => {
        if (name == '') {
            Alert.alert('That name address is invalid!');
        } else if (email == '') {
            Alert.alert('That email address is invalid!');
        } else if (password == '') {
            Alert.alert('That password is invalid!');
        } else if (password.length < 8) {
            Alert.alert('That password length minimun 8 character');
        } else {
            setloading(true)
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    try {
                        database()
                            .ref(`users/${email.replace(/["@.]/g, '')}`)
                            .push({
                                name: name
                            })
                        const data = {
                            email: email.replace(/["@.]/g, ''),
                        }
                        storeData('user', data)
                        navigation.replace('Home')
                        setloading(false)
                    } catch (error) {
                        setloading(false)
                    }
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert('That email address is already in use!');
                        setloading(false)
                    }
                    if (error.code === 'auth/invalid-email') {
                        Alert.alert('That email address is invalid!');
                        setloading(false)
                    }
                    Alert.alert(error.toString());
                    setloading(false)
                });

        }

    }

    return (
        <View style={styles.container}>
            <HeaderBack onPress={() => navigation.goBack()} />
            <View style={{ paddingHorizontal: RFValue(24), width: '100%' }}>
                <Text style={styles.text}>Sign Up</Text>
                <Gap height={RFValue(16)} />
                <Input placeholder='Name' value={name} onChangeText={(value) => setName(value)} />
                <Gap height={RFValue(12)} />
                <Input placeholder='Email' value={email} onChangeText={(value) => setEmail(value)} />
                <Gap height={RFValue(12)} />
                <Input placeholder='Password' value={password} onChangeText={(value) => setPassword(value)} />
                <Gap height={RFValue(24)} />
                <Button text={loading ? 'Wait loading ...' : 'Sign In'} onPress={onSignNative} />
            </View>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    image: {
        width: RFValue(400),
        height: RFValue(500)
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    text: {
        fontSize: RFValue(16),
        color: colors.black,
        fontFamily: fonts.primary[500]
    }
})