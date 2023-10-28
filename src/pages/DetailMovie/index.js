import React, { useEffect, useState } from 'react'
import { Image, Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useSelector } from 'react-redux'
import Api from '../../Api'
import { IconStar } from '../../assets'
import { Button, CardCast, CardGenre, CardReview, Gap, HeaderBack } from '../../components'
import { colors, fonts } from '../../utils'

const DetailMovie = ({ navigation, route }) => {
  const { id } = route.params;
  const globalState = useSelector((state) => state)

  const [detailmovie, setdetailmovie] = useState([])
  const [review, setreview] = useState([])
  const [credit, setcredit] = useState([])

  const getDetailMovie = async () => {
    try {
      const response = await Api.detailmovie(globalState.token, id)
      setdetailmovie(response.data)
    } catch (error) {

    }
  }

  const getReview = async () => {
    try {
      const response = await Api.review(globalState.token, id)
      setreview(response.data.results)
    } catch (error) {

    }
  }

  const getCast = async () => {
    try {
      const response = await Api.credits(globalState.token, id)
      setcredit(response.data.cast)
    } catch (error) {

    }
  }

  const watchmovie = () => {
    Linking.openURL(detailmovie.homepage)
  }

  useEffect(() => {
    getDetailMovie()
    getReview()
    getCast()
  }, [])

  return (
    <View style={styles.container}>
      <HeaderBack label='Detail Movie' onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <ScrollView>
          <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w500/${detailmovie.poster_path}` }} />
          <View style={{ padding: RFValue(24), flex: 1 }}>
            <View style={[styles.flexrow, { justifyContent: 'space-between' }]}>
              <Text style={[styles.text, { maxWidth: RFValue(260) }]}>{detailmovie.title}</Text>
              <View style={styles.flexrow}>
                <IconStar />
                <Gap width={RFValue(4)} />
                <Text style={styles.text}>{Math.round(detailmovie.vote_average * 10) / 10}</Text>
              </View>
            </View>
            <Gap height={RFValue(8)} />
            <View style={{ flexDirection: 'row', marginRight: RFValue(-24) }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {
                  detailmovie.genres?.map(data => {
                    return <CardGenre key={data.id} label={data.name} />
                  })
                }
              </ScrollView>
            </View>
            <Gap height={RFValue(8)} />
            <Text style={styles.text2}>{detailmovie.overview}</Text>
            <Gap height={RFValue(24)} />
            <Text style={styles.text}>Top Cast</Text>
            <Gap height={RFValue(8)} />
            <View style={{ flexDirection: 'row', marginRight: RFValue(-24) }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {
                  credit.map(data => {
                    return <CardCast key={data.id} imageUri={data.profile_path} original_name={data.original_name} character={data.character} />
                  })
                }
              </ScrollView>
            </View>
            <Gap height={RFValue(24)} />
            <Text style={styles.text}>Review</Text>
            <Gap height={RFValue(8)} />
            {
              review.map(data => {
                return <CardReview key={data.id} imageUri={data.author_details?.avatar_path} rating={data.author_details?.rating} review={data.content} name={data.author} />
              })
            }
          </View>
        </ScrollView>
        <Button text='Watch Movie' margin={RFValue(24)} onPress={watchmovie} />
      </View>
    </View>
  )
}

export default DetailMovie

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  image: {
    height: RFValue(264)
  },
  flexrow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: RFValue(14),
    color: colors.black,
    fontFamily: fonts.primary[600]
  },
  text2: {
    fontSize: RFValue(12),
    color: colors.black,
    fontFamily: fonts.primary[400],
    lineHeight: RFValue(18)
  },
})