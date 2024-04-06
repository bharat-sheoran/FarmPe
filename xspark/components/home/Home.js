import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, SafeAreaView, TextInput, Button } from 'react-native';
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
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }}>
        <View >
          <View style={styles.upper}>
            <TouchableOpacity style={styles.purchase}><Text>Purchase</Text></TouchableOpacity>
            <TouchableOpacity style={styles.sell}><Text>Sell</Text></TouchableOpacity>
          </View>
          <View style={styles.middle}>
            <TouchableOpacity style={styles.received}><Text style={{ fontWeight: '600', padding: 15 }}>Received</Text></TouchableOpacity>
            <TouchableOpacity style={styles.pending}><Text style={{ fontWeight: '600', padding: 15 }}>Pending</Text></TouchableOpacity>
            <TouchableOpacity style={styles.total}><Text style={{ fontWeight: '600', padding: 15 }}>Total</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.lower}><Text style={{ color: 'white', fontWeight: '600' }}>View Ledger</Text></TouchableOpacity>

        </View>
      </ScrollView>

      <ScrollView style={{
        marginBottom: 50
      }}>
        <View style={styles.outerCard}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.left}></View>
            <View style={styles.right}></View>
          </View>
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
  },
  upper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
  },
  middle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    marginTop: 10
  },
  lower: {
    backgroundColor: '#1B1B78',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10
  },
  received: {
    width: '30%',
    backgroundColor: 'rgba(237, 168, 118, 0.52)',
    borderRadius: 10
  },
  pending: {
    width: '30%',
    backgroundColor: '#F1CBCB',
    borderRadius: 10
  },
  total: {
    width: '30%',
    backgroundColor: '#BAE8C7',
    borderRadius: 10
  },
  purchase: {
    width: '40%',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 15
  },
  sell: {
    width: '40%',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 15
  },
  left: {
    borderWidth: 0.5,
    width: '45%',
    height: 132,
    borderRadius: 15
  },
  right: {
    borderWidth: 0.5,
    width: '45%',
    height: 132,
    borderRadius: 15
  },
});