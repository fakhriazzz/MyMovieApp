import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MMKVStorage from 'react-native-mmkv-storage'
import { RFValue } from 'react-native-responsive-fontsize'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import Api from '../../Api'
import { IconLogout } from '../../assets'
import { CardList, CardNowPlaying, Gap } from '../../components'
import { colors, fonts } from '../../utils'

const Home = ({ navigation }) => {
    const storage = new MMKVStorage.Loader().initialize();
    const email = storage.getString('email');
    const globalState = useSelector((state) => state)
    const [user, setUser] = useState([])

    const getNowPlaying = async () => {
        const response = await Api.nowplaying(globalState.token)
        return response.data.results;
    }

    const getPopular = async () => {
        const response = await Api.popular(globalState.token)
        return response.data.results;
    }

    const getTopRated = async () => {
        const response = await Api.toprated(globalState.token)
        return response.data.results;
    }

    const getUpcoming = async () => {
        const response = await Api.upcoming(globalState.token)
        return response.data.results;
    }

    const {
        data,
        error,
        isLoading,
    } = useQuery("nowPlay", getNowPlaying);

    const {
        data: dataPopular,
        error: errorPupolar,
        isLoading: isLoadingPopular,
    } = useQuery("popular", getPopular);

    const {
        data: dataTopRated,
        error: errorTopRated,
        isLoading: isLoadingTopRated,
    } = useQuery("toprated", getTopRated);

    const {
        data: dataUpcoming,
        error: errorUpcoming,
        isLoading: isLoadingUpcoming,
    } = useQuery("upcoming", getUpcoming);

    const getUser = () => {
        database()
            .ref(`users/${email}`)
            .on('value', res => {
                const data = res.val();
                if (data != null) {
                    let user = [];
                    Object.keys(data).map(key => {
                        user.push({
                            id: key,
                            user: data[key],
                        })
                    })
                    setUser(user[0].user)
                }
            })
    }

    const logout = () => {
        try {
            auth()
                .signOut()
                .then(() => {
                    navigation.replace('Sign')
                    storage.clearStore()
                    Alert.alert('Logout success');
                });
        } catch (error) {
            Alert.alert('Logout error');
        }
    }

    const ItemNowPlay = ({ item }) => (
        <CardNowPlaying title={item.title} rating={item.vote_average} imageUri={item.poster_path} onPress={() => navigation.navigate('DetailMovie', item)} />
    );

    const ItemPopular = ({ item }) => (
        <CardList title={item.title} rating={item.vote_average} imageUri={item.poster_path} onPress={() => navigation.navigate('DetailMovie', item)} />
    );

    const ItemTopRated = ({ item }) => (
        <CardList title={item.title} rating={item.vote_average} imageUri={item.poster_path} onPress={() => navigation.navigate('DetailMovie', item)} />
    );

    const ItemUpcoming = ({ item }) => (
        <CardList title={item.title} rating={item.vote_average} imageUri={item.poster_path} onPress={() => navigation.navigate('DetailMovie', item)} />
    );

    const gotoSeeMore = (type) => {
        if (type == 'nowplaying') {
            const data = {
                label: 'Now Playing',
                dataMovie: nowplay,
            }
            navigation.navigate('MoreMovie', data)
        } else if (type == 'popular') {
            const data = {
                label: 'Popular',
                dataMovie: popular,
            }
            navigation.navigate('MoreMovie', data)
        } else if (type == 'toprated') {
            const data = {
                label: 'Top Rated',
                dataMovie: toprated,
            }
            navigation.navigate('MoreMovie', data)
        } else {
            const data = {
                label: 'Upcoming',
                dataMovie: upcoming,
            }
            navigation.navigate('MoreMovie', data)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.contentTop}>
                <View>
                    <Text style={styles.text}>Welcome, {user?.name}</Text>
                    <Gap height={RFValue(2)} />
                    <Text style={styles.text2}>Find your favorite movie</Text>
                </View>
                <TouchableOpacity onPress={logout}>
                    <IconLogout />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnSeacrh} onPress={() => navigation.navigate('Search')}>
                <Text style={styles.text2}>Search movie</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <ScrollView>
                    {
                        isLoading ?
                            <View>
                                <Text>Loading</Text>
                            </View> :
                            <View>
                                <Gap height={RFValue(12)} />
                                <View style={styles.flexrow}>
                                    <Text style={styles.text3}>Now Playing</Text>
                                    <TouchableOpacity onPress={() => gotoSeeMore('nowplaying')}>
                                        <Text style={styles.text2}>See More</Text>
                                    </TouchableOpacity>
                                </View>
                                <Gap height={RFValue(12)} />
                                <FlatList
                                    data={data?.slice(0, 5)}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => <ItemNowPlay item={item} />}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                    }
                    <Gap height={RFValue(24)} />
                    {
                        isLoadingPopular ?
                            <View>
                                <Text>Loading</Text>
                            </View> :
                            <View>
                                <View style={styles.flexrow}>
                                    <Text style={styles.text3}>Popular</Text>
                                    <TouchableOpacity onPress={() => gotoSeeMore('popular')}>
                                        <Text style={styles.text2}>See More</Text>
                                    </TouchableOpacity>
                                </View>
                                <Gap height={RFValue(12)} />
                                <FlatList
                                    data={dataPopular?.slice(0, 5)}
                                    showsVerticalScrollIndicator={false}
                                    initialNumToRender={2}
                                    renderItem={({ item }) => <ItemPopular item={item} />}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                    }
                    <Gap height={RFValue(24)} />
                    {
                        isLoadingTopRated ?
                            <View>
                                <Text>Loading</Text>
                            </View> :
                            <View>
                                <View style={styles.flexrow}>
                                    <Text style={styles.text3}>Top Rated</Text>
                                    <TouchableOpacity onPress={() => gotoSeeMore('toprated')}>
                                        <Text style={styles.text2}>See More</Text>
                                    </TouchableOpacity>
                                </View>
                                <Gap height={RFValue(12)} />
                                <FlatList
                                    data={dataTopRated?.slice(0, 5)}
                                    showsVerticalScrollIndicator={false}
                                    initialNumToRender={2}
                                    renderItem={({ item }) => <ItemTopRated item={item} />}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                    }
                    <Gap height={RFValue(24)} />
                    {
                        isLoadingUpcoming ?
                            <View>
                                <Text>Loading</Text>
                            </View> :
                            <View>
                                <View style={styles.flexrow}>
                                    <Text style={styles.text3}>Upcoming</Text>
                                    <TouchableOpacity onPress={() => gotoSeeMore('upcoming')}>
                                        <Text style={styles.text2}>See More</Text>
                                    </TouchableOpacity>
                                </View>
                                <Gap height={RFValue(12)} />
                                <FlatList
                                    data={dataUpcoming?.slice(0, 5)}
                                    showsVerticalScrollIndicator={false}
                                    initialNumToRender={2}
                                    renderItem={({ item }) => <ItemUpcoming item={item} />}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
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
    text3: {
        fontSize: RFValue(16),
        color: colors.black,
        fontFamily: fonts.primary[600]
    },
    contentTop: {
        padding: RFValue(24),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flexrow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: RFValue(24)
    },
    btnSeacrh: {
        backgroundColor: colors.grey,
        padding: RFValue(12),
        marginHorizontal: RFValue(24),
        borderRadius: RFValue(18)
    }
})