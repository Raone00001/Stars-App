import React,{ Component } from "react";
import { StyleSheet, Text, View, FlatList, Alert, Button} from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from "axios";

export default class Home extends Component{

    constructor(){
        super(this.props);
        this.state={
            listData:[],
            url:"http://localhost:5000/"
        };
    }

    componentDidMount(){
        this.getStars()
    }

    getStars = () =>{
        const {url} = this.state    // Passing the url here as a const
        axios.get(url).then(response => {
            return this.setState({listData: response.data.data})   // request to the url then return the information
        }).catch(error => {
            Alert.alert(error.message);
        });    // if can't get info, catch the error      
    };


    renderItem = ({ item, index }) => (
        <ListItem 
            key={index}
            title={'Star: ${item.name}'}
            subtitle={'Distance From Earth: ${item.distance_from_earth}'}
            titleStyle={styles.title}
            conatinerStyle={styles.listContainer}
            bottomDivider
            chevron
            onPress={()=>
                this.props.navigation.navigate("Details", {star_name: item.name})  // Navigate based on the star name and put details
            }
        />
    );

    keyExtractor = (item,index) => index.toString(); 

    render(){

        const {listData} = this.state
        if(listData.length === 0){
            return(
                <View style={styles.emptyContainer}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
              <SafeAreaView />
              <View style={styles.upperContainer}>
                <Text style={styles.headerText}>Stars World</Text>
              </View>
              <View style={styles.lowerContainer}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.state.listData}
                  renderItem={this.renderItem}
                />
              </View>
            </View>
          );
        }
      }
      
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#edc988"
        },
        upperContainer: {
          flex: 0.1,
          justifyContent: "center",
          alignItems: "center"
        },
        headerText: {
          fontSize: 30,
          fontWeight: "bold",
          color: "#132743"
        },
        lowerContainer: {
          flex: 0.9
        },
        emptyContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        },
        emptyContainerText: {
          fontSize: 20
        },
        title: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#d7385e"
        },
        listContainer: {
          backgroundColor: "#eeecda"
        }
      });