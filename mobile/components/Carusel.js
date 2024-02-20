import React, { Component } from 'react';
import { ImageBackground, SafeAreaView, View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  carouselContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemContainer: {
    backgroundColor: 'white',
    marginLeft: 25,
  },
  image: {
    height: 100,
    width: '100%',
  },
});

export class Carusel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: 'Item 1',
          text: 'Text 1',
          img: 'https://dptf.onrender.com/static/media/homebg2.7993a07534d7c4eeaebb.jpg',
        },
        {
          title: 'Item 2',
          text: 'Text 2',
          img: 'https://dptf.onrender.com/static/media/homebgimage.64834583a4ec108b96a2.jpg',
        },
        {
          title: 'Item 3',
          text: 'Text 3',
          img: 'https://images.twarak.com/images/202309/ad-1693810374-61.jpeg',
        },
      ],
    };
  }

  _renderItem({ item, index }) {
    return (
      <View style={styles.itemContainer}>
        <ImageBackground source={{ uri: item.img }} style={styles.image} />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.carouselContainer}>
          <Carousel
            layout={'default'}
            ref={(ref) => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={300}
            itemWidth={300}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
            autoplay={true}
            autoplayInterval={2000}
            loop={true}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Carusel;
