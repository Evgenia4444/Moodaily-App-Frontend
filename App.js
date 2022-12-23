import { StyleSheet, ActivityIndicator, FlatList, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
// import { Platform } from 'react-native'
// для тестирования на эмуляторах (разные ip-адреса localhost)
// const apiUrl = Platform.OS === 'android' ?
//                   'http://10.0.2.2:8081/' : 'http://localhost:8081/'

const apiUrl = 'http://127.0.0.1:3000/api/v1/posts'
export default App = () => {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const getData = async () => {
    try {
      const response = await fetch(
        apiUrl,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }      
      )

      const json = await response.json()
      setData(json.data)
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Users</Text>
      <Text></Text>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => {
            return(
              <Text>{item.content}</Text>
            )
          }
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
})