import { createNewCounter } from "@/app/services/counterService";
import { clearStorage } from "@/app/utilities/storage/storage";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Button, Dialog, Icon, Input, Text } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Counter from "../Counter/CounterScreen";
import CountersScreen from "../Counter/CountersScreen";

const Drawer = createDrawerNavigator();

type Props = {
  props: DrawerContentComponentProps;
  logout: () => Promise<void>;
};

function CustomDrawerContent(customProps: Props) {
  const handleLogout = () => {
    Alert.alert(
      "Log out",
      "Do you want to logout?",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        {
          text: "Confirm",
          onPress: async () => {
            customProps.props.navigation.closeDrawer();
            await customProps.logout();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <DrawerContentScrollView {...customProps.props}>
      <DrawerItemList {...customProps.props} />
      <View style={{ padding: 20 }}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ fontSize: 16, color: "red" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  async function logout() {
    // Clear token from storage
    await clearStorage();

    // navigate to login screen
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent props={props} logout={logout} />
      )}
    >
      <Drawer.Group>
        <Drawer.Screen
          name="Dashboard"
          component={WelcomeComponent}
        ></Drawer.Screen>
        <Drawer.Screen
          name="Counters"
          component={CountersScreen}
        ></Drawer.Screen>
      </Drawer.Group>
    </Drawer.Navigator>
  );
};

export default HomeScreen;

function WelcomeComponent() {
  const [isCreateModalVisible, setIsCreateModalVisible] =
    useState<boolean>(false);

  const [counterName, setCounterName] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onCreatePress() {
    setIsCreateModalVisible((prev) => !prev);
  }
  async function onCheckPress() {
    setIsLoading((prev) => !prev);

    // API call
    const res = await createNewCounter(counterName);

    if (res.isError) {
      Alert.alert("Error", res.error, [], {
        cancelable: true,
        userInterfaceStyle: "dark",
      });
    } else {
      Alert.alert("Success", res.message, [], {
        cancelable: true,
        userInterfaceStyle: "light",
      });
    }

    setTimeout(() => {
      setIsLoading((prev) => !prev);
      setIsCreateModalVisible((prev) => !prev);
    }, 2000);
  }
  return (
    <View style={styles.container}>
      <Text h3 style={styles.heading}>
        Welcome to Memory Tap!
      </Text>
      <View>
        <Button
          title="Create new Counter!"
          color="secondary"
          style={styles.createBtn}
          onPress={onCreatePress}
        ></Button>
      </View>
      <Dialog isVisible={isCreateModalVisible}>
        <Dialog.Title title="Please enter the name for counter" />
        <View>
          <Input value={counterName} onChangeText={(e) => setCounterName(e)} />
          <Button
            color="success"
            icon={<Icon name="check" />}
            onPress={onCheckPress}
            loading={isLoading}
          />
        </View>
      </Dialog>
    </View>
  );
}
