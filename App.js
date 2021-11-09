import React from 'react'
import {View, Text, useWindowDimensions} from 'react-native'
import {PanGestureHandler} from 'react-native-gesture-handler'
import Animated, { 
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  runOnJS,
  withTiming
 } from "react-native-reanimated";
const App = ( ) =>{
  const windowWidth = useWindowDimensions().width
  const viewWidth = windowWidth * 0.9
  const transX = useSharedValue(0)
  const animatedStyles = useAnimatedStyle(() => {
    const width = `${(1 + (transX.value)/viewWidth) * 100}%`
    return {
      width: width
    };
  });
  
  const onPanGestureEvent = useAnimatedGestureHandler({
    onStart:(_, ctx) => {
      //console.log('onStart')
    },
    onActive: (event, ctx) => {
      //console.log(event.translationX)
      if(event.translationX < 0){
        const viewWidthHalf = viewWidth/2
        
        //console.log(viewWidthHalf)
        if(Math.abs(event.translationX) >= viewWidthHalf ){
          transX.value = -1 * (viewWidthHalf + (Math.abs(event.translationX) - viewWidthHalf)/4) 
          
        }else{
          transX.value = event.translationX
        }
      }

    },
    onEnd:(_, ctx) => {
      transX.value = withTiming(0, {duration: 200})
    }
  })
  return(
    <View style = {{flex: 1}}>
      <View
      style = {{
        borderRadius:10,
        alignSelf:'center', 
        width:'90%',
        marginVertical:20,        
        flexDirection:'row',
        overflow:'hidden'
      }}
      >
        <PanGestureHandler
        onGestureEvent = {onPanGestureEvent}
        >
          <Animated.View
          style = {[{
            
            backgroundColor:'gray',
            padding:10,
            
          },
            animatedStyles
          ]}
          >
            <Text>Hellooooo</Text>
            <Text>fdasf</Text>
          </Animated.View>
        </PanGestureHandler>
        <View 
        style = {{
          backgroundColor:'red',
          flex: 1
        }}
        />


        
      </View>
      
    </View>
  )
}
export default App