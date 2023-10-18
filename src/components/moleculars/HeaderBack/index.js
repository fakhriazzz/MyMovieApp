import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { IconBack } from '../../../assets'
import { Gap } from '../../atoms'
import { colors, fonts } from '../../../utils'

const HeaderBack = ({ onPress, label }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ width: RFValue(24), height: RFValue(24) }} onPress={onPress}>
                <IconBack />
            </TouchableOpacity>
            <Gap width={RFValue(8)} />
            <Text style={styles.text}>{label}</Text>
        </View>
    )
}

export default HeaderBack

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: RFValue(24),
        paddingVertical: RFValue(16),
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: RFValue(16),
        color: colors.black,
        fontFamily: fonts.primary[600]
    }
})