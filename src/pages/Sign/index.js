import auth from '@react-native-firebase/auth'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Button, Gap, Input } from '../../components'
import { colors, fonts, storeData } from '../../utils'
import MMKVStorage from 'react-native-mmkv-storage'

const Sign = ({ navigation }) => {
    const storage = new MMKVStorage.Loader().initialize();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setloading] = useState(false)

    const onSignNative = () => {
        if (email == '') {
            Alert.alert('That email address is invalid!');
        } else if (password == '') {
            Alert.alert('That password is invalid!');
        } else if (password.length < 8) {
            Alert.alert('That password length minimun 8 character');
        } else {
            setloading(true)
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    storage.setString('email', email.replace(/["@.]/g, ''),);
                    // storeData('user', data)
                    navigation.navigate('Home')
                    setloading(false)
                })
                .catch(error => {
                    Alert.alert(error.toString());
                    setloading(false)
                });
        }

    }

    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: RFValue(24), width: '100%' }}>
                <Text style={styles.text}>Sign In</Text>
                <Gap height={RFValue(16)} />
                <Input placeholder='Email' value={email} onChangeText={(value) => setEmail(value)} />
                <Gap height={RFValue(12)} />
                <Input placeholder='Password' value={password} onChangeText={(value) => setPassword(value)} />
                <Gap height={RFValue(24)} />
                <Button text={loading ? 'Wait loading ...' : 'Sign In'} onPress={onSignNative} />
                <Gap height={RFValue(12)} />
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.text2}>Create account</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Sign

const styles = StyleSheet.create({
    image: {
        width: RFValue(400),
        height: RFValue(500)
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: RFValue(16),
        color: colors.black,
        fontFamily: fonts.primary[500]
    },
    text2: {
        fontSize: RFValue(12),
        color: colors.black,
        fontFamily: fonts.primary[500],
        alignSelf: 'center'
    }
})