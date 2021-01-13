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
            <Text>Name:   {res.name}</Text>
            <Text>Nasa jpl url:   {res.nasa_jpl_url}</Text>
            <Text>Is potentially hazardous asteroid:  {JSON.stringify(res.is_potentially_hazardous_asteroid)}</Text>
        </View>
    );

    
}

export default DetailScreen;