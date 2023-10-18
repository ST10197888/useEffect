import {useState, useEffect} from 'react'
import {
	View,
	Button,
	Text,
	StyleSheet,
} from 'react-native'

function App() {
		const [count, setCount] = useState(0);
		const [dispText, SetDispText] = useState('');

		useEffect(() => {
			// Whatever code we want to execute , just because the function is refreshed
			SetDispText('Effect - The count is ' + count);
		}, [count]);
		// Dependency array - epected to contain a list of variables that the 
		// useEffect is suppose to "listen out for" in order to know that it 
		// needs to execute

		return(
			<View style={styles.container}>
				<Text style={styles.textDisp}>
					A Tap Counter
				</Text>
				<View style={styles.buttons}>
					<Button
						title = 'Increment'
						onPress={() => setCount(count + 1)}
					/>
				</View>
				<Text style={styles.textDisp}> Count: {count}</Text>

			</View>
		);
	}
                                            //Button wont ever appear??
  function Display({ navigation }) {
  return (
    <View>
      <Text>Counter</Text>
      <Button
        title="Go to CounterScreen"
        onPress={() => navigation.navigate('Counter')}
      />
    </View>
  );
}
                                            //seemsi stil cant get the buttons to work :(
const styles = StyleSheet.create({
	container: {
    top: 170,
		flex: 1,
		padding: 10,
	},
	buttons: {
		margin: 5,
		padding: 5,
	},
	textDisp: {
    left: 100,
		fontSize: 32,
		fontWeight: 'bold',
	},
});

export default App;