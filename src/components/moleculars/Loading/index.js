import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors, fonts } from '../../../utils'
import { Gap } from '../../atoms'

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' />
            <Gap height={RFValue(12)} />
            <Text style={styles.text}>Loading</Text>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.blackOp,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    text: {
        fontSize: RFValue(14),
        color: colors.white,
        fontFamily: fonts.primary[500]
    }
})