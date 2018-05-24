import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
  },
	view1: {
		flex: 1,
		flexDirection: 'column',
	},
	view2: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',	
	},
  text: {
    marginLeft: 12,
    fontSize: 16,
  }
});

const Row = (props) => (
  <View style={styles.container}>
    <View style={styles.view1}>
			<Text style={styles.text}>
				{`${props.name.first} ${props.name.last}`}
			</Text>
		</View>
    <View style={styles.view2}>
			<Button
				title=" Fazer "
				color="grey"
			/>	
		</View>
  </View>
);

export default Row;
