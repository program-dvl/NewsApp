/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View,Dimensions,ActivityIndicator,Image,Linking,YellowBox } from 'react-native';
import { ThemeProvider, Button,Header,Card,Divider } from 'react-native-elements';
//import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import AnalogClock from './AnalogClock';
import MyWebComponent from './Flag';
import Countries from './countries';
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation'
import Swiper from 'react-native-deck-swiper'
import TouchableScale from 'react-native-touchable-scale';
//import {createStackNavigator, createAppContainer} from 'react-navigation';
//import LinearGradient from 'react-native-linear-gradient'; 

import Flag from 'react-native-flags';
var { height } = Dimensions.get('window');
var box_count = 3;
var box_height = height / box_count;
import { Html  } from '@shoutem/ui';
import { DropDownMenu } from "@shoutem/ui/components/DropDownMenu";
import { Spinner } from "@shoutem/ui/components/Spinner";
import { Text } from "@shoutem/ui/components/Text";


type Props = {};
YellowBox.ignoreWarnings(["Require cycle:", "Remote debugger","ListView"]);
export default class App extends Component<Props> {
  tabs = [
    {
      key: 'sports',
      icon: 'home',
      label: 'Sports',
      barColor: 'black',
      pressColor: 'white'
    },
    {
      key: 'science',
      icon: 'home',
      label: 'Science',
      barColor: 'black',
      pressColor: 'white'
    },
    {
      key: 'entertainment',
      icon: 'home',
      label: 'Entertainment',
      barColor: 'black',
      pressColor: 'white'
    }
  ]
  constructor (props) {
    super(props)
    this.state = {
      loading:true,
      cards: ['1', '2', '3'],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
      backColor:'white',
      articles:[],
      showFilter:false,
      categories:[{"key":"business","value":"Business"},{"key":"entertainment","value":"Entertainment"},{"key":"general","value":"General"},{"key":"health","value":"Health"},{"key":"science","value":"Science"},{"key":"sports","value":"Sports"},{"key":"technology","value":"Technology"}],
      filters: [{"key":"IN","value":"India"},{"key":"US","value":"United States"},{"key":"RU","value":"Russia"},{"key":"JP","value":"Japan"},{"key":"CN","value":"China"},{"key":"FR","value":"France"}],
    };
    
  }
  componentWillMount() {
    //const { navigate } = this.props.navigation;
    // fetch("https://newsapi.org/v2/top-headlines?country=IN&category=business&apiKey=ec1c39995e1940958f676c687bdde62c")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       this.setState({
    //         articles: result.articles,
    //         loading:false
    //       });
    //     }
    //   )
      
      fetch("https://newsapi.org/v2/everything?domains=nytimes.com&apiKey=ec1c39995e1940958f676c687bdde62c")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            articles: result.articles,
            loading:false
          });
        }
      )
  }
 
  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} style={{marginBottom:0}} />
  )
  leftComponent = () => (
      <View style={{flex:1,flexDirection:"row",top:10}}>
        <DropDownMenu
          options={this.state.filters}
          selectedOption={this.state.selectedFilter ? this.state.selectedFilter : this.state.filters[0]}
          onOptionSelected={(filter) => this.reloadNews(filter)}
          titleProperty="value"
          valueProperty="key"
          style={{
          selectedOption: {
            // borderColor: '#ffffff',
            // borderWidth: 1,
            //  paddingTop: 4,
            //  paddingBottom: 4,
              minWidth: 50,
              marginTop: 10,
              fontSize:12,
              'shoutem.ui.Text': {
                  color: '#ffffff',
                  borderColor: '#ffffff',
                  fontSize:12,
              },
              'shoutem.ui.Icon': {
                color: '#ffffff',
              }
          }
          }}
        />
        <DropDownMenu
          options={this.state.categories}
          selectedOption={this.state.selectedCategory ? this.state.selectedCategory : this.state.categories[0]}
          onOptionSelected={(filter) => this.reloadNewsViaCategory(filter)}
          titleProperty="value"
          valueProperty="key"
          style={{
          selectedOption: {
          //   borderColor: '#ffffff',
            //  borderWidth: 1,
            //  paddingTop: 4,
            //  paddingBottom: 4,
              minWidth: 100,
              marginTop: 10,
              'shoutem.ui.Text': {
                  color: '#ffffff',
                  borderColor: '#ffffff',
                  fontSize:12,
              },
              'shoutem.ui.Icon': {
                color: '#ffffff'
              }
          }
          }}
        />
      </View>  
  )
  rightComponent = () => (
    <DropDownMenu
        options={this.state.categories}
        selectedOption={this.state.selectedCategory ? this.state.selectedCategory : this.state.categories[0]}
        onOptionSelected={(filter) => this.reloadNewsViaCategory(filter)}
        titleProperty="value"
        valueProperty="key"
        style={{
        selectedOption: {
         //   borderColor: '#ffffff',
          //  borderWidth: 1,
          //  paddingTop: 4,
          //  paddingBottom: 4,
            minWidth: 100,
            marginTop: 10,
            'shoutem.ui.Text': {
                color: '#ffffff',
                borderColor: '#ffffff',
                fontSize:12,
            },
            'shoutem.ui.Icon': {
              color: '#ffffff'
            }
        }
        }}
      />
  )
 
  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )
  // reloadFromHeader() {
  //   fetch("https://newsapi.org/v2/top-headlines?country="+this.state.selectedFilter+"&category=sports&apiKey=ec1c39995e1940958f676c687bdde62c")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         // this.setState({
  //         //   articles: result.articles
  //         // });
  //         this.state.articles = result.articles;
  //         this.render();
  //       }
  //     );
  // }
  reloadNews(filter){
    this.setState({
      selectedFilter: filter,
      loading:true
    });
    let category = (this.state.selectedCategory) ? this.state.selectedCategory : this.state.categories[0];
    fetch("https://newsapi.org/v2/top-headlines?country="+filter.key+"&category="+category.key+"&apiKey=ec1c39995e1940958f676c687bdde62c")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            articles: result.articles,
            loading:false
          });
        }
      );
  }
  reloadNewsViaCategory(category){
    this.setState({
      selectedCategory: category,
      loading:true
    });
    let filter = (this.state.selectedFilter) ? this.state.selectedFilter : this.state.filters[0];
    fetch("https://newsapi.org/v2/top-headlines?country="+filter.key+"&category="+category.key+"&apiKey=ec1c39995e1940958f676c687bdde62c")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            articles: result.articles,
            loading:false
          });
        }
      );
  }
  // renderWeb(url){

  // }
  renderWeb = (url) => {
    
   // return(
      <Html
        //body={...}
      //  onError={...}
        openUrl='https://newsapi.org/docs/endpoints/everything'
       // renderElement={...}
       // renderText={...}
       // style={...}
    />
  //  )
  }
  renderCard = (card, index) => { 
     console.log(index);
     console.log(this.state.filters);
      if(card){ 
        return (
            <View style={{backgroundColor: "white",flex:1,borderRadius:5}}>
                <View style={{flex:5}}>
                  <Image
                      index={index}
                      source={{ uri:  card.urlToImage }}
                      style={{ width: 'auto', height: 250 }}
                      PlaceholderContent={<ActivityIndicator />}
                    />
                 </View>
                <Text h1 style={{paddingTop:5,flex:1,fontWeight:'bold',paddingLeft:10,paddingRight:3,color:'#538AE4'}}>{ card.title }</Text>    
                <Text numberOfLines={4} style={{flex:2,paddingLeft:10,paddingRight:3}}>{card.content}</Text>
                <View style={{flex:1,backgroundColor:'black',justifyContent:'space-between',flexDirection:'row'}}><Text style={{color:'white',margin:15}}>Source : {card.source.name}</Text>
                <Button title=""
                  buttonStyle={{margin:17,backgroundColor:'black'}}
                  onPress={() => Linking.openURL(card.url)}
                  icon={
                    <Icon
                      name="chevron-right"
                      size={15}
                      color="white"
                    />
                  }
                /></View>
            </View>
          )
     }
  };
 
  onSwiped = (type) => {
    console.log(`on swiped ${type}`)
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };

  swipeLeft = () => {
    this.swiper.swipeLeft(true)
  };

  renderFilter() {
    if(this.state.showFilter){
      return (
        <View style={{flex:1,justifyContent:"flex-start",flexDirection:"row",backgroundColor:'black'}}>
          <DropDownMenu
            options={this.state.filters}
            selectedOption={this.state.selectedFilter ? this.state.selectedFilter : this.state.filters[0]}
            onOptionSelected={(filter) => this.reloadNews(filter)}
            titleProperty="value"
            valueProperty="key"
            style={{
            selectedOption: {
              // borderColor: '#ffffff',
              // borderWidth: 1,
              //  paddingTop: 4,
              //  paddingBottom: 4,
                minWidth: 50,
            //   marginTop: 40,
                fontSize:12,
                'shoutem.ui.Text': {
                    color: '#ffffff',
                    borderColor: '#ffffff',
                    fontSize:12,
                },
                'shoutem.ui.Icon': {
                  color: '#ffffff',
                }
            }
            }}
          />
          <DropDownMenu
            options={this.state.categories}
            selectedOption={this.state.selectedCategory ? this.state.selectedCategory : this.state.categories[0]}
            onOptionSelected={(filter) => this.reloadNewsViaCategory(filter)}
            titleProperty="value"
            valueProperty="key"
            style={{
            selectedOption: {
            //   borderColor: '#ffffff',
              //  borderWidth: 1,
              //  paddingTop: 4,
              //  paddingBottom: 4,
                minWidth: 100,
              // marginTop: 10,
                'shoutem.ui.Text': {
                    color: '#ffffff',
                    borderColor: '#ffffff',
                    fontSize:12,
                },
                'shoutem.ui.Icon': {
                  color: '#ffffff'
                }
            }
            }}
          />
        </View>  
      )
    }  
  }

  toggleFilter(){
    this.setState({ 
      showFilter: (this.state.showFilter) ? false : true
    });
  //   styles.box2.flex = 7;
 //   console.log(styles.box2)
  }

  render() {
    if(!this.state.loading){
    return (
        
          <View style={styles.container}>
            <View style={[styles.box, styles.box1]}>
                <Header
               // leftComponent={this.leftComponent()}
                leftComponent={
                  <Button title=""
                    buttonStyle={{backgroundColor:'black'}}
                    onPress={ this.toggleFilter.bind(this) }
                    icon={
                      <Icon
                        name="filter"
                        size={24}
                        color="white"
                      />
                    }
                  />
                }
                //rightComponent={{ text: 'NEWS', style: { marginTop:10,color: '#fff' } }}
                rightComponent={<Icon size={24} color="white" name='newspaper-o' style={{marginBottom:0}} />}
                //centerComponent={this.rightComponent()}
                containerStyle={{
                  backgroundColor: 'black',
                  height:100
                  }}
                />
                
              { this.renderFilter() }
                
            </View>
            <View style={[styles.box, { flex: (this.state.showFilter) ? 7 : 11} ]}>
            
                <Swiper
                  backgroundColor={this.state.backColor}
                  ref={swiper => {
                    this.swiper = swiper
                  }}
                  containerStyle={{
                    height:'100%',
                    width:'100%'
                  }}
                  goBackToPreviousCardOnSwipeLeft={true}
                  onSwiped={() => this.onSwiped('general')}
                  onSwipedLeft={() => this.onSwiped('left')}
                  onSwipedRight={() => this.onSwiped('right')}
                  onSwipedTop={() => this.onSwiped('top')}
                  onSwipedBottom={() => this.onSwiped('bottom')}
                  onTapCard={this.swipeLeft}
                  //cards={[{'dd':'efeff'},{'dd':'efeff'}]}
                  cards={this.state.articles}
                //  cardIndex={this.state.cardIndex}
                  cardVerticalMargin={80}
                  renderCard={this.renderCard}
                  onSwipedAll={this.onSwipedAllCards}
                  stackAnimationTension={100}
                  stackAnimationFriction={10}
                  stackSize={1}
                  cardStyle={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      height:'100%',
                      width:'100%',
                      justifyContent: "flex-start",
                      backgroundColor: "white"
                      
                  }}
                  //stackSeparation={15}
                  verticalSwipe={false} disableTopSwipe={true} disableBottomSwipe={true}
                  // overlayLabels={{ 
                  //   bottom: {
                  //     title: 'BLEAH',
                  //     style: {
                  //       label: {
                  //         backgroundColor: 'black',
                  //         borderColor: 'black',
                  //         color: 'white',
                  //         borderWidth: 1
                  //       },
                  //       wrapper: {
                  //         flexDirection: 'column',
                  //         alignItems: 'center',
                  //         justifyContent: 'center'
                  //       }
                  //     }
                  //   },
                  //   left: {
                  //     title: 'NOPE',
                  //     style: {
                  //       label: {
                  //         backgroundColor: 'black',
                  //         borderColor: 'black',
                  //         color: 'white',
                  //         borderWidth: 1
                  //       },
                  //       wrapper: {
                  //         flexDirection: 'column',
                  //         alignItems: 'flex-end',
                  //         justifyContent: 'flex-start',
                  //         marginTop: 30,
                  //         marginLeft: -30
                  //       }
                  //     }
                  //   },
                  //   right: {
                  //     title: 'LIKE',
                  //     style: {
                  //       label: {
                  //         backgroundColor: 'black',
                  //         borderColor: 'black',
                  //         color: 'white',
                  //         borderWidth: 1
                  //       },
                  //       wrapper: {
                  //         flexDirection: 'column',
                  //         alignItems: 'flex-start',
                  //         justifyContent: 'flex-start',
                  //         marginTop: 30,
                  //         marginLeft: 30
                  //       }
                  //     }
                  //   },
                  //   top: {
                  //     title: 'SUPER LIKE',
                  //     style: {
                  //       label: {
                  //         backgroundColor: 'black',
                  //         borderColor: 'black',
                  //         color: 'white',
                  //         borderWidth: 1
                  //       },
                  //       wrapper: {
                  //         flexDirection: 'column',
                  //         alignItems: 'center',
                  //         justifyContent: 'center'
                  //       }
                  //     }
                  //   }
                  // }}
                  animateOverlayLabelsOpacity
                  animateCardOpacity
                  swipeBackCard
                  >
                </Swiper>
            </View>
            {/* <View style={[styles.box, styles.box3,]}>
              <BottomNavigation 
                onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                renderTab={this.renderTab}
                tabs={this.tabs}
              />
            </View> */}
          </View>
    );
    }else{
      return(
        <View style={{flex:1,flexDirection:"column",justifyContent:"center"}}><Spinner size="large" color="black" /></View>
      )
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  box: {
    height: box_height
  },
  box1: {
    flex: 2,
    backgroundColor: '#2196F3'
  },
  box2: {
       flex: 11,
   // backgroundColor: '#8BC34A',
    // borderRadius: 6,
    // borderWidth: 2,
    // borderColor: "#E8E8E8",
  },
  box3: {
    flex: 1,
    backgroundColor: '#e3aa1a'
  },
  card: {
     width:100,
     height:100
   },
});







