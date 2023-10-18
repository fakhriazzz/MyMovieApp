import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { CardList, HeaderBack } from '../../components'
import { colors } from '../../utils'

const MoreMovie = ({ navigation, route }) => {
    const { label, dataMovie } = route.params;

    const ItemNowPlay = ({ item }) => (
        <CardList title={item.title} rating={item.vote_average} imageUri={item.poster_path} onPress={() => navigation.navigate('DetailMovie', item)}/>
    );

    return (
        <View style={styles.container}>
            <HeaderBack label={label} onPress={() => navigation.goBack()} />
            <View style={styles.container}>
                <FlatList
                    data={dataMovie}
                    renderItem={({ item }) => <ItemNowPlay item={item} />}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

export default MoreMovie

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
})