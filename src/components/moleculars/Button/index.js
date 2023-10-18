import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors, fonts } from '../../../utils'

const Button = ({ onPress, margin, text }) => {
    return (
        <TouchableOpacity style={styles.container(margin)} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    container: margin => ({
        backgroundColor: colors.navy,
        borderRadius: RFValue(12),
        alignItems: 'center',
        justifyContent: 'center',
        padding: RFValue(12),
        margin: margin ? margin : null
    }),
    text: {
        fontSize: RFValue(14),
        fontFamily: fonts.primary[600],
        color: colors.white
    }
})