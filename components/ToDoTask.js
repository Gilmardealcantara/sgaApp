import React from 'react';
import { Alert, Button} from 'react-native';
 
class ToDoTask extends React.Component {
 	doTask(e){
		Alert.alert(
			"Fazer Tarefa", 
			"Confirmar?",
			[
				{text: 'Cancel', style: 'cancel'},
				{text: 'OK', onPress: () => console.log('OK Pressed')},
			],
			{ cancelable: false }
			);	
	}
 
	render() {
    return (
			<Button
				title=" Fazer "
				color="grey"
				onPress={this.doTask}
			/>	
    );
  }
}
 
export default ToDoTask;
