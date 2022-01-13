import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import io from 'socket.io-client';

function App() {
  const [msg, setMsg] = React.useState("");
  const [log, setLog] = React.useState([]);

  // Connects socket once
  useEffect(() => {
    socket = io("http://localhost:3000");
    socket.on('initial log', (hist) => {
      setLog(hist.map((text) => <Text style={{borderWidth: 2, top: 500}} key={text.id}>{text}</Text>));
    });
  }, []);

  // seemingly need to run this line every time log changes
  useEffect(() => {
    socket.on('chat message', (chatMsg) => {
        setLog([...log, <Text style={{borderWidth: 2, top: 500}} key={chatMsg.id}>{chatMsg}</Text>]);
    });
  }, [log]);

  // sends message to server every time enter is pressed
  const submitChatMessage = () => {
    socket.emit('chat message', msg);
    setMsg("")
  };

  return (
    <View style={styles.container}>
      {log}
      <TextInput
        style={{height: 40, borderWidth: 2, top: 600}}
        autoCorrect={false}
        value={msg}
        onSubmitEditing={submitChatMessage}
        onChangeText={chatMessage => setMsg(chatMessage)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

export default App;
