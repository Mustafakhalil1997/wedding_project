import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
var device_width = Dimensions.get("window").width;
class MyScrollView extends Component {
  constructor() {
    super();
    this.state = { getTextInput: "" };
  }
  moveToPage() {
    if (this.state.getTextInput === "") {
      alert("Don't leave blank");
    } else if (
      this.state.getTextInput > React.Children.count(this.props.children) ||
      this.state.getTextInput <= 0
    ) {
      alert("View not found...");
    } else {
      this.refs.scrollView.scrollTo({
        x: (this.state.getTextInput - 1) * device_width,
        y: 0,
        animated: true,
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {" "}
        <ScrollView
          ref="scrollView"
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          pagingEnabled={true}
        >
          {" "}
          {this.props.children}{" "}
        </ScrollView>{" "}
        {React.Children.count(this.props.children) <= 1 ? null : (
          <View style={styles.textInputButtonHolder}>
            {" "}
            <View style={styles.insideHolder}>
              {" "}
              <TextInput
                onChangeText={(text) => this.setState({ getTextInput: text })}
                style={styles.textInput}
                underlineColorAndroid="transparent"
              />{" "}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.moveToPage.bind(this)}
                style={styles.button}
              >
                {" "}
                <Text style={styles.textColor}>GoTo View</Text>{" "}
              </TouchableOpacity>{" "}
            </View>{" "}
          </View>
        )}{" "}
      </View>
    );
  }
}
class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <MyScrollView>
        {" "}
        <View style={styles.View1}>
          {" "}
          <Text style={styles.text}> View #1 </Text>{" "}
        </View>{" "}
        <View style={styles.View2}>
          {" "}
          <Text style={styles.text}> View #2 </Text>{" "}
        </View>{" "}
        <View style={styles.View3}>
          {" "}
          <Text style={styles.text}> View #3 </Text>{" "}
        </View>{" "}
        <View style={styles.View4}>
          {" "}
          <Text style={styles.text}> View #4 </Text>{" "}
        </View>{" "}
      </MyScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    marginTop: Platform.OS === "ios" ? 20 : 0,
  },
  View1: {
    flex: 1,
    backgroundColor: "#EF5350",
    justifyContent: "center",
    alignItems: "center",
    width: device_width,
  },
  View2: {
    flex: 1,
    backgroundColor: "#AB47BC",
    justifyContent: "center",
    alignItems: "center",
    width: device_width,
  },
  View3: {
    flex: 1,
    backgroundColor: "#FF7043",
    justifyContent: "center",
    alignItems: "center",
    width: device_width,
  },
  View4: {
    flex: 1,
    backgroundColor: "#66BB6A",
    justifyContent: "center",
    alignItems: "center",
    width: device_width,
  },
  textInputButtonHolder: {
    position: "absolute",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  insideHolder: { position: "relative", margin: 15 },
  textInput: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: 40,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#26A69A",
    height: 39,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    right: 0,
    top: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: { fontSize: 30, color: "white" },
});
AppRegistry.registerComponent("App", () => App);
