import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';

export default function Loding() {
    const waveAnimation = {
        0: { translateY: 0 },
        0.5: { translateY: 10 },
        1: { translateY: 0 },
      };
  return (
    <View>
        <Animatable.View animation={waveAnimation} iterationCount="infinite" style={{margin:10}}>
          <Text>Loading...</Text>
        </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({})