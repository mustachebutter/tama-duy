import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'
import { MainScreen } from 'app/features/3d/screen'
import { FiberScreen } from 'app/features/3d/fiber-screen'
import BlogsScreen from '../../../../apps/next/pages/blogs'
import { BlogDetailScreen } from 'app/features/blogs/detail-screen'
import { FormScreen } from 'app/features/forms/screen'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
    id: string
  }
  '3d-screen': undefined
  'fiber-screen': undefined
  'blogs': undefined
  'blog-detail': {
    id: string
  }
  'forms': undefined
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
        name="3d-screen"
        component={MainScreen}
        options={{
          title: '3D Main Screen'
        }}
      />
      <Stack.Screen
        name="fiber-screen"
        component={FiberScreen}
        options={{
          title: 'React Three Fiber Screen'
        }}
      />
      <Stack.Screen
        name="blogs"
        component={BlogsScreen}
        options={{
          title: 'Blogs'
        }}
      />
      <Stack.Screen
        name="blog-detail"
        component={BlogDetailScreen}
        options={{
          title: 'Blog'
        }}
      />
      <Stack.Screen
        name="forms"
        component={FormScreen}
        options={{
          title: 'Forms'
        }}
      />

    </Stack.Navigator>
  )
}
