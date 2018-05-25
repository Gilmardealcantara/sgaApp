import React from 'react';
import { 
View, 
ListView, 
StyleSheet, 
Text, 
Alert, 
ActivityIndicator,
RefreshControl
} from 'react-native';

import Header from './Header';
import Row from './Row';
import TakePicture from './TakePicture';
import RNFetchBlob from 'react-native-fetch-blob'

const API = 'http://192.168.15.14:8080/api/tasks'; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.updateDataApi = this.updateDataApi.bind(this);
    this.changeScreen = this.changeScreen.bind(this);
    this.renderCam = this.renderCam.bind(this);
    this.renderTaskList = this.renderTaskList.bind(this);

    this.state = {
      tasks: ds.cloneWithRows([]),
      isLoading: false,
      error: null,
			refreshing: false,
      cam: false,
			task_todo: null
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

	updateDataApi(data, task_id){
		let values = data.uri.split('/');
    let filename = values[values.length - 1];
		const name = filename.split('.')[0];
		//Alert.alert("saving", filename + " \n\n\n" + name)	
		RNFetchBlob.fetch('PUT', API + '/' + task_id, {
			'Dropbox-API-Arg': JSON.stringify({
				path : 'data.uri',
				mode : 'add',
				autorename : true,
				mute : false
			}),
			'Content-Type' : 'application/octet-stream',
		}, data.base64)
		.then((res) => {
			console.log(res.text())
		})
		.catch((err) => {
			// error handling ..
		})
  }

  fetchData(){
    return fetch(API, {method: 'get'})
      .then(response => {
        if(response.ok){
          return response.json();
        }else{
          throw new Error('Erro ao conectar com o servidor ...');
        }
      })
      .then(data => {
				this.setState({	
					tasks: ds.cloneWithRows(data.reverse()), 
					isLoading: false,
					error: null
				})
			})
      .catch(error => this.setState({error: error, isLoading: false}))
  }

  fetchDataApi(){
    this.setState({isLoading: true});
    fetch(API, {method: 'get'})
      .then(response => {
        if(response.ok){
          return response.json();
        }else{
          throw new Error('Erro ao conectar com o servidor ...');
        }
      })
      .then(data => {
				this.setState({	
					tasks: ds.cloneWithRows(data.reverse()), 
					isLoading: false,
					error: null
				})
			})
       .catch(error => this.setState({error: error, isLoading: false}))
  }
 
  componentDidMount(){
    if(!this.state.cam)
      this.fetchDataApi();
  }

	changeScreen(task_id){
		this.setState({
			cam:!this.state.cam,
			task_todo:task_id
		});
	}
  
	renderCam(){
    return(
			<TakePicture 
				task_id={this.state.task_todo}
				update={this.updateDataApi}
				change={this.changeScreen}
		/>)
  }

  renderTaskList() {
    //if(this.state.error) return this.errorConnection();
    if(this.state.isLoading) return(<ActivityIndicator size="large" color="#0000ff" />)
    return (
      <ListView
				refreshControl={          
					<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
					/>  
				}	
      	style={styles.container}
        dataSource={this.state.tasks}
       	renderRow={(data) => <Row change={this.changeScreen} {...data} />}
    		renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}  
				renderHeader={() => <Header error={this.state.error}/>}
			/>
    );
  }
 
  render(){
		if(this.state.cam)
			return this.renderCam();
		return this.renderTaskList();
  }

}

export default TaskList;
