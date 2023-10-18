import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors, fonts } from '../../../utils'

const CardCast = ({ imageUri, original_name, character }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w500/${imageUri}` }} />
            <Text numberOfLines={1} style={styles.text}>{original_name}</Text>
            <Text numberOfLines={1} style={styles.text2}>{character}</Text>
        </View>
    )
}

export default CardCast

const styles = StyleSheet.create({
    image: {
        width: RFValue(36),
        height: RFValue(36),
        borderRadius: RFValue(18)
    },
    container: {
        width: RFValue(100),
        marginRight: RFValue(12)
    },
    text: {
        fontSize: RFValue(12),
        fontFamily: fonts.primary[600],
        color: colors.black
    },
    text2: {
        fontSize: RFValue(12),
        fontFamily: fonts.primary[400],
        color: colors.black
    }
})