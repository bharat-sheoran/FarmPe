import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, SafeAreaView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ReqIP } from '@env';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from './Categories';
import SortCategories from './sortCategories';
import { deletePost } from "../../features/post/postSlice";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post);
  const [search, setSearch] = useState("");

  const [searchData, setSearchData] = useState([]);

  const handleSearch = async (value) => {
    setSearch(value);
    try {
      if (search.length > 3) {
        let res = await axios.get(`http://${ReqIP}:8080/home/search/${value}`);
        console.log(res.data.searchedData);
        setSearchData(res.data.searchedData);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const card = (p, id, src) => {
    return (
      <TouchableWithoutFeedback key={id} onPress={() => navigation.navigate('ShowPost', { data: p, image: src })}>
        <View key={id} style={styles.card}>
          {/* <Text style={styles.title}>{p.owner.name}</Text> */}
          <Image source={{ uri: src }} style={styles.image} />
          <Text style={styles.title}>{p.title}</Text>
          <Text style={styles.description}>{p.description}</Text>
          <Text style={styles.countryLocation}>{p.country}, {p.location}</Text>
          <View style={styles.buttonContainer}>
            <Text style={styles.price}>Rs. {p.price}</Text>
            <Text style={styles.price}>Required Amount: {p.amountRequired}Kg</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10}}>
        <View style={{ margin: 5, marginBottom: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#e5e5e5', borderRadius: 20, padding: 10, paddingLeft: 20 }}>
            <MagnifyingGlassIcon size={20} strokeWidth={3} color={'grey'} />
            <TextInput
              placeholder='Search Order'
              placeholderTextColor={'grey'}
              style={{ flex: 1, fontSize: 16, marginLeft: 10 }}
              onChangeText={(text) => handleSearch(text)}
              value={search}
            />
          </View>
        </View>

        {/* Category datas*/}

        {/* <View className="mb-4">
            <Categories/>
        </View> */}

        <View className="mb-4">
          <SortCategories />
        </View>
      </ScrollView>

      <ScrollView style={{
        marginBottom: 50
      }}>
        <View style={styles.outerCard}>
          {search.length > 3 ? searchData.map((p) => card(p, p._id, p.image.url)) : post.map((p) => card(p, p.id, p.image))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerCard: {
    marginHorizontal: 16,
    marginTop: 16
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.30,
    shadowRadius: 3.84,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: '400'
  },
  countryLocation: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  deleteButtonText: {
    color: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  }
});
