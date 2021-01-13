import React,{ useEffect, useState } from 'react';
import { StyleSheet, View, Text } from "react-native";

import NasaApi from "../Api/NasaApi";

const  DetailScreen = ({ route }) => {

    const [res, setRes] = useState('');

    const [err, setErr] = useState('');

    const AsteroidId = route.params.AID;

    useEffect(()=>{
        asteroidData();
    },[])

    const asteroidData = async () => {
        
        await NasaApi.get(`neo/rest/v1/neo/${AsteroidId}?api_key=hWpTAGb7O2QUcHjqwCMEalvOqiDknL3tsAwxVgba`).then( response =>{
            
            //console.log('response -------------', response.data);

            setRes(response.data)

        }).catch(e=>{
            //console.log('response -------------', e);
            setErr(e);
        })
    }
    
    return(
        <View style={{ backgroundColor:'white', borderWidth:1, padding: 10, margin: 5 }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold'}} >Name: </Text>
                <Text>{res.name}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold'}} >Nasa jpl url: </Text>
            <Text>{res.nasa_jpl_url}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold'}} >Is potentially hazardous asteroid: </Text>
            <Text>{JSON.stringify(res.is_potentially_hazardous_asteroid)}</Text>
            </View>
            
          
        </View>
    );

    
}

export default DetailScreen;