import React, { useState } from 'react'
import { FlatList, StyleSheet, TextInput, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useSelector } from 'react-redux'
import Api from '../../Api'
import { CardList, Gap, HeaderBack, Loading } from '../../components'
import { colors } from '../../utils'

const Search = ({ navigation }) => {
    const globalState = useSelector((state) => state)

    const [title, settitle] = useState('')
    const [result, setresult] = useState([])
    const [loading, setloading] = useState(false)

    const getMovie = async () => {
        try {
            setloading(true)
            const response = await Api.search(globalState.token, title);
            setresult(response.data.results)
            setloading(false)
        } catch (error) {
            setloading(false)
        }
    }

    const Item = ({ item }) => (
        <CardList title={item.title} rating={item.vote_average} imageUri={item.poster_path} onPress={() => navigation.navigate('DetailMovie', item)} />
    );

    return (
        <>
            <View style={styles.container}>
                <HeaderBack label='Search' onPress={() => navigation.goBack()} />
                <TextInput style={styles.input} placeholder="Search movie" placeholderTextColor={colors.black} onSubmitEditing={getMovie} value={title} onChangeText={(value) => settitle(value)} />
                <Gap height={RFValue(12)} />
                <View style={styles.container}>
                    <FlatList
                        data={result}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
            {
                loading && <Loading />
            }
        </>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    input: {
        backgroundColor: colors.grey,
        borderRadius: RFValue(18),
        padding: RFValue(8),
        paddingHorizontal: RFValue(12),
        marginHorizontal: RFValue(24),
        color: colors.black
    }
})