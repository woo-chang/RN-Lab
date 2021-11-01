import React, {useState} from 'react'
import { View, Text, StyleSheet, Dimensions, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Gallery from 'react-native-image-gallery';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window'); 

const ImageScreen = () => {

    const [images, setImages] = useState([
        {id: '1', image: 'https://t1.daumcdn.net/cfile/tistory/99AB35405AC76C0101'},
        {id: '2', image: 'https://img.lovepik.com/photo/50051/4310.jpg_wh860.jpg'},
        {id: '3', image: 'https://t1.daumcdn.net/cfile/tistory/99AB35405AC76C0101'},
        {id: '4', image: 'https://img.lovepik.com/photo/50051/4310.jpg_wh860.jpg'},
        {id: '5', image: 'https://t1.daumcdn.net/cfile/tistory/99AB35405AC76C0101'},
        {id: '6', image: 'https://img.lovepik.com/photo/50051/4310.jpg_wh860.jpg'},
    ])

    return (
        <SafeAreaView style={styles.container}>
            {/* <Gallery
                style={styles.gallery}
                images={[
                    { source: { uri: 'https://t1.daumcdn.net/cfile/tistory/99AB35405AC76C0101' }},
                    { source: { uri: 'https://img.lovepik.com/photo/50051/4310.jpg_wh860.jpg' }},
                    { source: { uri: 'https://t1.daumcdn.net/cfile/tistory/99AB35405AC76C0101' }},
                    { source: { uri: 'https://img.lovepik.com/photo/50051/4310.jpg_wh860.jpg' }},
                    { source: { uri: 'https://t1.daumcdn.net/cfile/tistory/99AB35405AC76C0101' }},
                    { source: { uri: 'https://img.lovepik.com/photo/50051/4310.jpg_wh860.jpg' }},
                    { source: { uri: 'https://t1.daumcdn.net/cfile/tistory/99AB35405AC76C0101' }},
                    { source: { uri: 'https://img.lovepik.com/photo/50051/4310.jpg_wh860.jpg' }},
                    { source: { uri: 'https://t1.daumcdn.net/cfile/tistory/99AB35405AC76C0101' }},
                    { source: { uri: 'https://img.lovepik.com/photo/50051/4310.jpg_wh860.jpg' }},
                ]}
            />  뭔가 단순 이미지 관리는 좋은 거 같지만 이미지 커스텀이 별로임*/}
            <View style={styles.header}>
                <Ionicons name="close" size={25} color="black"/>
            </View>
            <Carousel 
                layout='default'
                data={images}
                sliderWidth={width} // 캐 러셀 컨테이너 너비를 픽셀 단위로 정의
                itemWidth={width} // 캐 러셀 내부에서 렌더링되는 각 항목의 너비를 픽셀 단위로 정의
                renderItem={({item, index}) => (
                    <Image 
                        key={index}
                        style={styles.image}
                        resizeMode='contain'
                        source={{uri: item.image}}
                    />
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    gallery: {
        flex: 1,
        backgroundColor: 'black'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    header: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10
    }
})

export default ImageScreen;