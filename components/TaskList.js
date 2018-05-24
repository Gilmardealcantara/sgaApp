import React from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';

import Header from './Header';
import Row from './Row';
import data from './demoData';

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

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }
  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
       	renderRow={(data) => <Row {...data} />}
    		renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}  
				renderHeader={() => <Header />}
			/>
    );
  }
}

export default TaskList;