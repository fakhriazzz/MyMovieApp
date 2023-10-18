import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { IconStar } from '../../../assets'
import { colors, fonts } from '../../../utils'
import { Gap } from '../../atoms'

const CardNowPlaying = ({ title, rating, imageUri, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image style={styles.imagebag} source={{ uri: `https://image.tmdb.org/t/p/w500/${imageUri}` }} />
            <Gap height={RFValue(12)} />
            <View>
                <Text style={styles.text}>{title}</Text>
                <Gap height={RFValue(4)} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconStar />
                    <Gap width={RFValue(4)} />
                    <Text style={styles.text}>{rating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CardNowPlaying

const styles = StyleSheet.create({
    imagebag: {
        height: RFValue(162),
        width: RFValue(212),
        borderRadius: RFValue(12)
    },
    text: {
        fontSize: RFValue(14),
        color: colors.black,
        fontFamily: fonts.primary[600]
    },
    text2: {
        fontSize: RFValue(12),
        color: colors.black,
        fontFamily: '400'
    },
    container: {
        marginLeft: RFValue(14)
    }
})