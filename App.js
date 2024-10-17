import { Text, View, FlatList, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useState } from 'react'

export default function App() {

  const [ data, setData ] = useState([])

  const getData = async () => {
    const url = "https://reqres.in/api/users?page=1";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    setData(json['data'])
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
  }

  const Item = ({item}) => (
    <View className='flex-row items-center'>
      <Image
        className='m-[15px] w-[50px] h-[50px]'
        source={{ uri: item.avatar}}
      />
      <View>
        <Text className='text-white '>{item.first_name} {item.last_name}</Text>
        <Text className='text-white '>{item.email}</Text>
      </View>
    </View>
  )

  useEffect(() => {
    getData()
  }, [])

  return (
    <SafeAreaView className='pt-[30px] bg-slate-800 w-full h-full'>
      <FlatList
        data={data}
        renderItem={({item}) => <Item item={item} />}
      />
    </SafeAreaView>
  );
}
