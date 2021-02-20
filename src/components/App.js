import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import Chat from './Chat'
// The user is generated
const username = generateUser();

function getRandomInt(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// This function generated a random user
  function generateUser() {
    let name1 = ["red","blue","yellow","green","purple","cyan","orange","brown","grey","magenta"];
    let name2 = ["elephant","hawk","cat","dog","lion","whale","tiger","bear","seal","penguin"];
    let first = name1[getRandomInt(1, name1.length)];
    let last = name2[getRandomInt(1, name2.length)];
    let newName = (first + '_' + last);
    console.log(newName)
    return newName
  }

  console.log(username)

// Here you have to put your keys

const pubnub = new PubNub({
  publishKey: 'pub-c-46a3d951-27c2-4b49-a444-b06a41d549f9',
  subscribeKey: 'sub-c-86afaa20-6f7a-11eb-a8a4-8af6467359f5',
  uuid: username
});



function App() {
  return (
    <PubNubProvider client={pubnub}>
      <Chat username={username}/>
    </PubNubProvider>
  );
}


export default App;
