import React,{ Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, ScrollView, TouchableOpacity, ActivityIndicator  } from "react-native";

import NasaApi from "../Api/NasaApi";

class HomeScreen extends Component{

    constructor(props){
        super(props);

        this.state={
            AsteroidId:'',
            AsteroidDataArray:[],
            isLoading:false,
            err:'',
            AsteroidData:'',
            invalid: false
        }
    }

    onSerchAsteroidData = async (AsId) => {
        
        this.setState({ isLoading: true });

        await NasaApi.get(`neo/rest/v1/neo/${AsId}?api_key=hWpTAGb7O2QUcHjqwCMEalvOqiDknL3tsAwxVgba`).then( response =>{
            
            //console.log('response -------------', response.data);

            this.setState({ AsteroidData: response.data, isLoading: false, AsteroidDataArray: [] });

            this.props.navigation.navigate('Detail', { AID: response.data.id });
         

        }).catch(e=>{
            //console.log('response -------------', e);

            this.setState({ err: e, invalid: true, isLoading: false, AsteroidDataArray: [] });
          
        })

    }

    onRandomAsteroid = async () =>{
        
        this.setState({ invalid: false, isLoading: true })
       // console.log('Called');
        await NasaApi.get(`neo/rest/v1/neo/browse?api_key=DEMO_KEY`).then(response=>{

            //console.log('Random Asteroid Data ', response.data.near_earth_objects);

            this.setState({
                AsteroidDataArray: response.data.near_earth_objects,
                isLoading:false
            })


        }).catch( e => {
            //console.log('Error', e);
            this.setState({ err: e, isLoading:false });
        })

    }


    onRenderButton(){
        if(this.state.AsteroidId.length > 0 ){
            return(
         
                <TouchableOpacity
                    disabled={false}
                    style={{ backgroundColor:'purple', padding: 10, }}
                    onPress={()=> this.onSerchAsteroidData(this.state.AsteroidId)}
                >
                    <Text style= {{ color: 'white', alignSelf:'center' }}>Search Asteroid</Text>
                </TouchableOpacity>
            
            )
        }
        return(

            <TouchableOpacity
                    disabled={true}
                    style={{ backgroundColor:'grey', padding: 10, }}
                    onPress={()=> this.onSerchAsteroidData(this.state.AsteroidId)}
                >
                    <Text style= {{ color: 'white', alignSelf:'center' }}>Search Asteroid</Text>
                </TouchableOpacity>
           
               
            
        )
    }

    onRandFlatList(){
        if(this.state.isLoading){
            return <ActivityIndicator size="large" color="#3a7dcf" />
        }
        return(
            <FlatList
            data={this.state.AsteroidDataArray}
            keyExtractor= { ( item, index ) => index.toString() }
            renderItem={ ({ item }) =>{
                return(
                    <View>
                        <TouchableOpacity 
                        onPress={ ()=> this.props.navigation.navigate( 'Detail',{ AID: item.id } ) }
                            style={{
                                marginHorizontal: 10,
                                borderWidth: 1,
                                borderColor:'grey', 
                                padding: 5,
                                margin: 5
                            }}>

                            <Text style={{ fontSize: 18, alignSelf:'center' }}>{item.id}</Text>
                        </TouchableOpacity>
                        
                    </View>
                );
            } }
        />
        )
    }


    render(){
        return(
            <View style={{ flex: 1}}>

                <View style={{ backgroundColor:'white', padding: 10 }}>
                    <TextInput 
                        style={{ borderWidth:1, borderColor:'black', marginTop:10, padding: 10 }}
                        placeholder='Enter Asteroid Id'
                        value={this.state.AsteroidId}
                        onChangeText={(text)=> this.setState({ AsteroidId: text })}
                    />
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 10, padding:5 }}>
                    {this.onRenderButton()}
                </View>
                
            
                <View style={{ marginTop: 10, marginHorizontal: 10, padding:5 }}>
                    <TouchableOpacity
                        onPress={this.onRandomAsteroid}
                        style={{ backgroundColor:'purple', padding: 10, }}
                    >
                        <Text style= {{ color: 'white', alignSelf:'center' }}>Random Asteroid</Text>
                    </TouchableOpacity>
                </View>
                {this.state.invalid ? <Text style={{ alignSelf:'center', color:'red', fontWeight: 'bold' }}>Asteroid Not Found</Text> : null}
                <View>
                   {this.onRandFlatList()}
                </View>

        </View>
            
        );
    }
}



export default HomeScreen;