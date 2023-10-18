import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { IconStar } from '../../../assets'
import { colors, fonts } from '../../../utils'
import { Gap } from '../../atoms'

const CardReview = ({ name, review, imageUri, rating }) => {
    const [show, setshow] = useState(false)
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w500/${imageUri}` }} />
            <Gap width={RFValue(12)} />
            <View>
                <View style={styles.container}>
                    <Text style={styles.text}>{name}</Text>
                    <Gap width={RFValue(8)}/>
                    <IconStar />
                    <Gap width={RFValue(4)}/>
                    <Text style={styles.text3}>{rating}</Text>
                </View>
                <Text numberOfLines={show ? null : 5} style={styles.text2}>{review}</Text>
                <TouchableOpacity onPress={() => setshow(!show)}>
                    <Text style={styles.text3}>{show ? 'hide' : 'see more'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CardReview

const styles = StyleSheet.create({
    image: {
        height: RFValue(36),
        width: RFValue(36),
        borderRadius: RFValue(18)
    },
    text: {
        fontSize: RFValue(14),
        fontFamily: fonts.primary[500],
        color: colors.black
    },
    text2: {
        fontSize: RFValue(12),
        fontFamily: fonts.primary[400],
        color: colors.black,
        maxWidth: RFValue(260),
        lineHeight: RFValue(18)
    },
    text3: {
        fontSize: RFValue(12),
        fontFamily: fonts.primary[600],
        color: colors.black
    },
    container: {
        flexDirection: 'row',
        marginBottom: RFValue(12)
    }
})