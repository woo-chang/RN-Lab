import React, {useState} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import DropDownPicker from 'react-native-dropdown-picker'

import MyItem from './MyItem';

const HomeScreen = () => {
  const [myArray, setMyArray] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "55000" },
    { label: "Banana", value: "33000" },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open} // picker가 열리는지
        value={value} // 값을 선택
        items={items} // 보여주는 아이템
        //maxHeight={100} // 크기를 정해서 스크롤 할 수 있게 함
        setOpen={setOpen} // picker 눌렀을 때 callback 함수
        setValue={setValue} // 값이 변화했을 때 callback 함수
        setItems={setItems} // 아이템이 변경되거나 추가되었을 때 callback 함수
        placeholder="선택"
        placeholderStyle={{fontSize: 16, marginLeft: 5}}
        disableBorderRadius={false} // 클릭했을 때 전체 border가 변경되지 않음
        style={{borderWidth: 0}} // 외부 컨테이너 안의 내부 컨테이너 버튼 스타일
        containerStyle={{width: '92%', borderColor: 'blue', borderWidth: 1, borderRadius: 5}} // 외부 컨테이너 스타일
        labelStyle={{}}
        textStyle={{}}
        dropDownContainerStyle={{marginBottom: 10, borderColor: 'blue', borderWidth: 1, overflow: 'hidden'}}
        listItemContainerStyle={{borderBottomColor: '#AAAAAA', borderBottomWidth: 0.3, height: 80}}
        dropDownDirection="TOP" // 아이템이 위로 보여질 수 있게 하는 속성
        ArrowUpIconComponent={() => <Ionicons name="caret-down-sharp" size={20} color='#B993D6'/>}
        ArrowDownIconComponent={() => <Ionicons name="caret-down-sharp" size={20} color="#B993D6"/>}
        showTickIcon={false} // 선택한거 아이콘 숨기기
        selectedItemContainerStyle={{
          backgroundColor: "#B993D6"
        }}
        renderListItem={(props) => <MyItem {...props}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  }
});

export default HomeScreen;