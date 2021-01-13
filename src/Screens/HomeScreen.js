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
            AsteroidData:''
        }
    }

    onSerchAsteroidData = async (AsId) => {
        
        await NasaApi.get(`neo/rest/v1/neo/${AsId}?api_key=hWpTAGb7O2QUcHjqwCMEalvOqiDknL3tsAwxVgba`).then( response =>{
            
            //console.log('response -------------', response.data);

            this.setState({ AsteroidData: response.data });

            this.props.navigation.navigate('Detail', { AID: response.data.id });
         

        }).catch(e=>{
            //console.log('response -------------', e);

            this.setState({ err: e });
          
        })

    }

    onRandomAsteroid = async () =>{
       // console.log('Called');
        await NasaApi.get(`neo/rest/v1/neo/browse?api_key=DEMO_KEY`).then(response=>{

            //console.log('Random Asteroid Data ', response.data.near_earth_objects);

            this.setState({
                AsteroidDataArray: response.data.near_earth_objects
            })


        }).catch( e => {
            //console.log('Error', e);
            this.setState({ err: e });
        })

    }


    onRenderButton(){
        if(this.state.AsteroidId.length > 0 ){
            return(
         
                <TouchableOpacity
                    style={{ backgroundColor:'#ff1717', padding: 10, }}
                    onPress={()=> this.onSerchAsteroidData(this.state.AsteroidId)}
                >
                    <Text style= {{ color: 'white', alignSelf:'center' }}>Search Asteroid</Text>
                </TouchableOpacity>
            
            )
        }
        return(

            <TouchableOpacity
                    style={{ backgroundColor:'grey', padding: 10, }}
                    onPress={()=> this.onSerchAsteroidData(this.state.AsteroidId)}
                >
                    <Text style= {{ color: 'white', alignSelf:'center' }}>Search Asteroid</Text>
                </TouchableOpacity>
           
               
            
        )
    }


    render(){
        return(
            <View style={{ flex: 1}}>

                <View style={{ backgroundColor:'white', padding: 10 }}>
                    <TextInput 
                        style={{ borderWidth:1, borderColor:'black', marginTop:10 }}
                        placeholder='Enter Asteroid Id'
                        value={this.state.AsteroidId}
                        onChangeText={(text)=> this.setState({ AsteroidId: text })}
                    />
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 10, padding:5 }}>
                    {this.onRenderButton()}
                </View>
                

                <View style={{ marginTop: 10, marginHorizontal: 10, padding:5 }}>
                    <Button
                        onPress={this.onRandomAsteroid}
                        title='Random Asteroid'
                    />
                </View>

                <View>
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
                </View>

        </View>
            
        );
    }
}



export default HomeScreen;