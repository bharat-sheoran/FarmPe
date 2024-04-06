import { Button } from "react-native"
import { Text, View } from "react-native-animatable"
import Order from "../components/order/Order"

export default function OrderScreen({route, navigation}){
    return(
        <Order route={route} navigation={navigation}/>
    )
}