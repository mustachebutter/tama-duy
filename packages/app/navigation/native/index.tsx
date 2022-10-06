import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'
import { MainScene } from 'app/features/3d/scene'
import { FiberScene } from 'app/features/3d/fiber-scene'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
    id: string
  }
  '3d-scene': undefined
  'fiber-scene': undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
      <Stack.Screen
        name="3d-scene"
        component={MainScene}
        options={{
          title: '3D Main Scene'
        }}
      />
      <Stack.Screen
        name="fiber-scene"
        component={FiberScene}
        options={{
          title: 'React Three Fiber Scene'
        }}
      />
    </Stack.Navigator>
  )
}
