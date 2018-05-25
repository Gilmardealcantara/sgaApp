import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';

const styles = StyleSheet.create({
	content: {
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
	}
});

const Row = (props) => (
  <View 
		style={styles.content}>
    <View style={styles.view1}>
			<Text style={{color:props.status ? "green" : "red"}}>
				{props.content}
			</Text>
		</View>
    <View style={styles.view2}>
			{!props.status ? (
				<Button
					title=" Fazer "
					color="grey"
					onPress={ () => props.change(props.id)}
				/> ) : <Text style={{color:"green"}}>Feito</Text>}
		</View>
  </View>
);

export default Row;
