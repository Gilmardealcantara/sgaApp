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

const API = 'http://192.168.15.14:8080/api/tasks'; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  } 
});

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.updateDataApi = this.updateDataApi.bind(this);

    this.state = {
      tasks: ds.cloneWithRows([]),
      isLoading: false,
      error: null,
			refreshing: false
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

	updateDataApi(file, task_id){    
  	fetch(API + '/' + task_id, {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
		 	body: file
		})
		.then(response => { 
      if(response.ok){
      	return true;
			}else{
        Alert.alert("Tarefa não alterada!", "Erro no servidor!");
      }
    })
    .then(data => {
				this.fetchDataApi();	
		});
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
					tasks: ds.cloneWithRows(data), 
					isLoading: false
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
					tasks: ds.cloneWithRows(data), 
					isLoading: false
				})
			})
      .catch(error => this.setState({error: error, isLoading: false}))
  }

  componentDidMount(){
    this.fetchDataApi();
  }

  render() {
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
       	renderRow={(data) => <Row update={this.updateDataApi} {...data} />}
    		renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}  
				renderHeader={() => <Header />}
			/>
    );
  }
}

export default TaskList;
