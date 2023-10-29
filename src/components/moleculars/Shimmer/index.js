import React from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const Shimmer = ({ type }) => {
    const Item = () => {
        if (type == 'card') {
            return <ShimmerPlaceholder style={styles.card}>
                <Text>Loading</Text>
            </ShimmerPlaceholder>
        } else {

        }
    }

    return (
        <Item />
    )
}

export default Shimmer

const styles = StyleSheet.create({
    card: {
        height: RFValue(162),
        width: RFValue(212),
        borderRadius: RFValue(12),
        marginLeft: RFValue(14),
        marginTop: RFValue(12)
    }
})