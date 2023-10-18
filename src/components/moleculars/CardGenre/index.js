import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors, fonts } from '../../../utils'

const CardGenre = ({label}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
        </View>
    )
}

export default CardGenre

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.grey,
        padding: RFValue(8),
        borderRadius: RFValue(8),
        alignSelf: 'flex-start',
        marginRight: RFValue(4)
    },
    text:{
        fontSize: RFValue(12),
        fontFamily: fonts.primary[600],
        color: colors.black
    }
})