import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MMKVStorage from 'react-native-mmkv-storage'
import { RFValue } from 'react-native-responsive-fontsize'
import { colors, fonts } from '../../utils'

const Splash = ({ navigation }) => {
  const storage = new MMKVStorage.Loader().initialize();
  const email = storage.getString('email');

  useEffect(() => {
    setTimeout(() => {
      if (email) {
        navigation.replace('Home')
      } else {
        navigation.replace('Sign')
      }
    }, 3000);
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>MovieApp</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: RFValue(24),
    color: colors.white,
    fontFamily: fonts.primary[600]
  }
})