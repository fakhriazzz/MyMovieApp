import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { IconStar } from '../../../assets'
import { colors, fonts } from '../../../utils'
import { Gap } from '../../atoms'

const CardList = ({ onPress, title, rating, imageUri }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image style={styles.imagebag} source={{ uri: `https://image.tmdb.org/t/p/w500/${imageUri}` }} />
            <Gap width={RFValue(12)} />
            <View>
                <Text numberOfLines={2} style={styles.text}>{title}</Text>
                <Gap height={RFValue(4)} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconStar />
                    <Gap width={RFValue(4)} />
                    <Text style={styles.text2}>{rating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CardList

const styles = StyleSheet.create({
    imagebag: {
        height: RFValue(56),
        width: RFValue(56),
        borderRadius: RFValue(8)
    },
    text: {
        fontSize: RFValue(14),
        color: colors.black,
        fontFamily: fonts.primary[600],
        maxWidth: RFValue(240)
    },
    text2: {
        fontSize: RFValue(12),
        color: colors.black,
        fontFamily: '400'
    },
    container: {
        marginBottom: RFValue(12),
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: RFValue(24)
    }
})