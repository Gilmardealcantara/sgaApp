import React from 'react';
import { Alert, Button} from 'react-native';
 
class ToDoTask extends React.Component {
  constructor(props) {
    super(props);
    this.doTask = this.doTask.bind(this);
 	}
  
  /*to Do*/
  takePhoto(){
    return 'https://facebook.github.io/react-native/docs/assets/favicon.png'
  }
  
  doTask(e){
		Alert.alert(
			"Fazer Tarefa", 
			"Confirmar?",
			[
				{text: 'Cancel', style: 'cancel'},
				{text: 'OK', onPress: () => {
          this.props.update(this.takePhoto(), this.props.task_id)
        }},
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
