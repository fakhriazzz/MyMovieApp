import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const Shimmer = ({ height, width, radius, marginLeft, marginRight, marginTop, marginBottom }) => {
    return (
        <ShimmerPlaceholder style={
            {
                height: height,
                width: width,
                borderRadius: radius,
                marginLeft: marginLeft,
                marginRight: marginRight,
                marginTop: marginTop,
                marginBottom: marginBottom
            }} />
    )
}

export default Shimmer